import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { Card, Button, Alert, Form } from 'react-bootstrap';

function MyCart() {
    const [cartItems, setCartItems] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [displayMessage, setDisplayMessage] = useState(false);
    const [alertVariant, setAlertVariant] = useState('success');
    const [redirectToCheckout, setRedirectToCheckout] = useState(false)
   
    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const res = await axios.get('http://localhost:8000/cart/items');
            setCartItems(res.data);
            setAlertMessage('');
            setDisplayMessage(false);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setAlertVariant('danger');
            setAlertMessage('Error fetching cart items.');
            setDisplayMessage(true);
        }
    };

    const handleRemoveFromCart = async (id, size) => {
        try {
            const res = await axios.delete(`http://localhost:8000/cart/remove/${id}/${size}`);
            console.log("Item removed from cart:", res.data);
            fetchCartItems();
            setAlertVariant('success');
            setAlertMessage('Item removed from cart.');
            setDisplayMessage(true);
        } catch (error) {
            console.error("Error removing item from cart:", error);
            setAlertVariant('danger');
            setAlertMessage(`Error removing item from cart: ${error.response ? error.response.data.detail : 'Unknown error'}`);
            setDisplayMessage(true);
        }
    };

    const handleProceedToCheckout = () => {
        setRedirectToCheckout(true);
    };

 
    return (
        <div className='container-cart-page'>
            {redirectToCheckout && <Navigate to= "/checkout" />}
            <h2>My Cart</h2>
            {displayMessage && (
                <Alert
                    variant={alertVariant}
                    onClose={() => setDisplayMessage(false)}
                    dismissible
                >
                    {alertMessage}
                </Alert>
            )}
            {cartItems.length === 0 ? (
                <p>Your Cart Is Empty</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <Card key={`${item.id}-${item.size}`} className="mb-3" style={{ width: '18rem' }}>
                            <Card.Img variant='top' src={item.url} alt={item.name} className='img-class' />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                <Card.Text> Price: KSH{item.price}</Card.Text>
                                <Card.Text>Quantity: {item.quantity}</Card.Text>
                                <Button variant='danger' onClick={() => handleRemoveFromCart(item.id, item.size)}>Remove</Button>
                            </Card.Body>
                            <Link to="/catalogue">
                                <Button className="back">Back to catalogue</Button>
                            </Link>
                        </Card>
                    ))}
                    <Button variant='primary' onClick={handleProceedToCheckout}>Proceed to checkout</Button>
                </div>
            )}
       
        </div>
    );
}

export default MyCart;
