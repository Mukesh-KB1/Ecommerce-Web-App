import React, { useEffect, useState } from 'react'
import { UseShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { useNavigate } from "react-router";


function Cart() {

  const navigateTo = useNavigate();

  const { products, cartItems, currency, updateQuantity, navigate } = UseShopContext();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {  //cartItems is gonna built only after products are loaded so it should wait for products to load or else throw error in

      const temp = [];

      for (const items in cartItems) {   //here Items is id 
        for (const item in cartItems[items]) {  //here item is size 
          if (cartItems[items][item] > 0) {
            temp.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }

      // console.log(temp);
      setCartData(temp);
    }

  }, [cartItems, products]);

  return (
    <div className='border-t pt-14'>

      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            // if (!productData) return null;

            return (
              <div key={index} className='py-6 border-y border-black/10 text-gray-700 
             grid grid-cols-[4fr_0.5fr_0.5fr] 
             sm:grid-cols-[4fr_2fr_0.5fr] 
             items-center gap-4
             hover:bg-gray-50/50 transition-colors'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2.5 sm:px-3 py-0.5 text-xs sm:text-sm border border-black/10 rounded-md bg-slate-50/60 text-gray-700'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className=" border border-black/10  rounded-md max-w-12 sm:max-w-20 px-2 py-1 text-sm text-center focus:outline-none  focus:border-black/30 focus:ring-0 transition" type="number" min={1} value={item.quantity} />
                <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            )
          })
        }
        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-112.5'>
            <CartTotal />
            <div className='w-full text-end'>
              <button onClick={() => navigateTo('/place-orders')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart