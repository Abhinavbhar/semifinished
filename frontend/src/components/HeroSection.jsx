import React from 'react'
import heroImg from '../assets/heroImg.png'
import { AiOutlineSearch } from 'react-icons/ai'
import "./styles.css"

const HeroSection = () => {
  return (
    <section className='w-3/4 py-12 mt-20 mb-20 p-4 border-4 border-blue-400 rounded-full overflow-hidden mx-auto' style={{ backgroundColor: '#E5E4E2' }}>
      <div className='md:max-w-[1100px] m-auto grid md:grid-cols-2 max-w-[400px]'>
        <img src={'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3I4OGF4YTFjdGYwOXVtdWdoYmk2NHRwbTVzbGp4ejkydGFsNjF0MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vdpRNviw5twgvSRwhA/giphy.gif'} alt="hero" className='md:order-first order-last w-1/2 md:w-full h-auto rounded-full' />
        <div className='flex flex-col justify-start gap-8 ml-20'>
          <p className='py-10 text-4xl text-[#208486] font-bold'>THE HIGHLIGHTS</p>
          <ul className="list-inside list-none pl-4 relative" style={{ fontSize: '2rem' }}>
            <div className="highlighted-box"></div>
            <li>
              <span className="mr-2">&#10148;</span> {/* Arrow icon */}
              Track balances
            </li>
            <li>
              <span className="mr-2">&#10148;</span> {/* Arrow icon */}
              Organize expenses
            </li>
            <li>
              <span className="mr-2">&#10148;</span> {/* Arrow icon */}
              Add expenses easily
            </li>
            <li>
              <span className="mr-2">&#10148;</span> {/* Arrow icon */}
              Pay friends back
            </li>
          </ul>
        </div>
      </div>
    </section>



  )
}

export default HeroSection