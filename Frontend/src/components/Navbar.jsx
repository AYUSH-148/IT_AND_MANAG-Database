import React from 'react';
import { MdMenu } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSidebarContext } from '../context/sidebar_context';
import { useCartContext } from '../context/cart_context';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { total_items } = useCartContext();
  const { openSidebar } = useSidebarContext();

  return (
    <nav className=" bg-white flex h-[60px] shadow-md py-14">
      <div className='container w-full flex justify-between items-center px-5'>
        <Link to="/" className='text-4xl uppercase tracking-wider font-bold'>
          <span className="text-orange-500">c</span>oursean
        </Link>
        <SearchBar/>
        <div className='flex gap-2 items-center pr-3'>
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
