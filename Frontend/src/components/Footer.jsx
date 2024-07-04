import React from 'react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from 'react-icons/bs';
import { States, States2, specializationCourses, InstituteType } from '../utils/data';


export default function FooterCom() {

  return (

    <div className='bg-blue-100 font-sans py-4 px-10 mt-10 max-h-[50vh]'>
     
      <div className='flex   items-start px-10 py-4 '>
        <div className='flex-1 flex px-10  ml-10'>
          <ul className=' '>
            <h1 className='mb-4 text-xl font-semibold'>Location (State)</h1>
            {States.map((state, key) => {
              return (
                <li key={key} className='pr-4 transition-transform duration-300 hover:translate-x-1 hover:underline'>
                  <Link to="">{state}</Link>
                </li>
              );
            })}

          </ul>
          <ul className='px-10 mx-5 mt-12 pt-2 ml-10 flex-1'>
            {States2.map((state, key) => {
              return (
                <li key={key} className='px-4 transition-transform duration-300 hover:translate-x-1 hover:underline'>
                  <Link to="">{state}</Link>
                </li>
              );
            })}

          </ul>
        </div>

        <ul className='px-10 flex-1'>
          <h1 className='mb-4 text-xl font-semibold'>Specialisation</h1>
          {specializationCourses.map((c, key) => {
            return (
              <li key={key} className='transition-transform duration-300 hover:translate-x-1 hover:underline'>
                <Link to="">{c}</Link>
              </li>
            );
          })}
        </ul>
        <ul className='px-10 flex-1'>
          <h1 className='mb-4 text-xl font-semibold'>Institution Type</h1>
          {InstituteType.map((type, key) => {
            return (
              <li key={key} className='py-1 transition-transform duration-300 hover:translate-x-1 hover:underline'>
                <Link to="">{type}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>

  );
}
