import React from 'react';
import { IMG } from '../utils/images';

const Hero = () => {
  return (
    <div className="bg-center  bg-cover bg-no-repeat h-[45vh]  w-full " style={{ backgroundImage: `url(${IMG.hero_img})` }}>
      <div className="container h-full flex items-center">
        <div className=" max-w-3xl w-full ml-0 p-5">
          <h1 className="sm:text-5xl text-3xl font-bold sm:font-semibold mb-3 whitespace-nowrap">Right Guidance, Bright Future</h1>
          <p className="sm:text-2xl pr-24">Guiding lakhs of students and parents to find the right college. Building better future for India, one student at a time.</p>
        </div>
      </div>
    </div>
  )
}

export default Hero
