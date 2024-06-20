import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { Navbar, Nav, Container } from "react-bootstrap";
import HomePage from "./components/HomePage";
import Catalogue from "./components/Catalogue";
import ContactUs from "./components/ContactUs";
import CollectionPage from "./components/CollectionPage";
import AddToCart from "./components/AddToCart";
import MyCart from "./components/MyCart";
import Checkout from "./components/Checkout";


function App() {
  const [cartItems, setCartItems] = useState([]);

  const userId = 1;

  const onAddToCart = async (cartItem) => {
    try {
      const res = await axios.post(`http://localhost:8000/cart/add/${userId}`, cartItem);
      console.log("Item added to cart:", res.data);
      setCartItems([...cartItems, cartItem]);
    } catch (error) {
      console.log("Error adding item to cart:", error);
    }
  };
  return (
  
    <div className="App">
      <Navbar className="custom-navbar" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Abaya Store
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/catalogue">
                Collection
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact Us
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                My Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/product/:id" element={<CollectionPage />} />
        <Route path="/add-to-cart/:id" element={<AddToCart onAddToCart={onAddToCart} />} />
        <Route path="/cart" element={<MyCart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
