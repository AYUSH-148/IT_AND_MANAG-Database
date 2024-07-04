import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import { MdInfo } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { RiClosedCaptioningFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa"
import { TbListDetails } from "react-icons/tb";
import DotSpinner from '../components/DotSpinner';

const SingleCoursePage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [id, setId] = useState("");
  const [info, setInfo] = useState(null);
  const [trimmedLocation, setTrimmedLocation] = useState(null);

  const [revNos, setRevNos] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('id');
    if (tabFromUrl) {
      setId(tabFromUrl);
    }
  }, [slug]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await fetch(`http://localhost:7000/api/colleges/all?id=${id}`);
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
    <div>
      {info ? (
        <div className="bg-gray-100 py-10 font-serif">
          <div className="max-w-screen-lg mx-auto grid gap-16 lg:grid-cols-2 ">
            <div className="space-y-10 px-10 xl:px-0">
              <div>
                <div className="bg-skin-light mb-4 text-gray-800 uppercase font-bold text-sm inline-block px-3 py-1 rounded">
                  Under IT AND Manag... sector
                </div>
                <h1 className="text-[25px] font-sans font-bold ">{info?.title} Fees & Courses 2024</h1>
              </div>
              <ul className="space-y-4">
                <li className='list-none flex justify-between'>
                  <span className='flex items-center'>
                    <span className='px-2 py-0.5 text-[12px] font-semibold bg-green-400 flex items-center rounded-lg '>{info.rate ? info?.rate : 4.1} <FaStar className='text-white  ml-3' /></span>
                    <span className='ml-3'>({revNos} Reviews)</span>
                  </span>
                  <button className='pr-2 mr-16'><FaRegHeart className='text-4xl text-gray-600 hover:text-red-500' /></button>
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
                <Link to="" className='flex-1 rounded  bg-white py-3 border border-blue-600 text-center'>
                  <button className='text-blue-600 font-semibold '>View Course List</button>
                </Link>
                <button className='rounded flex-1 font-semibold text-white py-3 bg-blue-600'>Shortlist</button>
              </div>
            </div>
            <div className="flex justify-center">
              {info.img && (
                <img
                  src={info.img.includes("static") ? 'https://media.collegedekho.com/media/img/institute/crawled_images/-90110_66624.jpg?w=350&h=350' : info.img}
                  alt="No Image"
                  className="max-h-[230px] lg:rounded-xl lg:rounded-bl-3xl"
                />
              )}
            </div>
          </div>

          <div className="bg-white text-gray-800 mt-10 py-10">
            <div className='max-w-screen-lg my-10 xl:px-0 px-10 mx-auto'>
              <h1 className='font-bold mb-4 text-4xl'>Courses and Fees Details</h1>
              <p className='py-4 font-medium font-serif'>{info?.description}</p>
            </div>
            <div className="max-w-screen-lg mx-auto px-10 xl:px-0">
              <h2 className="text-4xl font-bold mb-5">{info.courses && info?.courses.length} Courses are offered by {info?.title}</h2>
              <div className="grid xl:grid-cols-2  gap-8 ">
                {info.courses && info?.courses.length > 0 && info?.courses.map((course, index) => {
                  return (
                    <div key={index} className="bg-gray-100 border rounded border-gray-300 px-8 py-4">
                      <div className='flex justify-between mb-10'>
                        <h1 className='font-bold pt-3 text-3xl'>{course?.name}</h1>
                        <Link to={info.url}><TbListDetails className='text-3xl' /></Link>
                      </div>
                      <ul className='flex justify-between py-4 font-sans'>
                        <li className='flex flex-col '>
                          <span>Fees (Yearly):</span>
                          <span className='font-semibold'>4-6 Lacks</span>
                        </li>
                        {course.exam_accepted?(
                          <li className='flex flex-col'>
                          <span>Exam Accepted:</span>
                          <span className=' font-semibold'>{course.exam_accepted.trim()}</span>
                        </li>
                        ):
                          (<li className='flex flex-col'>
                            <span>No. of Courses:</span>
                            <span className='font-semibold'>{course.avail_sub_courses && course.avail_sub_courses.length}</span>
                          </li>)
                        }

                        <li className='flex flex-col  gap-2 text-[14px]'>
                          <Link to="" className='flex-1 rounded w-full py-1 border border-blue-600 text-center'>
                            <button className='text-blue-600'>View Course List</button>
                          </Link>
                          <Link to={info.url} className='flex-1 rounded px-4 py-1 bg-blue-600 text-center'>
                            <button className='text-white'>Get Free counselling</button>
                          </Link>
                        </li>
                      </ul>
                      <hr className='h-1 bg-gray-400 my-4' />
                      <ul className='text-lg flex gap-3 flex-wrap'>
                        {course.avail_sub_courses && course.avail_sub_courses.length > 0 &&
                          course.avail_sub_courses.map((sub_co, ind) => {
                            return (
                              <li key={ind} className='border text-blue-700 bg-blue-100 border-gray-400 px-2 py-1 rounded-xl'>{sub_co}</li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <DotSpinner />
        </div>
      )}
    </div>
  );
}

export default SingleCoursePage;
