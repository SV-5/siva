

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './assets/css/App.css';
import './components/SignupPage.jsx';
import './components/LoginPage.jsx';

import { Routes, Route } from 'react-router-dom';
import SignupPage from './components/SignupPage.jsx';
import LoginPage from './components/LoginPage.jsx';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]); 

  const apiKey = 'AIzaSyAB7RxbbH-HN0JkD7GtTjmEOpwv6LL-y68';

  const handleSearch = async () => {
    console.log('Before API Call');
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: searchTerm,
          type: 'video',
          key: apiKey,
        },
      });

      console.log('API Response:', response.data);

      // Check specific fields
      console.log('Video IDs:', response.data.items.map((video) => video.id.videoId));

      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
    console.log('After API Call');
  };
  return (
    <>
    <Routes>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
    <div className="App">
    <header>
      <nav>
        <ul>  
          {/* Use Link component for navigation */}
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login In</Link></li>
        </ul>
      </nav>
    </header>

    <section className="main-content">
      <h1><center>Welcome to Our Website</center></h1>
      <center><p>You can search and research all to your needs!!</p></center>
    </section>
    
    <div className="center-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

    <div className="poda">
      <button type="button" onClick={handleSearch}>
        <center>Search</center>
      </button>
    </div>

    <div className="search-results">
      <h2>Search Results</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId}>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            <p>{video.snippet.title}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
  </>
  );
}
export default App;
