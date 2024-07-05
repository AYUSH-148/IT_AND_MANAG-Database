import React from 'react';
import Hero from "../components/Hero";
import CoursesList from "../components/CourseList";
import FooterCom from '../components/Footer';

const HomePage = () => {
  return (
    <div className='holder'>
      <Hero />
      <CoursesList />
      <FooterCom/>
    </div>
  )
}

export default HomePage