import React from "react";

function QuizCard({ topic, setSelectedTopic }) {
  return (
    <div className="quiz-card">
      <button
        className="quiz-btn"
        onClick={() => setSelectedTopic(topic)}
      >
        Start {topic.toUpperCase()} Quiz
      </button>
    </div>
  );
}

export default QuizCard;