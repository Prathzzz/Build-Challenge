import React from "react";
import { Bar } from "react-chartjs-2";
import "./trans.css";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const NeonChart = ({ labels, data, chartTitle }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Task Completion Frequency",
        data,
        backgroundColor: "rgba(242, 0, 255, 0.5)",
        borderColor: "rgb(217, 0, 255)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255, 0, 230, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(96, 22, 109, 0.2)" },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(164, 75, 192, 0.2)" },
      },
    },
  };

  return (
    <div className="chart-container">
      <h1 className="chart-title">{chartTitle}</h1>
      <Bar data={chartData} options={options} />
    </div>
  );
};

const TransformationVisualizer = () => {
  // Default tasks for testing purposes
  const completedHabits = [
    {
      id: 1,
      title: "Drink Water",
      subtasks: [
        { name: "1L", completed: true },
        { name: "1L", completed: true },
        { name: "2L", completed: false },
      ],
    },
    {
      id: 2,
      title: "Exercise",
      subtasks: [
        { name: "Yoga", completed: true },
        { name: "Yoga", completed: true },
        { name: "Yoga", completed: true },
        { name: "Cardio", completed: true },
      ],
    },
    {
      id: 3,
      title: "Read Books",
      subtasks: [
        { name: "Books", completed: true },
        { name: "Books", completed: true },
      ],
    },
  ];

  // Calculate task frequencies
  const taskFrequencies = completedHabits.reduce((freq, habit) => {
    habit.subtasks.forEach((subtask) => {
      if (subtask.completed) {
        freq[subtask.name] = (freq[subtask.name] || 0) + 1;
      }
    });
    return freq;
  }, {});

  const taskNames = Object.keys(taskFrequencies);
  const taskCounts = Object.values(taskFrequencies);

  // Goal data for testing purposes (new chart below)
  const goalFrequencies = {
    "Complete 5 tasks": 3,
    "Read 20 pages": 5,
    "Walk 10000 steps": 2,
  };

  const goalNames = Object.keys(goalFrequencies);
  const goalCounts = Object.values(goalFrequencies);

  return (
    <div className="visualizer-container">
      <NeonChart labels={taskNames} data={taskCounts} chartTitle="Task Completion Frequency" />
      <NeonChart labels={goalNames} data={goalCounts} chartTitle="Goal Completion Frequency" />
    </div>
  );
};

export default TransformationVisualizer;
