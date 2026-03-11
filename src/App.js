import React, { useState } from "react";
import QuizCard from "./components/QuizCard";
import { quizData } from "./data/quizData";
import "./styles.css";

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = selectedTopic ? quizData[selectedTopic] : [];

  const handleNext = () => {
    const correctAnswer = questions[currentQuestionIndex].correct;

    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setSelectedTopic(null);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
  };

  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container">
      <div className="card">

        {!selectedTopic && (
          <>
            <h1>Select a Quiz</h1>
            <QuizCard topic="java" setSelectedTopic={setSelectedTopic} />
            <QuizCard topic="sql" setSelectedTopic={setSelectedTopic} />
            <QuizCard topic="react" setSelectedTopic={setSelectedTopic} />
          </>
        )}

        {selectedTopic && !quizFinished && (
          <>
            <h2>{selectedTopic.toUpperCase()} Quiz</h2>

            <p>
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>

            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            <h3>{questions[currentQuestionIndex].question}</h3>

            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  selectedOption === index ? "selected" : ""
                }`}
                onClick={() => setSelectedOption(index)}
              >
                {option}
              </button>
            ))}

            <button
              className="next-btn"
              onClick={handleNext}
              disabled={selectedOption === null}
            >
              {currentQuestionIndex === questions.length - 1
                ? "Finish"
                : "Next"}
            </button>
          </>
        )}

        {quizFinished && (
          <>
            <h2>Quiz Completed</h2>

            <h3>
              Score: {score} / {questions.length}
            </h3>

            <h3>
              Percentage: {Math.round((score / questions.length) * 100)}%
            </h3>

            <h3>
              {score >= 8
                ? "Excellent!"
                : score >= 5
                ? "Good job!"
                : "Keep practicing!"}
            </h3>

            <button className="restart-btn" onClick={restartQuiz}>
              Restart Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;