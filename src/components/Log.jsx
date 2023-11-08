export default function Log({logArray}){
    return (
       <ol id="log">
            {logArray.map((item,index) => <li key={index}>{item.player} selected column {item.square.column + 1} on row {item.square.row + 1} </li>)}
       </ol>
    )
}