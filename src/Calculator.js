import React, { useState, useEffect, useCallback } from 'react';
import './Calculator.css';
import parseInput from './CalculatorParser';

function Calculator() {
  const [input, setInput] = useState('');

  const handleButtonClick = useCallback((value) => {
    setInput((currentInput) => currentInput + value);
  }, []);

  const calculateResult = useCallback(() => {
    try {
      const result = parseInput(input);
      if (result === null) {
        throw new Error('Invalid expression');
      }
      setInput(String(result));
    } catch (error) {
      setInput('Error');
      console.log(error);
    }
  }, [input]);

  const clearInput = useCallback(() => {
    setInput('');
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        calculateResult();
      } else if (event.key === 'Escape') {
        clearInput();
      } else if ((event.key >= '0' && event.key <= '9') || "/*-+().^".includes(event.key)) {
        handleButtonClick(event.key);
      } else if (event.key === 'Backspace') {
        event.preventDefault();
        setInput((currentInput) => currentInput.slice(0, -1));
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [calculateResult, clearInput, handleButtonClick]);

  // Build the user interface
  return (
    <div className="calculator">
      <div className="display">{input || "0"}</div>
      <div className="button-row">
        <button onClick={() => handleButtonClick('(')}>(</button>
        <button onClick={() => handleButtonClick(')')}>)</button>
        <button onClick={() => handleButtonClick('^')}>^</button>
        <button onClick={() => handleButtonClick('/')} className="button-img">
          <img src="div32.png" alt="÷"/>
        </button>
      </div>
      <div className="button-row">
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button onClick={() => handleButtonClick('*')} className="button-img">
          <img src="mul32.png" alt="x"/>
        </button>
      </div>
      <div className="button-row">
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button onClick={() => handleButtonClick('-')}>-</button>
      </div>
      <div className="button-row">
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button onClick={() => handleButtonClick('+')}>+</button>
      </div>
      <div className="button-row">
        <button onClick={clearInput}>C</button>
        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button onClick={calculateResult}>=</button>
      </div>
    </div>
  );
}

export default Calculator;