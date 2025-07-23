import React, { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import './Notification.css';

const Notification = () => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    useEffect(() => {
        const handleNotification = (event) => {
            setMessage(event.detail.message);
            setType(event.detail.type);
            setShow(true);
        };

        window.addEventListener('showNotification', handleNotification);

        return () => {
            window.removeEventListener('showNotification', handleNotification);
        };
    }, []);

    return (
        <ToastContainer className="p-3" position="top-end">
            <Toast 
                onClose={() => setShow(false)} 
                show={show} 
                delay={3000} 
                autohide
                bg={type === 'success' ? 'success' : 'danger'}
            >
                <Toast.Header>
                    <strong className="me-auto">{type === 'success' ? 'Success' : 'Error'}</strong>
                </Toast.Header>
                <Toast.Body className={type === 'success' ? 'text-white' : ''}>
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default Notification;
