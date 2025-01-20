import React, { useState, useEffect, useCallback } from "react";
import "./pomodoro.css";

function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Initial time (25 mins)
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState("Pomodoro"); // Pomodoro, Short Break, Long Break
  const [pomodoroCount, setPomodoroCount] = useState(0); // Count of completed Pomodoros

  const sessionDurations = {
    Pomodoro: 25 * 60,
    "Short Break": 5 * 60,
    "Long Break": 15 * 60,
  };

  // Ensure startSession is included as a dependency for useCallback
  const handleSessionEnd = useCallback(() => {
    if (currentSession === "Pomodoro") {
      setPomodoroCount((prev) => prev + 1);
      if ((pomodoroCount + 1) % 3 === 0) {
        startSession("Long Break");
      } else {
        startSession("Short Break");
      }
    } else {
      startSession("Pomodoro");
    }
  }, [currentSession, pomodoroCount, startSession]); // Added startSession to dependencies

  const startSession = (session) => {
    setCurrentSession(session);
    setTimeLeft(sessionDurations[session]);
    setIsRunning(false);
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionEnd(); // Use the memoized function
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, handleSessionEnd]); // Include handleSessionEnd in dependencies

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(sessionDurations[currentSession]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="pomodoro">
      <h1 className="pomodoro-heading">Pomodoro Timer</h1>
      <div className="timer-display">
        <h2>{currentSession}</h2>
        <span className="time-left">{formatTime(timeLeft)}</span>
      </div>
      <div className="controls">
        <button className="control-button" onClick={toggleTimer}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="control-button" onClick={resetTimer}>Reset</button>
      </div>
      <p className="pomodoro-count">Pomodoros Completed: {pomodoroCount}</p>
    </div>
  );
}

export default Pomodoro;
