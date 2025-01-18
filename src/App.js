import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import HabitTracker from './components/HabitTracker';
import GoalSetter from './components/GoalSetter';
import CommunityResources from './components/CommunityResources';
import TransformationVisualizer from './components/TransformationVisualizer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/habit-tracker" element={<HabitTracker />} />
        <Route path="/goal-setter" element={<GoalSetter />} />
        <Route path="/community-resources" element={<CommunityResources />} />
        <Route path="/transformation-visualizer" element={<TransformationVisualizer />} />
      </Routes>
    </Router>
  );
}

export default App;