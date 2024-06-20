import React, { useState } from 'react';
import { Modal, Button, Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout({ onClose, onAddToCart }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');
    const [showAlert, setShowAlert] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showModal, setShowModal] = useState(true);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/users/login', {
                email,
                password,
            });
            console.log("User logged in successfully:", res.data);

            const userId = res.data.id;

            const cartItem = {
                clothes_id: 1,
                name: "Linen Abaya",
                description: "Example description",
                url: "https://i.ibb.co/JqPwYSt/Linen.jpg",
                price: 3000,
                quantity: 1,
                size: "Medium",
            };

        
            onAddToCart(userId, cartItem);

            setAlertVariant('success');
            setAlertMessage('Thank you, your order has been processed and you are logged in.');
            setShowAlert(true);
            setTimeout(() => {
                setShowModal(false);
                navigate('/catalogue');
            }, 2000);
        } catch (error) {
            console.error("Error logging in:", error);
            if (error.response) {
                setAlertVariant('danger');
                setAlertMessage(`Error logging in: ${error.response.data.detail}`);
            } else {
                setAlertVariant('danger');
                setAlertMessage('Error: Network error or server is unreachable.');
            }
            setShowAlert(true);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/users/register', {
                name: signupName,
                email: signupEmail,
                password: signupPassword,
            });
            console.log("User registered successfully:", res.data);
            setAlertVariant('success');
            setAlertMessage('Thank you for signing up, your order has been processed.');
            setShowAlert(true);
            setShowSignUpModal(false);
            setTimeout(() => {
                setShowModal(false);
                navigate('/catalogue');
            }, 2000);
        } catch (error) {
            console.error("Error signing up:", error);
            if (error.response) {
                setAlertVariant('danger');
                setAlertMessage(`Email already registered: ${error.response.data.detail}`);
            } else {
                setAlertVariant('danger');
                setAlertMessage('Error: Network error or server is unreachable.');
            }
            setShowAlert(true);
        }
    };

    const handleCloseAlert = () => setShowAlert(false);

    const toggleSignUpModal = () => {
        setShowSignUpModal(!showSignUpModal);
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Body>
                {showAlert && (
                    <Alert variant={alertVariant} onClose={handleCloseAlert} dismissible>
                        {alertMessage}
                    </Alert>
                )}
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                <div className="mt-3 text-center">
                    <Button variant="link" onClick={toggleSignUpModal}>Sign Up</Button>
                </div>
                <Modal show={showSignUpModal} onHide={toggleSignUpModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSignUp}>
                            <Form.Group controlId="signupName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    value={signupName}
                                    onChange={(e) => setSignupName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="signupEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="signupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Modal.Body>
        </Modal>
    );
}

export default Checkout;
