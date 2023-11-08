import { useState } from "react"

export default function Player({name, symbol, activeUser, onPlayerChange}){
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    function changeModeHandler() {
        setIsEditing((prev)=> !prev);
        onPlayerChange(symbol,playerName);
        
    }

    function changeNameHandler(event) {
        setPlayerName(event.target.value);
    }

    return (
        <li className={activeUser ? 'active' : undefined}>
            <span className="player">
              {!isEditing && <span className="player-name">{playerName}</span>}
              {isEditing && <input type="text" value={playerName} required onChange={changeNameHandler}></input>}
              {!isEditing && <span className="player-symbol">{symbol}</span>}
            </span>
            <button onClick={changeModeHandler}>{isEditing ? 'save' : 'edit'}</button>
        </li>
    )
}