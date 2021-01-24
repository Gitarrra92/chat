import React, { useState } from "react";

import { Avatar } from "@material-ui/core";

import "./Chat.css";
import axios from "../../axios";

export const Chat = ({ messages }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    axios.post("/messages/new", {
      message: input,
      name: "natalia",
      timestamp: "real time",
      received: false,
    });

    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerAvatar">
          <Avatar />
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && "chat__reciever"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__foter">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat__foter--input"
            type="text"
            placeholder="write your message"
          />
          <button
            onClick={sendMessage}
            className="chat__foter--button"
            type="submit"
          >
            Send a message
          </button>
        </form>
      </div>
    </div>
  );
};
