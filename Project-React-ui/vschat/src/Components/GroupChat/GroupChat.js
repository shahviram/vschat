import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { api } from '../../Service/ApiCalls';
import { getUserFromCookies } from '../../utils/cookieUtils';
import withAuth from '../../utils/withAuth';
import Navigation from '../Common/Navigation';
import './GroupChat.css';

const GroupChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const messagesEndRef = useRef(null);
    const user = getUserFromCookies();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchMessages = async () => {
        try {
            const resp = await api.getMessages();
            setMessages(resp.data);
            scrollToBottom();
        } catch (error) {
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'Failed to load messages',
                    type: 'error'
                }
            });
            window.dispatchEvent(event);
        }
    };

    useEffect(() => {
        fetchMessages();
        // Fetch all users on page load
        const fetchUsers = async () => {
            try {
                const resp = await api.getAllUsers();
                setUsers(resp.data);
            } catch (error) {
                window.dispatchEvent(new CustomEvent('showNotification', {
                    detail: {
                        message: 'Failed to load users',
                        type: 'error'
                    }
                }));
            }
        };
        fetchUsers();
        // Poll for new messages every 5 seconds
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setLoading(true);
        try {
            const messageData = {
                messageContent: newMessage,
                senderId: user.userID,
                timestamp: new Date().toISOString() // Compatible with java.time.Instant
            };
            await api.sendMessage(messageData);
            setNewMessage('');
            await fetchMessages();
        } catch (error) {
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'Failed to send message',
                    type: 'error'
                }
            });
            window.dispatchEvent(event);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navigation />
            <Container className="mt-4">
                <h2 className="text-center mb-4">Group Chat</h2>
                <div className="chat-container">
                    <div className="messages-container">
                        {messages.map((message, index) => {
                            // Find sender in users array
                            const sender = users.find(u => u.id === message.senderId);
                            const senderFullName = sender ? `${sender.firstName} ${sender.lastName}` : 'Unknown';
                            return (
                                <Card 
                                    key={index} 
                                    className={`mb-2 ${message.senderId === user.id ? 'own-message' : ''}`}
                                >
                                    <Card.Body>
                                        <div className="message-header">
                                            <strong>{senderFullName}</strong>
                                            <small className="text-muted">
                                                {new Date(message.timestamp).toLocaleString()}
                                            </small>
                                        </div>
                                        <Card.Text>{message.messageContent}</Card.Text>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                    <Form onSubmit={handleSubmit} className="message-form">
                        <Form.Group className="d-flex">
                            <Form.Control
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message..."
                                disabled={loading}
                            />
                            <Button 
                                type="submit" 
                                variant="primary" 
                                className="ms-2"
                                disabled={loading}
                            >
                                Send
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </Container>
        </>
    );
};

export default withAuth(GroupChat);
