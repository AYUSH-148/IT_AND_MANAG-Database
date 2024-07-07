import React, { useState,useEffect } from 'react';
import { MdSearch } from "react-icons/md";
import { useNavigate,useLocation } from 'react-router-dom';
const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim() !== '') {
            navigate(`/category?searchTerm=${searchTerm}`)
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default form submission
            handleSubmit(event);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative border-2 rounded-full hidden sm:block w-[330px] md:w-[400px]">
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyDown} // Listen for Enter key
                placeholder="Search courses, colleges/universities"
                className="pl-12 pr-4 py-3 text-2xl border border-gray-300 rounded-full outline-none w-full"
            />
            <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-3xl text-gray-400 cursor-pointer">
                <MdSearch />
            </button>
        </form>
    );
}

export default SearchBar;
