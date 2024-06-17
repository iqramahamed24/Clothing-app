import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Button } from 'react-bootstrap'

function MyCart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        FetchCartItems();
    }, []);


    const FetchCartItems = () => { 
        axios.get('http://localhost:8000/cart/items')
        .then((res) => {
            setCartItems(res.data);
    })
        .catch((error) => {
        console.log("Error fetching cart items:" , error);
    });
};

    const handleRemoveFromCart= (id) => {
        axios.delete(`http://localhost:8000/cart/remove/${id}`)
        .then((res) => {
            console.log("Item removed from cart", error)
            FetchCartItems();
        })
        .catch((error) => {
            console.log("Error removing item from cart", error)
        });
    };
  return (
    <div className='container-cart-page'>
        <h2>My Cart</h2>
        {cartItems.length === 0 ? (
            <p>Your Cart Is Empty</p>
        ): (
            <div> 
                {cartItems.map(item => (
                    <Card key={item.id} className="mb-3">
                        <Card style={{width: '18rem'}}/>
                        <Card.Img variant='top' src={item.url} alt={item.name} className='img-class'/>
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                            <Card.Text> Price: KSH{item.price}</Card.Text>
                            <Card.Text>Quantity: {item.quantity}</Card.Text>
                            <Button variant='danger' onClick={() => handleRemoveFromCart (item.id)}>Remove</Button>
                        </Card.Body>
                    </Card>
                ))}
                <Button variant='primary'>Proceed to checkout</Button>
            </div>
        )}
    </div>
  )
}

export default MyCart