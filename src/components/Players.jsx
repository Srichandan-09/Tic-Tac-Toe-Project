import { useState } from "react";

export default function Players({ initialName, symbol, isActive, onChangePlayerName }) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    // setIsEditing(!isEditing);
    setIsEditing((editing) => !editing);

    if(isEditing) {
      onChangePlayerName(symbol, playerName);
    }
  }

  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
  }

  return (
    <li className={isActive ? 'active' : ''}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

