import React, { useState, useEffect } from 'react';
import { MdSearch } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
        const filteredUrl = searchTermFromUrl.replace(/\$/g, ' ')
        setSearchTerm(filteredUrl);
    }
  }, [location.search]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim() !== '') {
        fetchSuggestions(value)
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/category?searchTerm=${searchTerm}`)
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const newSugg = suggestion.replace(/\s+/g, '$')
    setSearchTerm(newSugg);
    setShowSuggestions(false);
    navigate(`/category?searchTerm=${newSugg}`);
  };

  const fetchSuggestions = (input) => {
    const fetchData = async () => {
        const res = await fetch(`https://it-and-manag-database.onrender.com/api/colleges/name?searchTerm=${input}`);
        if (!res.ok) {
            return;
        }
        if (res.ok) {
            const data = await res.json();
            setSuggestions(data.result);
            setShowSuggestions(true);
        }
    };
    fetchData();
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative border-2 rounded-full hidden md:block w-[330px] md:w-[400px]">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search courses, colleges/universities"
          className="pl-12 pr-4 py-3 text-2xl border border-gray-300 rounded-full outline-none w-full"
        />
        <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-3xl text-gray-400 cursor-pointer">
          <MdSearch />
        </button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg max-h-72 scrollbar-none overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 text-[14px] text-blue-400 cursor-pointer hover:bg-gray-50 hover:text-blue-500"
              onClick={() => handleSuggestionClick(suggestion.title)}
            >
              {suggestion.title}, 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
