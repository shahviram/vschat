import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/landingpage';
import Register from './Components/Register/register';
import Login from './Components/Login/login';
import Chat from './Components/chat/chat'; // Import the Chat component
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chat" element={<Chat />} /> {/* Add the Chat route */}
            </Routes>
        </Router>
    );
}

export default App;
