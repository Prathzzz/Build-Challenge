import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

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
      <div className="logo"><img src="icon.png" alt="" /></div>
      
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
            <img src="community.png" alt="Community Resources" />
            <span className="text">Community</span>
          </Link>
        </li>
        <li onClick={handleClick}>
          <Link to="/pomodoro">
            <img src="pomo.webp" alt="Pomodoro" />
            <span className="text"> Pomodoro</span>
          </Link>
        </li>
        <li onClick={handleClick}>
          <Link to="/visualizer">
            <img src="graph.webp" alt="" />
            <span className="text">Visualizer</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
