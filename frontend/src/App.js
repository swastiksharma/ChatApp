import './App.css';
import io from 'socket.io-client'
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3 className="text-black underline pb-8">WELCOME</h3>
          <input className=""
            type="text"
            placeholder="Enter your name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter the Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom} className="mt-7">Join Chat Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}

    </div>
  );
}


export default App;
