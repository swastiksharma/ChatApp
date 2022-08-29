import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const modules = {
  toolbar: [
    ["bold", "italic", "strike","link"],
    [{ list:  "ordered" }, { list:  "bullet" }],
    ["blockquote", "code-block"],
    ["image", "video"],
        ["clean"],
  ]
}


function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);


  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      // setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header h-auto">
        <div className="flex justify-center text-bold pt-2 text-white">
          <b>CHAT WINDOW</b>
        </div>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content" dangerouslySetInnerHTML={{__html:messageContent.message}}>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="border-2 m-0 border-white text-white bg-gray-900 rounded-lg mt-2 relative">
        <ReactQuill modules={modules} theme="snow" onChange={setCurrentMessage} placeholder="Chat Comes Here......" className="text-white" />
          <div className="absolute -mt-8 flex right-0">
        <button onClick={sendMessage} className="bg-green-400 justify-end mr-8 h-6 w-12 rounded-lg ">&#9658;</button>
        </div> 

      </div>
    </div>
  );
}

export default Chat;
