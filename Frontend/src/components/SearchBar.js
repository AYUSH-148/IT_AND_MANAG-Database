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
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim() !== '') {
        const fetchData = async () => {
            const res = await fetch(`https://it-and-manag-database.onrender.com/api/colleges/name?searchTerm=${searchTerm}`);
            if (!res.ok) {
                return;
            }
            if (res.ok) {
                const data = await res.json();
                setSuggestions(data.result);
            }
        };
        fetchData();
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
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    navigate(`/category?searchTerm=${suggestion}`);
  };

  const fetchSuggestions = (input) => {
    // Replace this with actual fetching logic
    // Example: Fetch suggestions from an API or filter a list
    const sampleSuggestions = ['Course 1', 'Course 2', 'College 1', 'University 1'];
    const filteredSuggestions = sampleSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative border-2 rounded-full hidden sm:block w-[330px] md:w-[400px]">
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
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSuggestionClick(suggestion.title)}
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
