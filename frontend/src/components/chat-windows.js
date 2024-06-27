import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './message';
import './chat-windows.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get('http://dnspoison.lol:443/messages');
      setMessages(response.data);
    };

    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'me' };
      const response = await axios.post('http://dnspoison.lol:443/messages', newMessage);
      setMessages([...messages, response.data]);
      setInput('');
    }
  };

  return (
    <div className="chat-window">
      <div className="messages-container">
        {messages.map((msg) => (
          <Message key={msg.id} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
