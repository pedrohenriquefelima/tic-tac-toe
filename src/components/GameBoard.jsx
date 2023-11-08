import { useState } from "react";

export default function GameBoard({onSelect, board}){
    return (
    <ol id="game-board">
        {board.map((row, rowIndex)=>(
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, subRowIndex)=>
                    (<li key={subRowIndex}>
                        <button onClick={()=>onSelect(rowIndex, subRowIndex)} disabled={board[rowIndex][subRowIndex] !== null}>{playerSymbol}</button>
                    </li>))}
                </ol>
            </li>
        ))}
    </ol>
    );
}