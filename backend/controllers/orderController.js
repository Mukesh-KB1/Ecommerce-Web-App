import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Global variable
const currency = "usd";
const delivery_fee = 10; 


// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        
        const { userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment : false,
            date : Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData : {}})

        res.json({success: true, message: "Order Placed Successfully"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error while placing order"})
    }
}

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        
        const { userId, items, amount, address} = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment : false,
            date : Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        //Line_Items for Stripe

        const line_items = items.map( item => ({
            price_data : {
                currency : currency,
                product_data : {
                    name : item.name
                },
                unit_amount : item.price * 100
            },
            quantity : item.quantity
        }))

        line_items.push({
            price_data : {
                currency : currency,
                product_data : {
                    name : "Delivery Fee"
                },
                unit_amount : delivery_fee * 100
            },
            quantity : 1
        })

        const session =  await stripe.checkout.sessions.create({
            success_url : `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode : 'payment'
        })

        res.json({success: true, session_url : session.url})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error while placing order with Stripe"})
    }
}

//Verify stripe

const verifyStripe = async (req,res) => {

    const { orderId, success , userId} = req.body;

    try {
        
        if(success === 'true'){
            await orderModel.findByIdAndUpdate(orderId, { payment : true})
            await userModel.findByIdAndUpdate(userId, {cartData : {}})
            res.json({success : true, message : "Payment Successful and Order Placed"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success : false, message : "Payment Failed, Please try again"})
        }

    } catch (error) {
        console.log(error);
        res.json({success : false, message : error.message})
    }
}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    
}

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        
        const orders = await orderModel.find({});
        res.json({success : true, orders})

    } catch (error) {
        console.log(error);
        res.json({success : false, message : error.message})
    }
}

// User Orders data for Frontend
const userOrders = async (req, res) => {
    try {
        
        const { userId } = req.body;

        const orders = await orderModel.find({ userId })
        res.json({success : true, orders})

    } catch (error) {
        console.log(error);
        res.json({success : false, message : error.message})
    }
}

//Update Order status form Admin panel
const updateStatus = async (req, res) => {
    try {
        
        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate( orderId, { status } )
        res.json({success : true, message : "Order status updated successfully"})

    } catch (error) {
        res.json({success : false, message : error.message})
    }
}


export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus , verifyStripe}