import React from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { UseShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

function Verify() {


    const { backendUrl, token , setCartItems} = UseShopContext();
    const navigate = useNavigate();

    const[serachParams,setSearchParams] = useSearchParams();

    const orderId = serachParams.get('orderId');
    const success = serachParams.get('success');
    
    const verifyPayment = async () =>{
        try {
            
            if(!token){
                return null;
            }

            const response = await axios.post(backendUrl + '/api/order/verifyStripe',{ orderId,success},{headers : { token }});

            if(response.data.success){
                toast.success(response.data.message || 'Order Placed successfully 🎉')
                setCartItems({});
                navigate('/orders')
            }
            else{
                toast.error(response.data.message || 'Payment failed ❌')
                navigate('/cart')
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[token])

  return (
    <div>Verify</div>
  )
}

export default Verify