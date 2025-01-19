import React from 'react';
import './home.css';
import Calendar from 'react-calendar/dist/cjs/Calendar.js';

const Home = () => {
  const playSound = () => {
    const audio = new Audio("pop.mp3");
    audio.play();
    
  };
 return (
    <div className="home">
      {/* Left Section */}
      <div className="left-section">
  <header className="hero-section">
    <div className="image-slider">
      <img src="ban4.png" alt="" />
      <img src="ban5.png" alt="" />
      <img src="ban6.png" alt="" />
    </div>
    <div className="hero-text" onClick={playSound}>
      <h1>Welcome to New Beginnings</h1>
      <p>Track your progress, set goals, and achieve success with our tools.</p>
        <br />{/* New Container */}
      <div className="centered-container">
        <b></b>
        <h2>Start Your Journey Today!</h2>
        <p>Here's the list of things you can do with New Beginnings:</p>

        <div className="feature-list">
          <div className="feature">
            <h3>Habit Tracker:</h3>
            <p>Track your daily habits and stay consistent on your path to success.</p>
          </div>
          <div className="feature">
            <h3>Goal Setter:</h3>
            <p>Set clear, achievable goals and watch your progress unfold.</p>
          </div>
          <div className="feature">
            <h3>Community:</h3>
            <p>Join a supportive community to stay motivated and inspired.</p>
          </div>
          <div className="feature">
            <h3>Visualizer:</h3>
            <p>Visualize your journey and celebrate every milestone you achieve.</p>
          </div>
        </div>

        <button onClick={playSound}>Get Started</button>
      </div>
    </div>
  </header>
</div>


      {/* Right Section */}
      <div className="right-section">
        <div className="productivity-container">
          {/* Streak Section */}
          <div className="streak">
            <h2>Days Productive: </h2>
            <span>🔥 0 days</span>
          </div>

          {/* Complete and Failed Cards */}
          <div className="status-grid">
            <div className="status-card complete">
              <div className="icon">✔</div>
              <p>Complete</p>
              <h3>0 Days</h3>
            </div>
            <div className="status-card failed">
              <div className="icon">✖</div>
              <p>Failed</p>
              <h3>0 Days</h3>
            </div>
          </div>

          {/* Additional Grid */}
          <div className="additional-grid">
            <div className="status-card progress">
              <div className="icon">📈</div>
              <p>Progress</p>
              <h3>0%</h3>
            </div>
            <div className="status-card target">
              <div className="icon">🎯</div>
              <p>Target</p>
              <h3>0 Goals</h3>
            </div>
          </div>

          {/* Calendar */}
          <div className="calendar-container">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;