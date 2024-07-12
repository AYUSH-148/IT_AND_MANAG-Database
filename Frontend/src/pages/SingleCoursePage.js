import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import { useCartContext } from '../context/cart_context';
import { MdInfo } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { RiClosedCaptioningFill } from "react-icons/ri";
import { FaRegHeart, FaRupeeSign } from "react-icons/fa"
import { TbListDetails } from "react-icons/tb";
import DotSpinner from '../components/DotSpinner';
import FooterCom from '../components/Footer';

const SingleCoursePage = () => {
  const { addToCart } = useCartContext();

  const { slug } = useParams();
  const location = useLocation();
  const [id, setId] = useState("");
  const [info, setInfo] = useState(null);
  const [trimmedLocation, setTrimmedLocation] = useState(null);
  const [otherInst, setOtherInst] = useState(null);
  const [revNos, setRevNos] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('id');
    if (tabFromUrl) {
      setId(tabFromUrl);
    }
    const fetchInst = async () => {
      try {
        const res = await fetch(`https://it-and-manag-database.onrender.com/api/colleges/all?limit=6&startIndex=${Math.floor(Math.random() * 501)}`);
        const data = await res.json();
        if (data && data.result) {
          setOtherInst(data.result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchInst();

  }, [slug,location.search]);


  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await fetch(`https://it-and-manag-database.onrender.com/api/colleges/all?id=${id}`);
          const data = await res.json();
          if (data && data.result) {
            setInfo(data.result[0]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
    setRevNos(Math.floor(Math.random() * (30 - 5 + 1)) + 5);
  }, [id]);

  useEffect(() => {
    if (info?.location) {
      let tempLoc = info.location.trim();
      if (tempLoc === "Private" || tempLoc === "Government") {
        setTrimmedLocation("Locale, India");
      } else {
        setTrimmedLocation(tempLoc);
      }
    }
  }, [info]);

  return (
    <div className=''>
      {info ? (
        <><div className="bg-gray-100 pt-10 font-serif">
          <div className="  max-w-screen-lg mx-auto grid gap-16 lg:grid-cols-2 ">
            <div className="space-y-10 px-10 xl:px-0">
              <div>
                <div className="bg-skin-light mb-4 text-gray-800 uppercase font-bold text-sm inline-block px-3 py-1 rounded">
                  Under IT AND Manag... sector
                </div>
                <h1 className="text-[25px] font-sans font-bold ">{info?.title} Fees & Courses 2024</h1>
              </div>
              <ul className="space-y-4">
                <li className='list-none flex items-center  justify-between'>
                  <span className='flex items-center'>
                    <span className='px-2 py-0.5 text-[12px] font-semibold bg-green-400 flex items-center rounded-lg '>{info.rate ? info?.rate : 4.1} <FaStar className='text-white  ml-3' /></span>
                    <span className='ml-3'>({revNos} Reviews)</span>
                  </span>
                  <Link to="/cart" onClick={() => addToCart(info._id, info.title, info.url, info.avg_pkg, info.img, info.rate, info.Location, info.type, info.fees)}><span className='text-4xl text-gray-600 cursor-pointer hover:text-red-500 mr-14 pr-10'><FaRegHeart /></span></Link>

                </li>
                <li className='flex items-center gap-14 font-medium'>
                  <span className='flex items-center text-black'><IoLocationOutline className='mr-1' /> {trimmedLocation}</span>
                  <span className='flex items-center'><MdInfo className='mr-2 ' />Last updated 3/2024</span>
                </li>
                <li className='flex items-center'>
                  <span><TbWorld /></span>
                  <span className='text-lg font-medium ml-2'>Hindi / English </span>
                </li>
                <li className='flex items-center'>
                  <span><RiClosedCaptioningFill /></span>
                  <span className='text-lg font-medium ml-2'>English [Auto]</span>
                </li>
              </ul>
              <div className='mt-4 flex gap-x-3 pr-16'>
                <a href="#course-list" className='flex-1 rounded  bg-white py-3 border border-blue-600 text-center'>
                  <button className='text-blue-600 font-semibold '>View Course List</button>
                </a>
                <a href={info.url} target='_blank' rel="noreferrer" className='rounded flex-1 py-3 bg-blue-600 text-center'><button className=' font-semibold text-white  '>Shortlist</button></a>
              </div>
            </div>
            <div className="flex justify-center mt-16">
              {info.img && (
                <img
                  src={info.img.includes("static") ? 'https://media.collegedekho.com/media/img/institute/crawled_images/-90110_66624.jpg?w=350&h=350' : info.img}
                  className="max-h-[230px] lg:rounded-xl lg:rounded-bl-3xl" alt=''/>
              )}
            </div>
          </div>

          <div className="bg-white text-gray-800 mt-10 py-4">
            <div className='max-w-screen-lg my-10 xl:px-0 px-10 mx-auto'>
              <h1 className='font-bold mb-4 text-4xl'>Courses and Fees Details</h1>
              <p className='py-4 font-medium font-serif'>{info?.description ? info?.description : "--- No INFO ---"}</p>
            </div>

            {info.contact.length > 0 &&
              <div className='max-w-screen-lg mx-auto py-4 '>
                <h1 className='py-10 ml-10 xl:ml-0 text-3xl sm:text-4xl font-bold'>Contact Details</h1>
                <ul className='px-10 mb-16 text-[15px]  sm:grid sm:grid-cols-2  sm:gap-x-24 '>
                  <li className='flex items-center gap-x-6 sm:gap-x-14 border-b border-r border-dotted py-4'>
                    <img className='h-14 w-14' src="https://nj1-static.collegedekho.com/_next/static/media/address.c59f2228.svg?width=32&q=80" alt="" />
                    <p>{info.contact[0]}</p>
                  </li>
                  <li className='flex items-center gap-x-6 sm:gap-x-14  border-b border-r border-dotted py-4'>
                    <img className='h-14 w-14' src="https://nj1-static.collegedekho.com/_next/static/media/email.bee86b5e.svg?width=32&q=80" alt="" />
                    <p>{info.contact[1]}</p>
                  </li>
                  <li className='flex items-center gap-x-6 sm:gap-x-14 border-b border-r border-dotted py-4'>
                    <img className='h-14 w-14' src="https://nj1-static.collegedekho.com/_next/static/media/telephone.d8bc3d65.svg?width=32&q=80" alt="" />
                    <p>{info.contact[2]}</p>
                  </li>
                  <li className='flex items-center gap-x-6 sm:gap-x-14  border-b border-r border-dotted py-4'>
                    <img className='h-14 w-14' src="https://nj1-static.collegedekho.com/_next/static/media/web.58424917.svg?width=32&q=80" alt="" />
                    <a href={info.contact[3]} target='_blank' rel="noreferrer" className='text-blue-400 hover:underline hover:text-blue-500'>{info.contact[3]}</a>
                  </li>
                </ul>

              </div>}
            <div className="max-w-screen-lg mx-auto px-10 xl:px-0 " id="course-list">
              <h2 className="sm:text-4xl text-3xl  font-bold mb-5">{info.courses && info?.courses.length} Courses are offered by {info?.title}</h2>
              <div className="grid xl:grid-cols-2  gap-8 ">
                {info.courses && info?.courses.length > 0 && info?.courses.map((course, index) => {
                  return (
                    <div key={index} className="bg-gray-100 border rounded border-gray-300 px-8 py-4">
                      <div className='flex justify-between mb-10'>
                        <h1 className='font-bold pt-3 text-3xl'>{course?.name}</h1>
                        <a href={info.url} target='_blank' rel="noreferrer"><TbListDetails className='text-3xl' /></a>
                      </div>
                      <ul className='flex items-start justify-between py-4 font-sans'>
                        <li className='flex flex-col '>
                          <span>Fees (Yearly):</span>
                          <span className='font-semibold flex items-center w-[160px] whitespace-normal'>{course.fees_yearly[1] && <FaRupeeSign className='text-lg mr-2' />} {course.fees_yearly[1] ? course.fees_yearly[1] : `in range(${info.fees})`}</span>
                        </li>
                        {course.exam_accepted ? (
                          <li className='flex flex-col'>
                            <span>Exam Accepted:</span>
                            <span className=' font-semibold whitespace-normal w-[160px]'>{course.exam_accepted.trim()}</span>
                          </li>
                        ) :
                          (<li className='flex flex-col'>
                            <span>No. of Courses:</span>
                            <span className='font-semibold'>{course.avail_sub_courses && course.avail_sub_courses.length}</span>
                          </li>)}

                        <li className='flex flex-col  gap-2 text-[14px]'>
                          <a href={info.url} className='flex-1 rounded w-full py-1 border border-blue-600 text-center'>
                            <button className='text-blue-600'>View Course List</button>
                          </a>
                          <a href={info.url} target='_blank' rel="noreferrer" className='flex-1 rounded px-4 py-1 bg-blue-600 text-center'>
                            <button className='text-white'>Get Free counselling</button>
                          </a>
                        </li>
                      </ul>
                      <hr className='h-1 bg-gray-400 my-4' />
                      <ul className='text-lg flex gap-3 flex-wrap'>
                        {course.avail_sub_courses && course.avail_sub_courses.length > 0 &&
                          course.avail_sub_courses.map((sub_co, ind) => {
                            return (
                              <li key={ind} className='border text-blue-700 bg-blue-100 border-gray-400 px-2 py-1 rounded-xl'>{sub_co}</li>
                            );
                          })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div><div className='my-6 mt-8 py-4 max-w-screen-lg mx-auto '>
            <h1 className='font-bold py-2 border-b text-center border-gray-400 bg-blue-50 px-4'> Visit other popular Institutes </h1>
            <ul className='flex sm:px-4 px-6 items-center mb-3 py-3 gap-x-14 flex-wrap whitespace-normal'>
              {otherInst && otherInst.length > 0 && otherInst.map((inst, index) => {
                return (<li className='sm:text-[15px] text-[13px]  py-2 cursor-pointer text-blue-500 font-semibold hover:underline  hover:text-blue-600' key={index}><Link to={`/courses/${inst.title.trim().toLowerCase().replace(/\s+/g, '-')}?id=${inst._id}`}>{inst.title}</Link></li>);
              })}
            </ul>
          </div></>

      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <DotSpinner />
        </div>
      )}
      <FooterCom />
    </div>

  );
}

export default SingleCoursePage;
