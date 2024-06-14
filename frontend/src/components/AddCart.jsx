import React, { useState, Link } from 'react'
import {Alert, Button, Form} from 'react-bootstrap'

function AddCart() {
  const [size, setSize] = useState('');
  const [quantity, serQuantity] = useState(1);
  const [displayMessage, setDisplayMessage] = useState(false);

  const handleaddToCart = () => {
    console.log(`Adding to cart: Size - ${size}, Quantity - ${quantity}`);
    setDisplayMessage(true);
  };

  return (
    <div className='add-cart' >
      {setDisplayMessage && (
        <Alert variant='success' onClose={() => setDisplayMessage(false)} dismissible>
          Order has been added to cart successfully!
        </Alert>
      )}
     <Form.Select className='form' value={size} onChange={(e) =>setSize(e.target.value)}>
      <option>Select Size</option>
      <option value="1">Small</option>
      <option value="2">Medium</option>
      <option value="3">Large</option>
     </Form.Select>
     <Form.Group className='for,'>
      <Form.Label>Quantity</Form.Label>
      <Form.Control 
      type='number'
      value={quantity}
      onChange={(e) => serQuantity(e.target.valueAsNumber)}
      min={1}
      max={5}
      />
     </Form.Group>
     <Button className='cart-button' onClick={handleaddToCart}>
      Add to cart
     </Button>
     <Link to='./catalogue'>
      <Button className='cart-button'>Go back to Catalogue</Button>
     </Link>
    </div>
  )
}

export default AddCart;