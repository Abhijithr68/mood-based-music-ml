import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import '../styles/homepage.css'; // Custom CSS for styling

const HomePage = () => {
  const webcamRef = useRef(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setLoading(true);
      try {
        // Step 1: Send the captured image to the backend for mood detection
        const moodResponse = await fetch('http://127.0.0.1:5000/detect_mood', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imageSrc }),
        });

        const moodData = await moodResponse.json();
        const mood = moodData.mood;

        // Step 2: Fetch songs based on the detected mood
        const songResponse = await fetch('http://127.0.0.1:5000/recommend_songs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mood }),
        });

        const songData = await songResponse.json();
        setSongs(songData.songs); // Save songs to state
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="homepage">
      <header className="header">
        <h1>EMOTUNES</h1>
      </header>
      <div className="center-box">
        <div className="profile-icon">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam-preview"
          />
        </div>
        <div className="button-container">
          <button className="capture-button" onClick={captureImage} disabled={loading}>
            {loading ? 'Detecting...' : 'SNAP'}
          </button>
        </div>
        {songs.length > 0 && (
          <div className="song-list">
            <h3>Recommended Songs:</h3>
            <div className="song-cards">
              {songs.map((song, index) => (
                <div className="song-card" key={index}>
                  <a href={song.url} target="_blank" rel="noopener noreferrer">
                    <div className="song-info">
                      <h4>{song.name}</h4>
                      <p>{song.artist}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
