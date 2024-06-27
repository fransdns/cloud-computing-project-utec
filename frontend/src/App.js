import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ChatWindow from './components/ChatWindows';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/chat" element={<ChatWindow />} />
            </Routes>
        </Router>
    );
}

export default App;
