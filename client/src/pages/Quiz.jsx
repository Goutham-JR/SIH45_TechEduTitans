import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [weekNumber, setWeekNumber] = useState(1); // Default week
  const [quiz, setQuiz] = useState([]);

  // Fetch Quiz from Backend
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/quiz/${weekNumber}`)
      .then((response) => setQuiz(response.data))
      .catch((error) => console.error("Error fetching quiz:", error));
  }, [weekNumber]);

  return (
    <div className="App">
      <h1>Quiz for Week {weekNumber}</h1>
      {quiz.length > 0 ? (
        quiz.map((question, index) => (
          <div key={index}>
            <h3>Q{index + 1}: {question.question}</h3>
            <ul>
              {question.choices.map((choice, idx) => (
                <li key={idx}>{choice}</li>
              ))}
            </ul>
            <strong>Answer: {question.correctAnswer}</strong>
            <hr />
          </div>
        ))
      ) : (
        <p>No quiz found for this week.</p>
      )}

      {/* Week Selector */}
      <div>
        <label>Select Week: </label>
        <select onChange={(e) => setWeekNumber(e.target.value)} value={weekNumber}>
          <option value={1}>Week 1</option>
          <option value={2}>Week 2</option>
          <option value={3}>Week 3</option>
        </select>
      </div>
    </div>
  );
}

export default App;
