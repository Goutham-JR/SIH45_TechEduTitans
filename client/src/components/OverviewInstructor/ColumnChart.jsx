import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

// Register Bar Chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ColumnChart = () => {
  const feedbackData = {
    labels: ["Excellent", "Good", "Average", "Poor"], // Feedback categories
    datasets: [
      {
        label: "Student Feedback",
        data: [100, 0, 0, 0], // Example feedback percentages
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3", "#F44336"], // Colors for bars
        hoverBackgroundColor: ["#45A049", "#FFB300", "#1976D2", "#E53935"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}%`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Feedback Categories",
          color: "#fff",
        },
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Percentage of Feedback",
          color: "#fff",
        },
        ticks: {
          color: "#fff",
          beginAtZero: true,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2 text-white">
        Student Feedback on the Course
      </h2>
      <Bar data={feedbackData} options={options} />
    </div>
  );
};

export default ColumnChart;
