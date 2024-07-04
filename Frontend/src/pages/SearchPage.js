import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Course from '../components/Course';
const SearchPage = () => {
    const [info, setInfo] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState(null);
    const navigate = useNavigate();
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
                    if (data.result.length === 9) {
                        setShowMore(true);
                    } else {
                        setShowMore(false);
                    }
                }
            };
            fetchData();
        }


    }, [location.search, searchTerm]);
    console.log(info)
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
            <div className='
        container mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
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

        </>
    )
}

export default SearchPage
