import React from 'react';
import Hero from "../components/Hero";
import CoursesList from "../components/CourseList";
import FooterCom from '../components/Footer';
import AboutUs from '../components/AboutUs';

const HomePage = () => {
  return (
    <div className='holder '>
      <Hero />
      <CoursesList />
      <AboutUs/>
      <FooterCom/>
    </div>
  )
}

export default HomePage