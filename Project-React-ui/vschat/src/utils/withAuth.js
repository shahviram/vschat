import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from './cookieUtils';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const checkAuth = async () => {
                const authenticated = isAuthenticated();
                console.log('Auth check:', authenticated);
                if (!authenticated) {
                    // Show error message
                    const event = new CustomEvent('showNotification', {
                        detail: {
                            message: 'Please login to access this page',
                            type: 'error'
                        }
                    });
                    window.dispatchEvent(event);
                    
                    // Redirect to login
                    navigate('/login');
                }
            };
            
            checkAuth();
        }, [navigate]);

        return isAuthenticated() ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;
