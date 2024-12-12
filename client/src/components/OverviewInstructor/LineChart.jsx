import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Line Chart elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart = () => {
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Months
    datasets: [
      {
        label: "Monthly Enrollments",
        data: [20, 25, 30, 35, 40, 50], // Example data
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
      },
      {
        label: "Course Completions",
        data: [5, 10, 15, 20, 25, 30], // Example data
        borderColor: "#2196F3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2 text-white">
        Instructor Course Growth
      </h2>
      <Line data={lineData} options={options} />
    </div>
  );
};

export default LineChart;
