import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Course from '../components/InstituteCard';
import DotSpinner from "../components/DotSpinner"
import { useSidebarContext } from '../context/sidebar_context';
import { States, specializationCourses, InstituteType } from "../utils/data"
import FooterCom from '../components/Footer';


const SearchPage = () => {
    const { closeSidebar } = useSidebarContext();
    const [info, setInfo] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(null);
    const location = useLocation();
    const [filterData, setFilterData] = useState({
        location: "", type: "", s_course: ""
    })
    const [searchLength,setSearchLength] = useState();

    useEffect(() => {
       
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        setSearchTerm(searchTermFromUrl);
        if (searchTerm || !(urlParams.get("location") ||urlParams.get("s_course") ||urlParams.get("type")) ) {
            const fetchData = async () => {
                const res = await fetch(`https://it-and-manag-database.onrender.com/api/colleges/all?searchTerm=${searchTerm}`);
                if (!res.ok) {
                    return;
                }
                if (res.ok) {
                    const data = await res.json();
                    setInfo(data.result);
                    setSearchLength(data.total)
                    if (data.result.length === 0) {
                        handleShowMore();
                    }
                }
            };
            fetchData();
            closeSidebar()
        }else if(urlParams.get("location")||urlParams.get("type")||urlParams.get("s_course")){
            const urlParams = new URLSearchParams(location.search);
            const flocation= urlParams.get("location");
            const type = urlParams.get("type");
            const s_course = urlParams.get("s_course");
            setFilterData({
                location:flocation,type,s_course
            })
            const fetchFilteredData = async () => {
                const res = await fetch(`https://it-and-manag-database.onrender.com/api/colleges/filter-all?location=${flocation}&type=${type}&s_course=${s_course}`);
                if (!res.ok) {
                    return;
                }
                const data = await res.json();
                if(data.result.length<6){
                    handleShowMore();
                }
                setInfo(data.result);
                setSearchLength(data.total)
                if (data.result.length === 0) {
                    handleShowMore();
                }
            };
            fetchFilteredData()
        }
    }, [location.search, searchTerm]);


   
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFilterData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = () => {
        if ( filterData.location || filterData.type || filterData.s_course) {
            const formatString = (str) => str.replace(/\s+/g, '-');
            const formattedLocation = filterData.location ? formatString(filterData.location) : '';
            const formattedCourse = filterData.s_course ? formatString(filterData.s_course) : '';
            navigate(`/category?location=${formattedLocation}&s_course=${formattedCourse}&type=${filterData.type}`)
            setSearchTerm(null);
        }
    };
    
    const handleShowMore = async () => {
        const startIndex = info.length;
        try {
            const res = await fetch(`https://it-and-manag-database.onrender.com/api/colleges/all?startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setInfo((prev) => [...prev, ...data.result]);
                setSearchLength(searchLength+data.total);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <div>
                <div className='container flex items-center gap-x-16 my-8 flex-wrap'>
                    <div className='flex flex-col gap-y-2 my-3'>
                        <label className='font-bold text-gray-500'>Location</label>
                        <div className='border border-gray-400 rounded-xl px-2 py-1'>
                            <select onChange={handleChange} value={filterData.location} id='location'>
                                <option value="">--state--</option>
                                {States.map((state) => {
                                    return (<option key={state} value={state}>{state}</option>);
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-2 my-3'>
                        <label className='font-bold text-gray-500'>Specialization Course</label>
                        <div className='border border-gray-400 rounded-xl px-2 py-1'>
                            <select onChange={handleChange} className='overflow-y-auto' value={filterData.s_course} id='s_course'>
                                <option value="">--course--</option>
                                {specializationCourses.map((course) => {
                                    return (<option key={course} value={course}>{course}</option>);
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-2 my-2'>
                        <label className='font-bold text-gray-500'>Institute Type</label>
                        <div className='border border-gray-400 rounded-xl px-2 py-1'>
                            <select onChange={handleChange} className='overflow-y-auto' value={filterData.type} id='type'>
                                <option value="">--type--</option>
                                {InstituteType.map((type) => {
                                    return (<option key={type} value={type}>{type}</option>);
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='px-10 ml-[120px] hidden xl:block'>
                        <h1 className='text-5xl text-gray-600'><span className='bg-gradient-to-tr from-orange-500 to-gray-300 px-2 rounded font-bold mr-1'>Search </span> Page</h1>
                    </div>
                </div>
                <div className='container'>
                    <button onClick={handleSubmit} className='border border-black font-semibold mb-4 px-6 py-2 text-black rounded hover:bg-black hover:text-white'>Apply Filter</button>
                    <hr className='h-2' />
                </div>

            </div>

            {info.length > 0 ? <div>
               <div className='container py-10 my-14 text-center'>
               <h1 className='text-[25px]  font-semibold underline'>Showing {searchLength?searchLength:info.length} Results</h1>
               </div>
                <div className='container mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
                   
                    {info && info.length > 0 && info.map((college) => {
                        return <Course key={college._id} {...college} courseId={college._id} />
                    })}

                </div>

                (
                    <button
                        onClick={handleShowMore}
                        className='text-teal-500 font-semibold text-2xl hover:underline p-7 w-full'
                    >
                        Show More
                    </button>
                )
            </div> :
                <div className="flex justify-center items-center min-h-screen">
                    <DotSpinner />
                </div>
            }
            <FooterCom/>
        </>
    )
}

export default SearchPage