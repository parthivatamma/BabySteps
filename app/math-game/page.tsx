"use client";
import React, { useState, useEffect } from 'react';

// Utility function to generate a random integer between min (inclusive) and max (inclusive)
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Component to render hearts indicating remaining lives
const Hearts = ({ lives }: { lives: number }) => {
  const totalLives = 3;
  const hearts = [];

  for (let i = 0; i < totalLives; i++) {
    hearts.push(i < lives ? '❤️' : '🖤');
  }

  return (
    <div style={{ fontSize: '24px' }}>
      {hearts.join(' ')}
    </div>
  );
}

const MathGame: React.FC = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [answers, setAnswers] = useState<number[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [message, setMessage] = useState('');
  const [lives, setLives] = useState(3);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const operators = ['+', '-', '*', '/'];
    const chosenOperator = operators[getRandomInt(0, operators.length - 1)];

    let n1 = getRandomInt(1, 10);
    let n2 = getRandomInt(1, 10);
    let correct = 0;

    switch (chosenOperator) {
      case '+':
        correct = n1 + n2;
        break;
      case '-':
        correct = n1 - n2;
        break;
      case '*':
        correct = n1 * n2;
        break;
      case '/':
        correct = parseFloat((n1 / n2).toFixed(2));
        break;
    }

    const options = new Set<number>();
    options.add(correct);
    while (options.size < 4) {
      let wrongAnswer = getRandomInt(correct - 10, correct + 10);
      options.add(wrongAnswer);
    }

    setNum1(n1);
    setNum2(n2);
    setOperator(chosenOperator);
    setCorrectAnswer(correct);
    setAnswers(Array.from(options).sort(() => Math.random() - 0.5));
    setMessage('');
  }

  const handleAnswerClick = (answer: number) => {
    if (answer === correctAnswer) {
      setMessage('Correct!');
      setTimeout(() => {
        generateQuestion();
      }, 500);
    } else {
      setMessage('Try Again');
      setLives(prev => prev - 1);
      if (lives - 1 === 0) {
        setTimeout(() => {
          setMessage('Game Over!');
        }, 500);
      }
    }
  }

  const resetGame = () => {
    setLives(3);
    generateQuestion();
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
        <h1>Math Game</h1>
        <Hearts lives={lives} />
      </div>
      {lives > 0 ? (
        <>
          <div>
            <h2>
              {num1} {operator} {num2}
            </h2>
            <div>
              {answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(answer)}
                  style={{ margin: '5px', padding: '10px', fontSize: '20px' }}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
          <div style={{ color: message === 'Correct!' ? 'green' : 'red', marginTop: '10px' }}>
            {message}
          </div>
        </>
      ) : (
        <div>
          <h2>Game Over!</h2>
          <button onClick={resetGame} style={{ padding: '10px', fontSize: '20px' }}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default MathGame;