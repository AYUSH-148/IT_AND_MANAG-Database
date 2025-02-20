import React, { useEffect, useState } from 'react';
import InstituteCard from './InstituteCard';
import { FaSpinner } from 'react-icons/fa';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('B.Tech');
  const [colleges, setColleges] = useState(null);

  const tabHandler = (category) => {
    setActiveTab(category);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://it-and-manag-database.onrender.com/api/colleges/all?searchTerm=${activeTab}`);
      const data = await res.json();

      setColleges(data.result);
    };
    fetchData();
  }, [activeTab])

  const handleShowMore = async () => {
    const startIndex = colleges.length;
    try {
      const res = await fetch(`https://it-and-manag-database.onrender.com/api/colleges/all?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setColleges((prev) => [...prev, ...data.result]);

      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='mt-4'>
      <div className='tabs'>
        <ul className='flex flex-wrap'>
          {['B.Tech', 'BBM', 'M.Tech', 'BBA', 'B.Sc', 'PGDM'].map((tab) => (
            <li className={`mr-3 my-4 border border-gray-700 ${activeTab === tab ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`} key={tab}>
              <button
                type='button'
                className={` py-3 bg-cover px-8 transition font-medium text-2xl `}
                onClick={() => tabHandler(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        {colleges ? <>
          <div className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
            {colleges?.length > 0 && colleges?.map((college) => (
              <InstituteCard key={college._id} {...college} courseId={college._id} />
            ))}
          </div>
          <div className='flex justify-end mb-4'>
            <button
              onClick={handleShowMore}
              className=' text-blue-600 text-[13px] font-semibold self-center hover:underline py-4 pr-4'
            >
              Show more
            </button>
          </div>

        </> :
         <div className="flex justify-center items-center h-[40vh]">
         <div className="relative w-20 h-20">
            <FaSpinner className="animate-spin text-blue-400" size={50} />
         </div>
       </div>

        }

      </div>
    </div>
  );
};

export default Tabs;
