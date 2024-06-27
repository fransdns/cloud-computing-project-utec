import React, { useState } from 'react';
import ChatWindow from './components/chat-windows';
import Landing from './components/landing';
import './App.css';

function App() {
  const [showChatWindow, setShowChatWindow] = useState(false);

  const handleFormSubmit = () => {
    setShowChatWindow(true);
  };

  return (
    <div className="App">
      {showChatWindow ? <ChatWindow /> : <Landing onFormSubmit={handleFormSubmit} />}
    </div>
  );
}

export default App;
