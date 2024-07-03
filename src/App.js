
import { useState } from 'react';
import "./App.css";

function Header() {
  return <h1 className='main-title'>Tic Tac Toe</h1>;
  
}

function UserCustomisation({onSubmit}) {
  const playerData = () => {
    //const firstPlayer 
  }
  const [playerOneVal, setPlayerOneVal] = useState('');
  const [playerTwoVal, setPlayerTwoVal] = useState('');

  const handleChange1 = (e) => {
    setPlayerOneVal(e.target.value);
    
  };

  const handleChange2 = (e) => {
    setPlayerTwoVal(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ playerOneVal, playerTwoVal })
  }

  

  return (
    <div>
      <h2>Enter Player Names</h2>
      <input type="text" value={playerOneVal} onChange={handleChange1}/>
      <input type="text" value={playerTwoVal} onChange={handleChange2}/>
      <br></br>
      <button className='players-button' onclick={onSubmit}>Lets Play!</button>
    </div>
    

  )

}

function DisplayPlayers ({firstPlayer, secondPlayer}) {
  return (
    <div>
      <p>Player One: {firstPlayer}</p>
      <p>Player Two: {secondPlayer} </p>
    </div>
  )
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
function calculateWinner(squares) {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i=0; i<wins.length; i++){
    const [a,b,c] = wins[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ xIsNext, squares, onPlay}) {

  function handleClick(i) {
    if(squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }


  return (
    <>
    <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentmove] = useState(0);
  const [user1, user2] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentmove(nextHistory.length -1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove){
    setCurrentmove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move >0) {
      description = 'Go to move no. '  + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button id="history-tab" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });

  const [players, setPlayers] = useState({
    firstPlayer: 'hi',
    secondPlayer: 'there'
  });
  
  const handlePlayers = (players) => {
    setPlayers(players);
  }

  return (
    <div className="game">
      <Header />
      <div classname="content">
        <UserCustomisation firstPlayer={players.playerOneVal} secondPlayer={players.playerTwoVal}/>
        <DisplayPlayers firstPlayer={players.playerOneVal} secondPlayer={players.playerTwoVal}/>
        <div className='game-board'>
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className='game-info'>
          <h2>History</h2>
        <ol>{moves}</ol>
      </div>
      </div>
      
    </div>
  )
}

export default Game;
 

/**
 *  flex:1;
  flex-direction: column;
  align-items: center;
  justify-items: center;
 */

  