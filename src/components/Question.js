import React, { useState, useEffect } from "react";

function Question({ question, answers: questionAnswers = [], onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    let timer;
    if (timeRemaining > 0) {
      // Start the timer when the component mounts
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      // Reset the timer when the question changes
      setTimeRemaining(10);
    }

    // Cleanup function to clear the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, [timeRemaining, question]);

  useEffect(() => {
    if (timeRemaining === 0) {
      // Reset timeRemaining back to 10 seconds for the next question
      setTimeRemaining(10);
      // Call the onAnswered callback with a value of false to trigger behavior in the App component
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  // Check if the necessary properties are available in the question object
  if (!question || !question.id || !question.prompt || !question.answers || !question.correctIndex) {
    return null; // Or you can render an error message or a loading indicator here
  }

  return (
    <>
      <h1>Question {question.id}</h1>
      <h3>{question.prompt}</h3>
      {questionAnswers.map((answer, index) => {
        const isCorrect = index === question.correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question