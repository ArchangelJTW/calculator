import React from 'react';
import './App.css';
import Calculator from './Calculator';

// Always keep injection point clean
function App() {
  return (
    <div>
      <Calculator />
    </div>
  );
}

export default App;