import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/landingpage';
import Register from './Components/Register/register';
import Login from './Components/Login/login';
import Chat from './Components/chat/chat';
import GroupChat from './Components/GroupChat/GroupChat';
import ManageUsers from './Components/ManageUsers/ManageUsers';
import ManageDocuments from './Components/ManageDocuments/ManageDocuments';
import Notification from './Components/Common/Notification';
import './App.css';

function App() {
    return (
        <Router>
            <Notification />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/group-chat" element={<GroupChat />} />
                <Route path="/manage-users" element={<ManageUsers />} />
                <Route path="/manage-documents" element={<ManageDocuments />} />
            </Routes>
        </Router>
    );
}
export default App;
