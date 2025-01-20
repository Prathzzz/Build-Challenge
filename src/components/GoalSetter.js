import React, { useState } from "react";
import "./goal.css";

function GoalSetter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  
  const addGoal = (goal) => {
    setGoals([...goals, goal]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const markGoalAsCompleted = (goal, isCompleted) => {
    if (isCompleted) {
      // Move from Active to Completed
      setGoals(goals.filter((g) => g !== goal));
      setCompletedGoals([...completedGoals, goal]);
    } else {
      // Move from Completed to Active
      setCompletedGoals(completedGoals.filter((g) => g !== goal));
      setGoals([...goals, goal]);
    }
  };

  return (
    <div className="goal-setter">
      <div className="heading-card">
        <p className="tagline">Goal Setter</p>
        <h1>Turn Your Goals Into Reality, One Step at a Time.</h1>
      </div>

      <button className="add-goal-button" onClick={() => setIsModalOpen(true)}>
        + Add Goal
      </button>

      {isModalOpen && <GoalModal onClose={closeModal} onAddGoal={addGoal} />}

      <div className="goal-list">
        <h3>Active Goals</h3>
        {goals.length === 0 ? (
          <p>No active goals</p>
        ) : (
          goals.map((goal, index) => (
            <GoalCard
              key={index}
              goal={goal}
              onMarkCompleted={markGoalAsCompleted}
              isCompleted={false}
            />
          ))
        )}
      </div>

      <div className="goal-list">
        <h3>Completed Goals</h3>
        {completedGoals.length === 0 ? (
          <p>No completed goals</p>
        ) : (
          completedGoals.map((goal, index) => (
            <GoalCard
              key={index}
              goal={goal}
              onMarkCompleted={markGoalAsCompleted}
              isCompleted={true}
            />
          ))
        )}
      </div>
    </div>
  );
}

function GoalModal({ onClose, onAddGoal }) {
  const [goal, setGoal] = useState("");
  const [category, setCategory] = useState("");
  const [subtasks, setSubtasks] = useState([]);

  const addSubtask = () => setSubtasks([...subtasks, ""]);

  const updateSubtask = (index, value) => {
    const updated = [...subtasks];
    updated[index] = value;
    setSubtasks(updated);
  };
  const add = () => {
    const audio = new Audio("add (2).mp3");
    audio.play();
  };
  const handleAddGoal = () => {
    if (goal && category) {
      onAddGoal({ goal, category, subtasks });
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="modal-title">Add Goal</h3>
        <input
          type="text"
          className="goal-input"
          placeholder="Enter your goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <select
          className="goal-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Career">Career</option>
          <option value="Health">Health</option>
          <option value="Self-Growth">Self-Growth</option>
          <option value="Travel">Travel</option>
          <option value="Financial">Financial</option>
        </select>
        <div className="subtasks-section">
          <h4>Subtasks</h4>
          {subtasks.map((task, index) => (
            <input
              key={index}
              type="text"
              className="subtask-input"
              value={task}
              placeholder={`Subtask ${index + 1}`}
              onChange={(e) => updateSubtask(index, e.target.value)}
            />
          ))}<button className="add-subtask-button" onClick={() => { add(); addSubtask(); }}>

            + Add Subtask
          </button>
        </div>
        <div className="modal-buttons">
          <button className="modal-add-button" onClick={() => { add(); handleAddGoal();}}>
            Add Goal
          </button>
          <button className="modal-cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function GoalCard({ goal, onMarkCompleted, isCompleted }) {
  const [completedSubtasks, setCompletedSubtasks] = useState(
    new Array(goal.subtasks.length).fill(false)
  );

  const toggleSubtaskCompletion = (index) => {
    const updated = [...completedSubtasks];
    updated[index] = !updated[index];
    setCompletedSubtasks(updated);
  };

  return (
    <div
      className={`goal-card ${goal.category.toLowerCase()} ${
        isCompleted ? "completed" : ""
      }`}
    >
      <div className="goal-actions">
        <input
          type="checkbox"
          id={`goal-${goal.goal}`}
          name={`goal-${goal.goal}`}
          onChange={(e) => onMarkCompleted(goal, e.target.checked)}
          checked={isCompleted}
          className="custom-checkbox"
        />
        <label htmlFor={`goal-${goal.goal}`} className="checkbox-label" />
      </div>
      <h3>
        {goal.goal}
        <button className="category-button">{goal.category}</button>
      </h3>
      {goal.subtasks.length > 0 && (
        <div className="subtasks-list">
          {goal.subtasks.map((task, index) => (
            <div key={index} className="subtask-item">
              <input
                type="checkbox"
                id={`subtask-${goal.goal}-${index}`}
                checked={completedSubtasks[index]}
                onChange={() => toggleSubtaskCompletion(index)}
                className="custom-checkbox"
              />
              <label htmlFor={`subtask-${goal.goal}-${index}`} className="checkbox-label" />
              <span
                className={`subtask-text ${
                  completedSubtasks[index] ? "strikethrough" : ""
                }`}
              >
                {task}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default GoalSetter;
