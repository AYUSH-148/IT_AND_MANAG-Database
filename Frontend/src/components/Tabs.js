import React, { useEffect, useState } from 'react';
import Course from './Course';


const Tabs = () => {
  const [activeTab, setActiveTab] = useState('B.Tech');
  const [colleges, setColleges] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const tabHandler = (category) => {
    setActiveTab(category);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:7000/api/colleges/all?searchTerm=${activeTab}`);
      const data = await res.json();
      if (data.total < 9) {
        setShowMore(false);
      }
      setColleges(data.result);
    };
    fetchData();
  }, [activeTab])

  const handleShowMore = async () => {
    const startIndex = colleges.length;
    try {
      const res = await fetch(`http://localhost:7000/api/colleges/all?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setColleges((prev) => [...prev, ...data.result]);
        if (data.total < 9) {
          setShowMore(false);
        }
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

        <div className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
          {colleges?.length > 0 && colleges?.map((college) => (
            <Course key={college._id} {...college} courseId={college._id} />
          ))}
        </div>
        {showMore && (
          <>
            <div className='flex justify-center mt-8'>
              <button
                onClick={handleShowMore}
                className=' text-teal-600 font-semibold self-center hover:underline py-4'
              >
                Show more
              </button>
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default Tabs;
