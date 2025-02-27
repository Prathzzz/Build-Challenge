import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import HabitTracker from './components/HabitTracker';
import GoalSetter from './components/GoalSetter';
import CommunityResources from './components/CommunityResources';
import Pomodoro from './components/pomodoro';
import Visualizer from './components/Visualizer';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/habit-tracker" element={<HabitTracker />} />
            <Route path="/goal-setter" element={<GoalSetter />} />
            <Route path="/community-resources" element={<CommunityResources />} />
            <Route path="/visualizer" element={<Visualizer />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
