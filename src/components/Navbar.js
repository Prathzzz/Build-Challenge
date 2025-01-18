import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

// Import sound effect
//import clickSound from "../assets/sounds/click.mp3";

function Navbar() {
  const audioRef = useRef(new Audio("pop.mp3"));

  const handleClick = (e) => {
    // Play sound on click
    audioRef.current.play();

    // Add glitter effect dynamically
    const glitter = document.createElement("span");
    glitter.className = "glitter-effect";
    glitter.style.left = `${e.clientX}px`;
    glitter.style.top = `${e.clientY}px`;
    document.body.appendChild(glitter);

    setTimeout(() => {
      glitter.remove();
    }, 1000);
  };

  return (
    <nav className="navbar">
      <ul>
        <li onClick={handleClick}>
          <Link to="/">
            <img src="home.png" alt="Home" />
            <span className="text">Home</span>
          </Link>
        </li>
        <li onClick={handleClick}>
          <Link to="/habit-tracker">
            <img src="habit.png" alt="Habit Tracker" />
            <span className="text">Habit Tracker</span>
          </Link>
        </li>
        <li onClick={handleClick}>
          <Link to="/goal-setter">
            <img src="goal.webp" alt="Goal Setter" />
            <span className="text">Goal Setter</span>
          </Link>
        </li>
        <li onClick={handleClick}>
          <Link to="/community-resources">
            <img src="com.png" alt="Community Resources" />
            <span className="text">Community Resources</span>
          </Link>
        </li>
        <li onClick={handleClick}>
          <Link to="/transformation-visualizer">
            <img src="graph.webp" alt="Transformation Visualizer" />
            <span className="text">Transformation Visualizer</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
