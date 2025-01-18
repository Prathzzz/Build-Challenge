import React from 'react';
import Navbar from './Navbar';
import './habit.css';
function HabitTracker() {
  return (
    <div className="habit-tracker">
      
      <div className="habit-tracker">
      <h2>Habit Tracker</h2>
      <p>Track and maintain your daily habits.</p>
      <div className="habits">
        <div className="habit">
          <h3>Exercise</h3>
          <p>30 minutes</p>
          <button>+</button>
          <button>-</button>
        </div>
        <div className="habit">
          <h3>Read</h3>
          <p>30 minutes</p>
          <button>+</button>
          <button>-</button>
        </div>
        <div className="habit">
          <h3>Meditate</h3>
          <p>10 minutes</p>
          <button>+</button>
          <button>-</button>
        </div>
        <div className="habit">
          <h3>Journal</h3>
          <p>10 minutes</p>
          <button>+</button>
          <button>-</button>
        </div>
      </div>
      </div>
      </div>
  );
}

export default HabitTracker;