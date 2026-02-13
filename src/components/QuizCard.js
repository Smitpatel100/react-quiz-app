import React from "react";

function QuizCard({ topic, setSelectedTopic }) {
  return (
    <div style={{ margin: "10px" }}>
      <button onClick={() => setSelectedTopic(topic)}>
        Start {topic.toUpperCase()} Quiz
      </button>
    </div>
  );
}

export default QuizCard;
