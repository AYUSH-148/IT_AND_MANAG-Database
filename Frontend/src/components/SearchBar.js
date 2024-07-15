import React, { useState, useEffect } from 'react';
import { MdSearch } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebarContext } from '../context/sidebar_context';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { closeSidebar } = useSidebarContext();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      const filteredUrl = searchTermFromUrl.replace(/\$/g, ' ');
      setSearchTerm(filteredUrl);
    }
  }, [location.search]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim() !== '') {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/category?searchTerm=${searchTerm}`);
      setShowSuggestions(false);
      closeSidebar();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleSuggestionClick = (suggestionTitle) => {
    setSearchTerm(suggestionTitle);
    handleSubmit()
    setShowSuggestions(false);

  };

  const fetchSuggestions = (input) => {
    const fetchData = async () => {
      const res = await fetch(`https://it-and-manag-database.onrender.com/api/colleges/name?searchTerm=${input}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setSuggestions(data.result);
      setShowSuggestions(true);
    };
    fetchData();
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative border-2 rounded-full hidden md:block w-[330px] md:w-[400px] mr-4">
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
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg max-h-[300px] overflow-y-auto scrollbar-none">
          {suggestions.map((suggestion, index) => (
            <a href={`/category?searchTerm=${suggestion.title}`} key={index}>
              <li
                className="px-4 py-3 text-[14px] text-blue-400 cursor-pointer hover:bg-gray-50 hover:text-blue-500"
                onClick={() => handleSuggestionClick()}
              >
                {suggestion.title}
              </li>
            </a>
          ))}
        </ul>
      )}

    </div>
  );
}

export default SearchBar;
