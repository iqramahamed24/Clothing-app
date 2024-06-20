import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AddToCart({ product, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    const cartItem = {
      clothes_id: product.id,
      name: product.name,
      description: product.description,
      url: product.url,
      price: product.price,
      quantity: 1,
      size: selectedSize,
    };
    
    onAddToCart(product.id, selectedSize, 1);
    setAddedToCart(true);
  };

  return (
    <Card style={{ width: '100%', maxWidth: '600px' }}>
      <Card.Img variant="top" src={product.url} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Form.Group>
          <Form.Label>Select Size:</Form.Label>
          <Form.Select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </Form.Select>
        </Form.Group>
        {!addedToCart ? (
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        ) : (
          <Button disabled>Added to Cart</Button>
        )}
        <Link to="/catalogue">
          <Button className="ml-2">Back to Catalogue</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default AddToCart;
