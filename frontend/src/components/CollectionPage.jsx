import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Alert, Form } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";

function CollectionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/clothes/${id}`)
        .then((res) => {
          console.log("product data:", res.data);
          setProduct(res.data);
          setLoading(false);
          setInCart(false);
        })
        .catch((error) => {
          console.error("Error while fetching the clothes", error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!size || quantity <= 0) {
        setAlertMessage("Please select size and enter a valid quantity.");
        setDisplayMessage(true);
        return;
    }
    
    const cartItem = {
        id: product.id,
        name: product.name,
        description: product.description,
        url: product.url,
        price: product.price,
        quantity: quantity,
        size: size,
    };
    
    axios.post(`http://localhost:8000/cart/add/${id}`, cartItem)
        .then((res) => {
            console.log("Item added to cart:", res.data);
            setInCart(true);
            setAlertMessage("Item added to cart");
            setDisplayMessage(true);
            
            navigate("/cart")


        })
        .catch((error) => {
            console.log("Error adding to cart:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
            setAlertMessage("Failed to add item to cart.");
            setDisplayMessage(true);
        });
};

 const handleSizeChange = (e) => {
  setSize(e.target.value);
 };
 const handleQuantityChange = (e)=> {
  setQuantity(parseInt(e.target.value, 10));
 };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!product) {
    return <div>Product not found</div>;
  }
 

  return (
    <div className="product-container">
      <div className="product-page">
        <Card style={{ width: "100%", maxWidth: "600PX" }}>
          <Card.Img className="image" src={product.url} alt={product.name} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>Price: KSH {product.price}</Card.Text>
            <Form.Group>
              <Form.Label>Select Size:</Form.Label>
              <Form.Select value={size} onChange={handleSizeChange}>
                <option value="">Select Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min={1}
                max={5}
              />
            </Form.Group>
            <Button
              className={`btn-brown ${
                inCart ? "remove-from-cart" : "add-to-cart"
              }`}
              onClick={handleAddToCart}
            >
              {inCart ? "Remove from cart" : "Add to cart"}
            </Button>
            {displayMessage && (
              <Alert
                variant="success"
                onClose={() => setDisplayMessage(false)}
                dismissible
              >
                {alertMessage}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default CollectionPage;
