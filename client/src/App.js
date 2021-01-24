import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { Sidebar } from "./components/sidebar/Sidebar";
import { Chat } from "./components/chat/Chat";
import axios from "./axios";

import "./App.css";
import { Welcome } from "./components/welcome/Welcome";

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    axios.get("/messages/sync").then((res) => {
      setMessages(res.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("77ba1ab964977129a9ba", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      console.log(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]); //keep old messages, plus add new ones
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        <Router>
          <Route
            path="/"
            exact
            render={(props) => (
              <Welcome
                {...props}
                name={name}
                room={room}
                setName={setName}
                setRoom={setRoom}
              />
            )}
          />
          <Route
            path="/chat"
            render={(props) => (
              <Chat
                {...props}
                messages={messages}
                name={name}
                room={room}
                setName={setName}
                setRoom={setRoom}
              />
            )}
          />
        </Router>
      </div>
    </div>
  );
}

export default App;
