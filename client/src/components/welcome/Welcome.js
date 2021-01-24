import React from "react";
import { Link } from "react-router-dom";

import "./Welcome.css";

export const Welcome = ({ name, room, setRoom, setName }) => {
  return (
    <div className="welcome__container">
      <div className="welcome__main">
        <h1>Welcome to the chat</h1>
        <div className="welcome__input">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="welcome__input">
          <input
            type="text"
            placeholder="Room"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat`}
        >
          <button type="submit">Join</button>
        </Link>
      </div>
    </div>
  );
};
