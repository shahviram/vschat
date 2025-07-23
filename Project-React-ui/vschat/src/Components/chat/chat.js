import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Navigation from "../Common/Navigation";
import { getUserFromCookies } from '../../utils/cookieUtils';
import withAuth from '../../utils/withAuth';
import './chat.css';

function Chat() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = getUserFromCookies();
        setUser(userData);
    }, []);

    return (
        <>
            <Navigation />
            <Container className="mt-4">
                <div className="welcome-section text-center mb-4">
                    <h2>Welcome, {user?.firstname || 'User'}!</h2>
                    <p>Select an option from the navigation bar to begin.</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Group Chat</h3>
                        <p>Join group conversations and interact with other users in real-time.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Manage Users</h3>
                        <p>View and manage user profiles and permissions.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Document Sharing</h3>
                        <p>Upload, share, and manage documents with other users.</p>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default withAuth(Chat);