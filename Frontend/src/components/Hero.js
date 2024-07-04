import React from 'react';
import { other_images } from '../utils/images';

const Hero = () => {
  return (
    <div className="bg-center  bg-cover bg-no-repeat h-[45vh]" style={{ backgroundImage: `url(${other_images.hero_img})` }}>
      <div className="container h-full flex">
        <div className=" max-w-3xl w-full ml-0 p-5">
          <h1 className="text-5xl font-semibold mb-3 whitespace-nowrap">Right Guidance, Bright Future</h1>
          <p className="text-2xl ">Guiding lakhs of students and parents to find the right college. Building better future for India, one student at a time.</p>
        </div>
      </div>
    </div>
  )
}

export default Hero
