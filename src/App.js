import { useEffect, useState } from 'react';
import './App.css';

function Square({ value, onClick, disabled }) {
  return <button onClick={onClick} disabled={disabled}>{value}</button>;
}

function App() {
  const [array, setArray] = useState(Array(9).fill(''));
  const [curr, setCurr] = useState('X');
  const [status, setStatus] = useState('X turn');
  const [gameOver, setGameOver] = useState(false);

  function handleClick(clickedValue) {
    if (gameOver || array[clickedValue] !== '') {
      return; // If game is over or cell is already filled, return early
    }

    let copyArray = [...array];
    copyArray[clickedValue] = curr;
    setArray(copyArray);
    setCurr(curr === 'X' ? 'O' : 'X');

    
   
  }

  function checkWinner() {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let condition of winConditions) {
      let [a, b, c] = condition;
      if (array[a] && array[a] === array[b] && array[a] === array[c]) {
        return array[a]; // Return 'X' or 'O' if there is a winner
      }
    }

    if (array.every(cell => cell !== '')) {
      return 'draw'; // Return 'draw' if all cells are filled without a winner
    }

    return null; // Return null if no winner yet
  }

  useEffect(() => {
    const winner = checkWinner();
    if (winner === 'X') {
      setStatus('X is Winner 🏆'); setGameOver(true);
    } else if (winner === 'O') {
      setStatus('O is Winner 🏆');setGameOver(true);
    } else if (winner === 'draw') {
      setStatus('It\'s a Draw'); setGameOver(true);
    } else {
      setStatus(`${curr} turn`);
    }
  }, [array]);

  function resetGame() {
    setArray(Array(9).fill(''));
    setCurr('X');
    setStatus('X turn');
    setGameOver(false); // Reset gameOver state
  }

  return (
    <div className='parent'>
      <h1>Tic-Tac-Toe</h1>
      <div className="App">
        <div className='row'>
          <Square value={array[0]} onClick={() => handleClick(0)} disabled={gameOver} />
          <Square value={array[1]} onClick={() => handleClick(1)} disabled={gameOver} />
          <Square value={array[2]} onClick={() => handleClick(2)} disabled={gameOver} />
        </div>
        <div className='row'>
          <Square value={array[3]} onClick={() => handleClick(3)} disabled={gameOver} />
          <Square value={array[4]} onClick={() => handleClick(4)} disabled={gameOver} />
          <Square value={array[5]} onClick={() => handleClick(5)} disabled={gameOver} />
        </div>
        <div className='row'>
          <Square value={array[6]} onClick={() => handleClick(6)} disabled={gameOver} />
          <Square value={array[7]} onClick={() => handleClick(7)} disabled={gameOver} />
          <Square value={array[8]} onClick={() => handleClick(8)} disabled={gameOver} />
        </div>
      </div>
      <h1>{status}</h1>
      <button className='reset' onClick={resetGame}>Reset</button>
    </div>
  );
}

export default App;
