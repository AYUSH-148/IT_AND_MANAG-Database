import React from 'react';
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSidebarContext } from '../context/sidebar_context';
import { Main_Courses } from '../utils/categories';

const Sidebar = () => {
  const { closeSidebar, isSidebarOpen } = useSidebarContext();

  return (
    <div className={`fixed top-0 right-0 w-full sm:w-[310px] z-10 h-screen p-8 bg-white shadow-md transform transition-transform duration-300 scrollbar scrollbar-thumb-skin-light  scrollbar-track-gray-200 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} overflow-y-auto`}>
      <button
        type="button"
        className='absolute top-5 right-5 border-2 border-black flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:bg-black hover:text-white'
        onClick={() => closeSidebar()}
      >
        <MdClose />
      </button>
      <div className='mt-12'>
        <h6 className='text-4xl font-semibold  mb-10'>Top Categories</h6>
        <ul>
          {Main_Courses.map((category, idx) => (
            <li className='mb-6 text-2xl font-medium transition-transform duration-300 hover:translate-x-1 hover:underline' key={idx}>
              <Link to={`/category?searchTerm=${category}`}>{category.toUpperCase()}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
