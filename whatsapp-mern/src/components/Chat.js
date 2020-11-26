import React, { useState } from "react";
import "../css/Chat.css";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { SearchOutlined } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import axios from "../axios";

function Chat({ messages }) {

  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post('/messages/new', {
      "message": input,
      "name": "Demo Name",
      "timestamp": "Just Now",
      "received":true
    });

    setInput('');
  };
  return(
    <div  className="chat">
      <div className="chat_header">
        <Avatar />

        <div className="chat_headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
              <SearchOutlined />
          </IconButton>

          <IconButton>
              <AttachFile />
          </IconButton>

          <IconButton>
              <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {
          messages.map((message) => (
            <p
              className={"chat_message " + (message.received && " chat_receiver")}
            >
              <span className="chat_name">{message.name}</span>
              {message.message}
              <span className="chat_timeStamp">{message.timestamp}</span>
            </p>
          ))
        }

      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a Message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
