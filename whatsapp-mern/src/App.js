import React, { useEffect, useState } from "react";
import './App.css';
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Pusher from 'pusher-js';
import axios from "./axios";

function App() {

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get('/messages/sync')
    .then(response => {
      setMessages(response.data);
    })
  }, [])

  useEffect(() => {
    var pusher = new Pusher('ab8c711a5adb95ddb3a4', {
      cluster: 'us2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
