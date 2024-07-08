import React from 'react';
import { MdMenu } from "react-icons/md";
import { FaBookmark,FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSidebarContext } from '../context/sidebar_context';
import { useCartContext } from '../context/cart_context';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { total_items } = useCartContext();
  const { openSidebar } = useSidebarContext();

  return (
    <nav className=" bg-white flex h-[60px]  py-14 sticky top-0 w-full ">
      <div className='container w-full flex justify-between items-center px-5'>
        <Link to="/" className='text-4xl uppercase tracking-wider font-bold ' >
          <span className='py-3 rounded-xl px-2 bg-gradient-to-tr from-orange-500 to-gray-300'><span className="text-5xl ">c</span >ollege </span><span className='text-orange-600 text-5xl ml-1'>Hub</span>
        </Link>
        <SearchBar/>
        <div className='flex gap-2 items-center pr-3'>
          <a href="https://github.com/AYUSH-148/IT_AND_MANAG-Database/" target='_blank'><FaGithub className='text-4xl mr-3' /></a>
          <Link to="/cart" className='relative mr-4 text-4xl'>
            <FaBookmark />
            <span className='absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-lg font-bold rounded-full w-6 h-6 flex items-center justify-center'>
              {total_items}
            </span>
          </Link>
          <button type="button" className='text-4xl transition-opacity duration-300 hover:opacity-70' onClick={openSidebar}>
            <MdMenu />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
