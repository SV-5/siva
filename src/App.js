import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import SignupPage from './components/SignupPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import About from './components/About.jsx';
import { Card, CardContent, CardMedia, Typography, Button, Modal } from '@mui/material';
import { jsPDF } from 'jspdf';
import './assets/css/App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); // Track selected video for modal

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
      console.log('Video IDs:', response.data.items.map((video) => video.id.videoId));

      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
    console.log('After API Call');
  };

  const generatePDF = () => {
    const pdfDoc = new jsPDF();

    pdfDoc.text('Search Results', 10, 10);

    videos.forEach((video, index) => {
      pdfDoc.text(`${index + 1}. ${video.snippet.title}`, 10, 20 + index * 10);
    });

    pdfDoc.save('search_results.pdf');
  };

  const openVideoModal = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<About/>} />
      </Routes>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/login">Login In</Link></li>
              <li><Link to="/about">About Page</Link></li>
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
          <button type="button" onClick={generatePDF}>
            <center>Generate PDF</center>
          </button>
        </div>

        <div className="search-results">
          <h2>Search Results</h2>
          <div className="card-container">
            {videos.map((video) => (
              <Card key={video.id.videoId} className="video-card">
                <CardMedia
                  component="img"
                  alt={video.snippet.title}
                  breath="50"
                  height="100"
                  image={video.snippet.thumbnails.default.url}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {video.snippet.title}
                  </Typography>
                  <Button onClick={() => openVideoModal(video)}>Play Video</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Video Modal */}
        <Modal open={!!selectedVideo} onClose={closeVideoModal}>
          <div>
            {selectedVideo && (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                title={selectedVideo.snippet.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
}

export default App;
