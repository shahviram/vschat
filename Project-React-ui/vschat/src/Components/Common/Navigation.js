import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { removeCookies } from '../../utils/cookieUtils';

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        removeCookies(); // Remove all cookies
        // Show success message
        const event = new CustomEvent('showNotification', {
            detail: {
                message: 'Logged out successfully!',
                type: 'success'
            }
        });
        window.dispatchEvent(event);

        // Redirect to login after 3 seconds
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/chat">VS Chat</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link 
                            as={Link} 
                            to="/chat" 
                            active={location.pathname === '/chat'}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/group-chat" 
                            active={location.pathname === '/group-chat'}
                        >
                            Group Chat
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/manage-users" 
                            active={location.pathname === '/manage-users'}
                        >
                            Manage Users
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/manage-documents" 
                            active={location.pathname === '/manage-documents'}
                        >
                            Manage Documents
                        </Nav.Link>
                    </Nav>
                    <Button variant="outline-light" onClick={handleLogout}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
