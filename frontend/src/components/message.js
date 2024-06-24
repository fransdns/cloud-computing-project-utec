import React from 'react';
import './message.css';

const Message = ({ text, sender }) => {
  return (
    <div className={`message ${sender === 'me' ? 'my-message' : 'their-message'}`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
