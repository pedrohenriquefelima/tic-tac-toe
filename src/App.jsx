import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from './winning-combination';
import GameOver from "./components/GameOver";

const inintialGameBoard = [
  [null,null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {'X':'Player 1', 'O':'Player 2'};

function getCurrentPlayerSymbol(array){
  //this function since it is creted outside of the app component it will not get called whenever the component rerenders
  let currentPlayer = 'X';
  if(array.length > 0 && array[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function getWinner(gameBoard, playersInfo){
  let winner = null;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      console.log('firstSquareSymbol',firstSquareSymbol);
      console.log('playersInfo.firstSquareSymbol',playersInfo[firstSquareSymbol]);
      winner = playersInfo[firstSquareSymbol]
    }
  }

  return winner;
}

function getGameBoard(gameTurns){
  let gameBoard = [...inintialGameBoard.map(array=>[...array])];
    
  for (const turn of gameTurns) {
      const {square, player}  = turn;
      const {row, column} = square;

      gameBoard[row][column] = player;
  }
  return gameBoard;
}

function App() {
  const [playersInfo, setPlayersInfo] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = getCurrentPlayerSymbol(gameTurns);

  const gameBoard = getGameBoard(gameTurns);

  const winner = getWinner(gameBoard, playersInfo);
  const isDraw = gameTurns.length === 9;
  

  function handleGameOver(){
    setGameTurns([]);
  }

  function handleSelectedSquare(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      let currentPlayer = getCurrentPlayerSymbol(prevTurns);
      const updatedTurns = [ { square: { row: rowIndex, column: colIndex}, player: currentPlayer} ,...prevTurns]
      return updatedTurns;
    })
  }

  function handlePlayerNameChange(symbol, newName){
    console.log('name',newName,symbol);
    setPlayersInfo(player => {
      return {
        ...player,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" onPlayerChange={handlePlayerNameChange} activeUser={activePlayer === 'X' ? true : false}/>
          <Player name={PLAYERS.O} symbol="O" onPlayerChange={handlePlayerNameChange} activeUser={activePlayer === 'O' ? true : false}/>
        </ol>
        {(winner || isDraw) &&<GameOver winner={winner} onGameOver={handleGameOver}/>}
        <GameBoard onSelect={handleSelectedSquare} board={gameBoard}/>
      </div>
      <Log logArray={gameTurns}/>
    </main>
  )
}

export default App
