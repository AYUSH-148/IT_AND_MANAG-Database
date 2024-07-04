import React, { useState } from 'react';
import { MdClose,MdSearch } from "react-icons/md";
import { useSidebarContext } from '../context/sidebar_context';
import { Main_Courses } from '../utils/categories';
import { useNavigate,Link } from 'react-router-dom';

const Sidebar = () => {
  const { closeSidebar, isSidebarOpen } = useSidebarContext();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
      setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      if (searchTerm.trim() !== '') {
          navigate(`/category?searchTerm=${searchTerm}`)
      }
  };

  const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
          event.preventDefault(); // Prevent default form submission
          handleSubmit(event);
      }
  };

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
      <form onSubmit={handleSubmit} className="relative border-2 rounded-full w-full sm:hidden my-10">
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyDown} // Listen for Enter key
                placeholder="Search courses, colleges/universities"
                className="pl-12 pr-4 py-3 text-2xl border border-gray-300 rounded-full outline-none w-full"
            />
            <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-3xl text-gray-400 cursor-pointer">
                <MdSearch />
            </button>
        </form>
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
