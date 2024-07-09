import React ,{useEffect, useState}from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';
import { FaStar, FaRegFlag, FaRupeeSign, FaRegHeart } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
const CartItem = ({ cartItem }) => {
  const [slug,setSlug] = useState(null);
  const { removeFromCart } = useCartContext();
  useEffect(()=>{
    if(cartItem.title){
      setSlug(cartItem.title.trim().toLowerCase().replace(/\s+/g, '-'))
    }
  })
 
  return (
    <div className='flex flex-col md:flex-row border-2 rounded-lg shadow-lg'>
      <div className='w-full h-[250px] md:w-[400px] md:h-full overflow-hidden'>
        <img
          src={cartItem.img.includes("static")?'https://media.collegedekho.com/media/img/institute/crawled_images/-90110_66624.jpg?w=350&h=350':cartItem.img}
          alt={cartItem.title}
          className='md:h-full  w-full'
        />
      </div>
      <div className='md:h-full w-full p-4'>
        <h5 className='md:text-2xl  mt-2 w-full text-center px-10 font-bold'>{cartItem.title}</h5>
        <div className='mt-2 py-2'>
          <ul className='flex justify-between px-2 py-2'>
            <li className='text-[12.5px] pt-2'>
              <span className='px-2 mb-1 flex items-center text-black'>
                <FaRegFlag className='mr-2' /> {cartItem.type}
              </span>
              <span className='px-2 flex items-center text-black'>
                <IoLocationOutline className='mr-1' /> {cartItem.location}
              </span>
            </li>
            <li className='flex gap-3'>
              <span className='px-2 py-0.5 text-[12px] font-semibold bg-green-400 flex items-center rounded-lg'>
                {cartItem.rate ? cartItem.rate.trim() : 4.1}
                <FaStar className='text-white ml-3' />
              </span>
            </li>
          </ul>
          <ul className='px-2 py-2 flex items-center'>
            <li className='font-bold px-2'>Fees :</li>
            <li className='text-black px-2 font-semibold flex items-center'>
              <FaRupeeSign className='mr-1' />
              {cartItem.fees}
            </li>
          </ul>
          <div className='px-3 ml-1 text-[15px] font-semibold'>Avg. Package : {cartItem.avg_pkg}</div>
        </div>
        <hr className='px-2 mt-2' />
        <div className='flex items-center font-semibold gap-3 justify-between my-3'>
          <button className='text-[14px] py-3 flex-1 bg-blue-600 text-white rounded'>
            Get Free counselling
          </button>
          <Link to={`/courses/${slug}?id=${cartItem.id}`} className='py-2 flex-1 border-2 border-blue-600 text-blue-600 rounded text-center'>
            <button className='text-[15px]'>View Courses</button>
          </Link>
          <button type = "button" className=' text-dark flex ml-14 mr-4' onClick={() => removeFromCart(cartItem._id)}><FaTrashAlt/> </button>

        </div>
      </div>
    </div>
  );
};

export default CartItem;
