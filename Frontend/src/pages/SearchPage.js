import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Course from '../components/Course';
import DotSpinner from "../components/DotSpinner"
import { useSidebarContext } from '../context/sidebar_context';

const SearchPage = () => {
    const { closeSidebar } = useSidebarContext();

    const [info, setInfo] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState(null);
    const location = useLocation();

    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        setSearchTerm(searchTermFromUrl);
        if (searchTerm) {
            const fetchData = async () => {
                const res = await fetch(`http://localhost:7000/api/colleges/all?searchTerm=${searchTerm}`);
                if (!res.ok) {
                    return;
                }
                if (res.ok) {
                    const data = await res.json();
                    setInfo(data.result);
                    if(data.result.length === 0){
                        handleShowMore();
                    }
                    if (data.result.length === 9) {
                        setShowMore(true);
                    } else {
                        setShowMore(false);
                    }
                }
            };
            fetchData();
            closeSidebar()
        }
    }, [location.search, searchTerm]);

  
   
    const handleShowMore = async () => {
        const startIndex = info.length;
        try {
            const res = await fetch(`http://localhost:7000/api/colleges/all?startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setInfo((prev) => [...prev, ...data.result]);
                if (data.total < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            {info.length > 0 ? <div>
                <div className='container mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
                    {info && info.length > 0 && info.map((college) => {
                        return <Course key={college._id} {...college} courseId={college._id} />
                    })}

                </div>

                {showMore && (
                    <button
                        onClick={handleShowMore}
                        className='text-teal-500 font-semibold text-2xl hover:underline p-7 w-full'
                    >
                        Show More
                    </button>
                )}
            </div> :
                <div className="flex justify-center items-center min-h-screen">
                    <DotSpinner />
                </div>
            }


        </>
    )
}

export default SearchPage
