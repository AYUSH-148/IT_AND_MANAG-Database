import React from 'react';
import Hero from "../components/Hero";
import CoursesList from "../components/CourseList";

const HomePage = () => {
  return (
    <div className='holder'>
      <Hero />
      <CoursesList />
      
    </div>
  )
}

export default HomePage