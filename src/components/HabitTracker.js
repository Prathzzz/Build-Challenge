import React, { useState } from "react";
import "./habit.css";

const HabitTracker = () => {
  const add = () => {
    const audio = new Audio("add.mp3");
    audio.play();
  };

  const sub = () => {
    const audio = new Audio("sub.mp3");
    audio.play();
  };

  const main = () => {
    const audio = new Audio("main.mp3");
    audio.play();
  };

  const [habits, setHabits] = useState([
    {
      id: 1,
      title: "Drink Water",
      subtasks: [
        { name: "1L", completed: false },
        { name: "2L", completed: false },
        { name: "3L", completed: false },
      ],
      streak: 0,
    },
    {
      id: 2,
      title: "Exercise",
      subtasks: [
        { name: "Yoga", completed: false },
        { name: "Cardio", completed: false },
      ],
      streak: 0,
    },
    {
      id: 3,
      title: "Read a Book",
      subtasks: [
        { name: "Chapter 1", completed: false },
        { name: "Chapter 2", completed: false },
      ],
      streak: 0,
    },
  ]);

  const [newHabit, setNewHabit] = useState("");
  const [newSubtasks, setNewSubtasks] = useState("");

  // Add a new habit
  const addHabit = () => {
    if (newHabit.trim() && newSubtasks.trim()) {
      const subtasksArray = newSubtasks.split(",").map((task) => ({
        name: task.trim(),
        completed: false,
      }));
      setHabits([
        ...habits,
        { id: Date.now(), title: newHabit, subtasks: subtasksArray, streak: 0 },
      ]);
      setNewHabit("");
      setNewSubtasks("");
    }
  };

  // Update subtasks when marked as completed
  const toggleSubtask = (habitId, subtaskIndex) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              subtasks: habit.subtasks.map((subtask, index) =>
                index === subtaskIndex
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
            }
          : habit
      )
    );
  };

  // Move to completed section when all subtasks are completed
  const moveToCompleted = (habitId) => {
    setHabits((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== habitId)
    );
  };

  const completedHabits = habits.filter((habit) =>
    habit.subtasks.every((subtask) => subtask.completed)
  );

  const activeHabits = habits.filter(
    (habit) => !habit.subtasks.every((subtask) => subtask.completed)
  );

  return (
    <div className="habit-tracker">
      <h1>Habit Tracker</h1>
      <div className="centered">
        <b></b>
        <h2>Start Your Journey Today!</h2>
        <div className="feature-list">
          <div className="feature">
            <h3>1. Start with Simple Habits:</h3>
            <p>Track 2-3 easy habits initially to build consistency.</p></div>
          <div className="feature">
            <h3>2. Set SMART Goals: </h3>
            <p>Ensure your habits are Specific, Measurable, Achievable, Relevant, and Time-bound.</p>
          </div>
          <div className="feature">
            <h3>3. Use a Streak System for Motivation: </h3>
            <p>Track streaks to visualize progress and stay consistent.</p>
          </div>
          <div className="feature">
            <h3>4. Reflect and Adjust Regularly</h3>
            <p>Review and refine your habits weekly or monthly for better alignment.</p>
          </div>
        </div>
      </div>
      <div className="add-habit">
        <input
          type="text"
          placeholder="New Habit Title"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subtasks (comma separated)"
          value={newSubtasks}
          onChange={(e) => setNewSubtasks(e.target.value)}
        />
        <button
          onClick={() => {
            add(); // Play sound
            addHabit(); // Add a new habit
          }}
        >
          Add Habit
        </button>
      </div>

      {/* Active Habits Section */}
      <h2>Active Habits</h2>
      <div className="habits-list">
        {activeHabits.map((habit) => (
          <div
            key={habit.id}
            className={`habit-item ${habit.subtasks.every((task) => task.completed) ? "completed" : ""}`}
          >
            <h3>{habit.title}</h3>
            <ul className="subtasks">
              {habit.subtasks.map((subtask, index) => (
                <li key={index} className={subtask.completed ? "completed" : ""}>
                  <label>
                    <input
                      type="radio"
                      checked={subtask.completed}
                      onClick={() => {
                        sub();
                      }}
                      onChange={() => toggleSubtask(habit.id, index)}
                    />
                    <span className={subtask.completed ? "completed-text" : ""}>
                      {subtask.name}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            {habit.subtasks.every((task) => task.completed) && (
              <button
                onClick={() => {
                  main(); // Play sound
                  moveToCompleted(habit.id); // Move habit to the completed section
                }}
              >
                Move to Completed
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Completed Habits Section */}
      <h2>Completed Habits</h2>
      <div className="habits-list">
        {completedHabits.map((habit) => (
          <div key={habit.id} className="habit-item completed">
            <h3>{habit.title}</h3>
            <ul className="subtasks">
              {habit.subtasks.map((subtask, index) => (
                <li key={index} className={subtask.completed ? "completed" : ""}>
                  <span className={subtask.completed ? "completed-text" : ""}>
                    {subtask.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;
