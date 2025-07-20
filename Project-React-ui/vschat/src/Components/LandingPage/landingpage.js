import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './landingpage.css';

const carouselImages = [
    'https://images.pexels.com/photos/4666752/pexels-photo-4666752.jpeg', // two people chatting at separate tables
    'https://images.pexels.com/photos/1181706/pexels-photo-1181706.jpeg', // chat on phone
    'https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg'  // group chat
];

function LandingPage() {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % carouselImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="landing-page"
            style={{
                backgroundImage: `url(${carouselImages[current]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div className="overlay">
                <div className="chat-svg-anim">
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#shadow)">
                            <rect x="10" y="20" width="100" height="60" rx="18" fill="#fff"/>
                            <rect x="20" y="30" width="80" height="40" rx="12" fill="#e3f2fd"/>
                            <ellipse cx="40" cy="50" rx="5" ry="5" fill="#90caf9"/>
                            <ellipse cx="60" cy="50" rx="5" ry="5" fill="#90caf9"/>
                            <ellipse cx="80" cy="50" rx="5" ry="5" fill="#90caf9"/>
                        </g>
                        <defs>
                            <filter id="shadow" x="0" y="10" width="120" height="90" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1976d2" floodOpacity="0.15"/>
                            </filter>
                        </defs>
                    </svg>
                </div>
                <h1>Welcome to the VS Chat Zone</h1>
                <p>This is where you can find the protected chat zones with privacy features.</p>
                <div className="button-group">
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/register')}>Signup</button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;