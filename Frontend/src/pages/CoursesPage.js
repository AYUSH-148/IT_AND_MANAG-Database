import React from 'react';
import { useParams } from 'react-router-dom';
import Course from "../components/Course";
import { useCoursesContext } from '../context/courses_context';

const CoursesPage = () => {
  const {category} = useParams();
  const {courses} = useCoursesContext();

  return (
    <div className="container mx-auto py-10 mt-10">
      <div className=" grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {
          courses.map((course) => (
            <Course key={course.id} {...course} />
          ))
        }
      </div>
    </div>
  );
}

export default CoursesPage;
