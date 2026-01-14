import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { UseShopContext } from '../context/ShopContext';
import { products } from '../assets/assets';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

function Product() {

  const { productId } = useParams();
  const { products, currency ,addToCart} = UseShopContext();
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* ---------- Product Data ---------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* ---------- Product Images ---------- */}
        <div className='w-full sm:w-[45%] flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col max-h-130 overflow-x-auto sm:overflow-y-auto justify-between sm:justify-start sm:w-[18%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer' key={index} src={item} alt="Product_Images" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full max-h-130 object-contain' src={image} alt="Main_Image_" />
          </div>
        </div>

        {/* ---------- Product Information ---------- */}
        <div className='w-full sm:w-[55%] '>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="star_icon" className='w-3 5' />
            <img src={assets.star_icon} alt="star_icon" className='w-3 5' />
            <img src={assets.star_icon} alt="star_icon" className='w-3 5' />
            <img src={assets.star_icon} alt="star_icon" className='w-3 5' />
            <img src={assets.star_dull_icon} alt="star_icon" className='w-3 5' />
            <p className='pl-2'>(113)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select-Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                ))
              }
            </div>
          </div>
          <button onClick={()=> addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5 border-t-[0.5px] border-gray-300' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>

      </div>
      {/* ---------- Description ---------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border border-gray-300 px-6 py-3 text-sm font-medium">
            Description
          </b>
          <p className="border border-l-0 border-gray-200 px-6 py-3 text-sm text-gray-500 cursor-pointer">
            Reviews (123)
          </p>
        </div>

        <div className="border border-gray-200 px-8 py-8 text-sm text-gray-500 leading-relaxed">
          <p>
            Crafted with meticulous attention to detail, this garment is thoughtfully
            designed to deliver exceptional everyday comfort while maintaining a
            refined, modern silhouette. Made from soft, breathable fabric, it allows
            natural airflow throughout the day, ensuring lasting freshness and ease of
            movement. The lightweight construction makes it an ideal choice for extended
            wear, whether you're navigating a busy day or relaxing during downtime.
          </p>

          <p className="mt-4">
            Designed to adapt seamlessly to your lifestyle, this versatile piece pairs
            effortlessly with denim, tailored trousers, chinos, or layered outfits.
            Its clean lines and timeless design make it suitable for casual settings as
            well as elevated occasions. Built for durability and long-lasting wear, it
            retains its shape and comfort over time—offering a perfect balance of style,
            practicality, and understated elegance in every wear.
          </p>
        </div>
      </div>

      {/* ---------- Display Related Products ---------- */}
      
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />



    </div>
  ) : <div className='opacity-0'></div>
}

export default Product