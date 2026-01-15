import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

function About() {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-112.5' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>ZENVEE was created with a vision to redefine modern online shopping through thoughtful design, quality craftsmanship, and effortless style. What began as a passion for creating meaningful products has grown into a brand focused on delivering timeless essentials that fit seamlessly into everyday life.</p>
          <p>From concept to creation, we carefully curate collections that balance comfort, durability, and contemporary aesthetics. Each product is selected with attention to detail, ensuring it meets our standards for quality, functionality, and design. Whether it’s everyday wear or elevated essentials, ZENVEE is built to complement diverse lifestyles and personal styles.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>At ZENVEE, our mission is to offer a refined shopping experience rooted in trust, simplicity, and confidence. We strive to make discovering and owning quality products effortless—combining thoughtful design, reliable service, and a customer-first approach. Every step, from browsing to delivery, is crafted to feel seamless, personal, and rewarding.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border border-gray-200/70 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Every product is carefully selected and quality-checked to meet our highest standards of durability and design.</p>
        </div>
        
        <div className='border border-gray-200/70 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Our intuitive platform and streamlined checkout process make shopping simple, fast, and stress-free for everyone.</p>
        </div>

        <div className='border border-gray-200/70 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About