import React from 'react';
import styled from "styled-components";
import Tabs from "./Tabs";

const CourseList = () => {

  return (
    <CoursesListWrapper>
      <div className='container'>
        <div className='courses-list-top'>
          <h2 className='font-semibold'>A broad selection of IT and Management Colleges</h2>
          <p >Explore around 1000+ IT and Management Institutes with new additions publihsed every month</p>
        </div>

        <Tabs />
      </div>
    </CoursesListWrapper>
  )
}

const CoursesListWrapper = styled.div`
  padding: 40px 0;
  .courses-list-top p{
    font-size: 1.6rem;
  }
`;

export default CourseList