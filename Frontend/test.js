const axios = require('axios');

// Your API key and search engine ID
const API_KEY = 'AIzaSyCxf3A8hu1OieXkJIjCgjVhlbxwfU_UFLg';
const SEARCH_ENGINE_ID = '21dfe535aeb124765';

// Function to perform the search
async function searchColleges(query) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`;
    
    try {
        const response = await axios.get(url);
        return response.data.items;
    } catch (error) {
        console.error('Error making API request:', error);
        return null;
    }
}

// Function to extract relevant information from search results
function extractCollegeInfo(items) {
    return items.map(item => ({
        name: item.title,
        link: item.link,
        snippet: item.snippet
    }));
}

// Main function to search and display college information
async function main() {
    const query = 'College/Universities offering Btech Course';
    const searchResults = await searchColleges(query);

    if (searchResults) {
        const colleges = extractCollegeInfo(searchResults);
        console.log(JSON.stringify(colleges, null, 4));
    } else {
        console.log('No results found');
    }
}

main();
