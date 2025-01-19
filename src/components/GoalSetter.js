import React, { useState } from "react";
import "./goal.css";

function GoalSetter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState([]);

  const addGoal = (goal) => {
    setGoals([...goals, goal]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="goal-setter">
      <h2>Goal Setter</h2>
      <p>Define and achieve your goals effectively.</p>

      <button className="add-goal-button" onClick={() => setIsModalOpen(true)}>
        + Add Goal
      </button>

      {isModalOpen && <GoalModal onClose={closeModal} onAddGoal={addGoal} />}

      <div className="goal-list">
        {goals.map((goal, index) => (
          <GoalCard key={index} goal={goal} />
        ))}
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
          ))}
          <button className="add-subtask-button" onClick={addSubtask}>
            + Add Subtask
          </button>
        </div>
        <div className="modal-buttons">
          <button className="modal-add-button" onClick={handleAddGoal}>
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

function GoalCard({ goal }) {
  return (
    <div className={`goal-card ${goal.category.toLowerCase()}`}>
      <h3>{goal.goal}</h3>
      <span className="category">{goal.category}</span>
      {goal.subtasks.length > 0 && (
        <ul>
          {goal.subtasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoalSetter;
