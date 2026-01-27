import userModel from '../models/userModel.js'


//To ADD Products to User Cart

addToCart = async (req, res) => {
    try {

        const {userId, itemId, size} = req.body

        const user = await userModel.findById(userId)
        let cartData = await user.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId,cartData)

        res.json({success : true,message : "Added To Cart"})

    } catch (error) {
        console.log(error);
        res.json({success : false,message : error.message})
    }
}


//To GET userCart data

getUserCart = async (req, res) => {
    try {

        const { userId } = req.body;

        const user = await userModel.findById(userId)
        let cartData = await user.cartData;

        res.json({success : true,cartData})

    } catch (error) {
        console.log(error);
        res.json({success : false,message : error.message})
    }
}


//UPDATE User cart

updateCart = async (req, res) => {
    try {
        
        const {userId, itemId, size, quantity} = req.body

        const user = await userModel.findById(userId)
        let cartData = await user.cartData;

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId,cartData)

        res.json({success : true,message : "Cart Updated"})

    } catch (error) {
        console.log(error);
        res.json({success : false,message : error.message})
    }
}


export { addToCart, getUserCart, updateCart }