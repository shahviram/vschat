import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; 
import { api } from '../../Service/ApiCalls';
import { setUserCookies } from '../../utils/cookieUtils';

function Login() {
    const [formData, setFormData] = useState({
        emailId: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
        
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    // form validation
    const validateForm = () => {
        const newErrors = {};
        if (!formData.emailId.trim()) {
            newErrors.emailId = 'Email is required.';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required.';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmissionMessage(null); 

        if (validateForm()) {
            setLoading(true); 
            try {
                const response = await api.authenticate(formData);
                // Store user details in cookies
                if (response && response.data) {
                    setUserCookies({
                        id: response.data.id,
                        userID: response.data.userID,
                        firstname: response.data.firstName,
                        lastname: response.data.lastName,
                        emailId: response.data.emailId
                    });
                    setSubmissionMessage({ 
                        type: 'success', 
                        text: 'Login successful! Redirecting...' 
                    });
                    setTimeout(() => navigate('/chat'), 1000);
                } else {
                    throw new Error('Invalid response format from server');
                }
            } catch (error) {
                console.error('Login error:', error);
                setSubmissionMessage({ type: 'danger', text: error.message || 'Login failed. Please check your credentials.' });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="container-fluid login-container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-11 col-sm-8 col-md-6 col-lg-4">
                    <div className="card shadow-lg">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold">Welcome Back!</h2>
                                <p className="text-muted">Please login to your account</p>
                            </div>
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="emailInput" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
                                        id="emailInput"
                                        name="emailId"
                                        placeholder="Enter your email"
                                        value={formData.emailId}
                                        onChange={handleChange}
                                        required
                                        onBlur={validateForm}
                                    />
                                    {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="passwordInput" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        id="passwordInput"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        onBlur={validateForm}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mb-3 btn-lg"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>

                                {submissionMessage && (
                                    <div className={`alert alert-${submissionMessage.type} mt-3 text-center`} role="alert">
                                        {submissionMessage.text}
                                    </div>
                                )}

                                <div className="text-center">
                                    <small className="text-muted">
                                        Don't have an account?
                                        <button
                                            type="button"
                                            onClick={() => navigate('/register')}
                                            className="btn btn-link p-0 ms-1"
                                            disabled={loading}
                                        >
                                            Sign up
                                        </button>
                                    </small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container-fluid login-container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-11 col-sm-8 col-md-6 col-lg-4">
                    <div className="card shadow-lg">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold">Welcome Back!</h2>
                                <p className="text-muted">Please login to your account</p>
                            </div>
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="usernameInput" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        id="usernameInput"
                                        name="username"
                                        placeholder="Enter your username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        onBlur={validateForm}
                                    />
                                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="passwordInput" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        id="passwordInput"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        onBlur={validateForm}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mb-3 btn-lg"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>

                                {submissionMessage && (
                                    <div className={`alert alert-${submissionMessage.type} mt-3 text-center`} role="alert">
                                        {submissionMessage.text}
                                    </div>
                                )}

                                <div className="text-center">
                                    <small className="text-muted">
                                        Don't have an account?
                                        <button
                                            type="button"
                                            onClick={() => navigate('/register')}
                                            className="btn btn-link p-0 ms-1"
                                            disabled={loading}
                                        >
                                            Sign up
                                        </button>
                                    </small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './login.css';

// function Login() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         // Basic validation (you should enhance this)
//         if (username === 'user' && password === 'password') {
//             // Simulate successful login
//             alert('Login successful!');
//             navigate('/chat'); // Redirect to chat page
//         } else {
//             alert('Login failed. Please check your credentials.');
//         }
//     };

//     return (
//         <Container fluid className="login-container">
//             <Row className="justify-content-center align-items-center min-vh-100">
//                 <Col xs={11} sm={8} md={6} lg={4}>
//                     <Card className="shadow-lg">
//                         <Card.Body className="p-5">
//                             <div className="text-center mb-4">
//                                 <h2 className="fw-bold">Welcome Back!</h2>
//                                 <p className="text-muted">Please login to your account</p>
//                             </div>
//                             <Form onSubmit={handleSubmit}>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Username</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Enter your username"
//                                         value={username}
//                                         onChange={(e) => setUsername(e.target.value)}
//                                         required
//                                     />
//                                 </Form.Group>
//                                 <Form.Group className="mb-4">
//                                     <Form.Label>Password</Form.Label>
//                                     <Form.Control
//                                         type="password"
//                                         placeholder="Enter your password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                     />
//                                 </Form.Group>
//                                 <Button 
//                                     variant="primary" 
//                                     type="submit" 
//                                     className="w-100 mb-3"
//                                     size="lg"
//                                 >
//                                     Login
//                                 </Button>
//                                 <div className="text-center">
//                                     <small className="text-muted">
//                                         Don't have an account? 
//                                         <Button 
//                                             variant="link" 
//                                             onClick={() => navigate('/register')}
//                                             className="p-0 ms-1"
//                                         >
//                                             Sign up
//                                         </Button>
//                                     </small>
//                                 </div>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default Login;