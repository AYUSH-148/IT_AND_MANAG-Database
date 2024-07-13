import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegFlag, FaRupeeSign, FaRegHeart } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useCartContext } from '../context/cart_context';


const I = (props) => {

  const { addToCart } = useCartContext();
  const { courseId, title, url, avg_pkg, img, rate, location, type, fees } = props;
  const [trimmedType, setTrimmedType] = useState(null);
  const [trimmedPkg, setTrimmedPkg] = useState(null);
  const [trimmedLocation, setTrimmedLocation] = useState(null);
  const [trimmedFees, setTrimmedFees] = useState(null);
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    if (title) {
      setSlug(title.trim().toLowerCase().replace(/\s+/g, '-'))
    }
    if (type) {
      let tempType = type.trim();
      if (/\d/.test(tempType) || tempType === "") {
        setTrimmedType("Private");
      }
      else {
        setTrimmedType(tempType);
      }
    }
    if (location) {
      let tempLoc = location.trim();
      if (tempLoc == "Private" || tempLoc == "Government") {
        setTrimmedLocation("Indian State");
      }
      else {
        setTrimmedLocation(tempLoc);
      }
    }
    if (avg_pkg) {
      let tempPkg = avg_pkg.trim();
      if (!/\d/.test(tempPkg)) {
        setTrimmedPkg("--");
      }
      else {
        setTrimmedPkg(tempPkg);
      }
    }
    if (fees) {
      let tempFees = fees.trim();
      if (!/\d/.test(tempFees)) {
        setTrimmedFees("--");
      }
      else {
        setTrimmedFees(tempFees);
      }
    }

  }, [])

  return (
    <div className='mb-5 rounded-tr-lg border border-gray-200 shadow-md flex flex-col justify-between'>
      <div className=''>
        <img className=' object-fill object-center self-center' src={img.includes("static") ? 'https://media.collegedekho.com/media/img/institute/crawled_images/-90110_66624.jpg?w=350&h=350' : img} alt="Collg_img" />
      </div>
      <h5 className='text-2xl  w-2/3 text-center px-10  font-bold mx-auto mt-4'>{title} </h5>
      <div className='my-4 px-4 w-full'>
        <div className='mt-2 py-2'>
          <ul className='flex  px-2 py-2 justify-between' >
            <li className='text-[12.5px]   pt-2 '>
              <span className=' px-2 mb-1  flex items-center text-black'><FaRegFlag className='  mr-2' /> {trimmedType}</span>
              <span className=' px-2  flex items-center text-black'><IoLocationOutline className='  mr-1' /> {trimmedLocation}</span>
            </li>
            <li className='flex items-center gap-3'>
              <Link to="/cart" onClick={() => addToCart(courseId, title, url, trimmedPkg, img, rate, trimmedLocation, trimmedType, trimmedFees)}><span className='text-3xl text-gray-600 cursor-pointer hover:text-red-500'><FaRegHeart /></span></Link>
              <span className=' px-2 py-0.5 text-[12px] font-semibold bg-green-400 flex items-center rounded-lg '>{rate ? rate.trim() : 4.1}<FaStar className='text-white ml-3' /></span>
            </li>
          </ul>
          <ul className='px-2 py-2 flex items-center'>
            <li className=' font-bold px-2 '>  Fees :</li>
            <li className=' text-black px-2 font-semibold flex items-center'> < FaRupeeSign className='mr-1' />{trimmedFees}</li>
          </ul>
          <div className='px-3 ml-1 text-[15px] font-semibold'>Avg. Package : {trimmedPkg}</div>
        </div>
        <hr className='px-2 mt-2' />
        <div className=' b-0 flex items-center font-semibold gap-3  justify-between my-3'>
          <a href={url} target='_blank' className='py-3 flex-1 bg-blue-600 text-white rounded text-center'><button className='text-[14px] '>Get Free counselling</button></a>
          <Link to={`/courses/${slug}?id=${courseId}`} className='py-2 flex-1 border-2 border-blue-600 text-blue-600 rounded text-center'><button className='text-[15px] '>View Courses</button></Link>
        </div>
      </div>

    </div>
  );
};

export default I;
