import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css';
import countries from '../Countries/Countries';
import { api } from '../../Service/ApiCalls';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        country: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState(null); // { type: 'success' | 'danger', text: '' }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
        // Clear error for the current field as user types
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Valid email is required.';
        }
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required.';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required.';
        }
        if (!formData.country) {
            newErrors.country = 'Please select a country.';
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
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
                const response = await api.register({
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    country: formData.country,
                    password: formData.password
                });

                setSubmissionMessage({ 
                    type: 'success', 
                    text: 'Registration successful! Redirecting to login...' 
                });
                setTimeout(() => navigate('/login'), 1500);
            } catch (error) {
                console.error('Registration error details:', {
                    message: error.message,
                    response: error.response,
                    status: error.response?.status,
                    headers: error.response?.headers,
                });
                setSubmissionMessage({ 
                    type: 'danger', 
                    text: error.message || 'Registration failed. Please try again.' 
                });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleReset = () => {
        setFormData({
            email: '',
            firstName: '',
            lastName: '',
            country: '',
            password: '',
            confirmPassword: ''
        });
        setErrors({});
        setSubmissionMessage(null); // Clear messages on reset
    };

    return (
        <div className="container-fluid register-container">
            <div className="row justify-content-center">
                <div className="col-11 col-sm-10 col-md-8 col-lg-6">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Create Account</h2>
                            <form onSubmit={handleSubmit} noValidate> {/* Added noValidate to prevent browser default validation */}
                                <div className="mb-3">
                                    <label htmlFor="emailInput" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="emailInput"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        onBlur={validateForm} // Optional: Validate on blur
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="firstNameInput" className="form-label">First Name</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                                id="firstNameInput"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                                onBlur={validateForm}
                                            />
                                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="lastNameInput" className="form-label">Last Name</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                                id="lastNameInput"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                                onBlur={validateForm}
                                            />
                                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="countrySelect" className="form-label">Country</label>
                                    <select
                                        className={`form-select ${errors.country ? 'is-invalid' : ''}`}
                                        id="countrySelect"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                        onBlur={validateForm}
                                    >
                                        <option value="">Select a country</option>
                                        {countries.map((country) => (
                                            <option key={country} value={country}>
                                                {country}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="passwordInput" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        id="passwordInput"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        onBlur={validateForm}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="confirmPasswordInput" className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                        id="confirmPasswordInput"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        onBlur={validateForm}
                                    />
                                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                                </div>

                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                        {loading ? 'Registering...' : 'Register'}
                                    </button>
                                    <button type="button" onClick={handleReset} className="btn btn-secondary btn-lg" disabled={loading}>
                                        Reset
                                    </button>
                                </div>

                                {submissionMessage && (
                                    <div className={`alert alert-${submissionMessage.type} mt-3 text-center`} role="alert">
                                        {submissionMessage.text}
                                    </div>
                                )}

                                <div className="text-center mt-3">
                                    <small className="text-muted">
                                        Already have an account? {' '}
                                        <button type="button" className="btn btn-link p-0" onClick={() => navigate('/login')}>
                                            Login here
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

export default Register;



// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './register.css';

// function Register() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         email: '',
//         firstName: '',
//         lastName: '',
//         country: '',
//         password: '',
//         confirmPassword: ''
//     });
//     const [errors, setErrors] = useState({});

//     // List of countries (excluding Pakistan)
//     const countries = [
//         "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", 
//         "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", 
//         "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
//         "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", 
//         "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
//         "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", 
//         "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", 
//         "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", 
//         "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", 
//         "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", 
//         "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", 
//         "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", 
//         "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", 
//         "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Palau", 
//         "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", 
//         "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", 
//         "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", 
//         "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", 
//         "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", 
//         "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", 
//         "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", 
//         "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
//     ];

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = 'Valid email is required';
//         }
//         if (!formData.firstName.trim()) {
//             newErrors.firstName = 'First name is required';
//         }
//         if (!formData.lastName.trim()) {
//             newErrors.lastName = 'Last name is required';
//         }
//         if (!formData.country) {
//             newErrors.country = 'Please select a country';
//         }
//         if (!formData.password || formData.password.length < 6) {
//             newErrors.password = 'Password must be at least 6 characters';
//         }
//         if (formData.password !== formData.confirmPassword) {
//             newErrors.confirmPassword = 'Passwords do not match';
//         }
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
        
//         if (validateForm()) {
//             try {
//                 const response = await fetch('/registerUser', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(formData),
//                 });

//                 if (response.ok) {
//                     alert('Registration successful!');
//                     navigate('/login');
//                 } else {
//                     const data = await response.json();
//                     alert(data.message || 'Registration failed');
//                 }
//             } catch (error) {
//                 alert('Registration failed: ' + error.message);
//             }
//         }
//     };

//     const handleReset = () => {
//         setFormData({
//             email: '',
//             firstName: '',
//             lastName: '',
//             country: '',
//             password: '',
//             confirmPassword: ''
//         });
//         setErrors({});
//     };

//     return (
//         <Container fluid className="register-container">
//             <Row className="justify-content-center">
//                 <Col xs={11} sm={10} md={8} lg={6}>
//                     <Card className="shadow-lg">
//                         <Card.Body>
//                             <h2 className="text-center mb-4">Create Account</h2>
//                             <Form onSubmit={handleSubmit}>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Email address</Form.Label>
//                                     <Form.Control
//                                         type="email"
//                                         value={formData.email}
//                                         onChange={(e) => setFormData({...formData, email: e.target.value})}
//                                         isInvalid={!!errors.email}
//                                         required
//                                     />
//                                     <Form.Control.Feedback type="invalid">
//                                         {errors.email}
//                                     </Form.Control.Feedback>
//                                 </Form.Group>

//                                 <Row>
//                                     <Col md={6}>
//                                         <Form.Group className="mb-3">
//                                             <Form.Label>First Name</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 value={formData.firstName}
//                                                 onChange={(e) => setFormData({...formData, firstName: e.target.value})}
//                                                 isInvalid={!!errors.firstName}
//                                                 required
//                                             />
//                                             <Form.Control.Feedback type="invalid">
//                                                 {errors.firstName}
//                                             </Form.Control.Feedback>
//                                         </Form.Group>
//                                     </Col>
//                                     <Col md={6}>
//                                         <Form.Group className="mb-3">
//                                             <Form.Label>Last Name</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 value={formData.lastName}
//                                                 onChange={(e) => setFormData({...formData, lastName: e.target.value})}
//                                                 isInvalid={!!errors.lastName}
//                                                 required
//                                             />
//                                             <Form.Control.Feedback type="invalid">
//                                                 {errors.lastName}
//                                             </Form.Control.Feedback>
//                                         </Form.Group>
//                                     </Col>
//                                 </Row>

//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Country</Form.Label>
//                                     <Form.Select
//                                         value={formData.country}
//                                         onChange={(e) => setFormData({...formData, country: e.target.value})}
//                                         isInvalid={!!errors.country}
//                                         required
//                                     >
//                                         <option value="">Select a country</option>
//                                         {countries.map((country) => (
//                                             <option key={country} value={country}>
//                                                 {country}
//                                             </option>
//                                         ))}
//                                     </Form.Select>
//                                     <Form.Control.Feedback type="invalid">
//                                         {errors.country}
//                                     </Form.Control.Feedback>
//                                 </Form.Group>

//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Password</Form.Label>
//                                     <Form.Control
//                                         type="password"
//                                         value={formData.password}
//                                         onChange={(e) => setFormData({...formData, password: e.target.value})}
//                                         isInvalid={!!errors.password}
//                                         required
//                                     />
//                                     <Form.Control.Feedback type="invalid">
//                                         {errors.password}
//                                     </Form.Control.Feedback>
//                                 </Form.Group>

//                                 <Form.Group className="mb-4">
//                                     <Form.Label>Confirm Password</Form.Label>
//                                     <Form.Control
//                                         type="password"
//                                         value={formData.confirmPassword}
//                                         onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
//                                         isInvalid={!!errors.confirmPassword}
//                                         required
//                                     />
//                                     <Form.Control.Feedback type="invalid">
//                                         {errors.confirmPassword}
//                                     </Form.Control.Feedback>
//                                 </Form.Group>

//                                 <div className="d-grid gap-2">
//                                     <Button variant="primary" type="submit" size="lg">
//                                         Register
//                                     </Button>
//                                     <Button variant="secondary" type="button" onClick={handleReset} size="lg">
//                                         Reset
//                                     </Button>
//                                 </div>

//                                 <div className="text-center mt-3">
//                                     <small className="text-muted">
//                                         Already have an account? {' '}
//                                         <Button variant="link" className="p-0" onClick={() => navigate('/login')}>
//                                             Login here
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

// export default Register;
