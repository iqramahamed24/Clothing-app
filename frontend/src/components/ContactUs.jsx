import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Footer from './Footer';

function ContactUs() {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    
    setFormData({ name: '', email: '', message: '' });
    setShowMessage(true);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="contact-us">
      <Container className="content-container flex-grow-1">
        <h1 className="text-center my-4">Contact Us</h1>
        <Row className="mb-4">
          <Col md={6}>
            <h2>About Our Abayas</h2>
            <p>
              Our abayas are crafted with high-quality materials and attention to detail. We offer a variety of styles
              that blend tradition with modern fashion, ensuring you look elegant and modest. Each piece is designed
              to prioritize style and comfort, perfect for any occasion.
            </p>
          </Col>
          <Col md={6}>
            <h2>Shipping Information</h2>
            <p>
              We provide worldwide shipping with reliable carriers to ensure your abayas arrive safely and on time.
              Shipping costs differ based on location and order size. For any shipping inquiries, please contact our
              team.
            </p>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <h2>Contact Details</h2>
            <p>Email: support@abayashop.com.</p>
            <p>Phone: +2547809654320.</p>
            <p>Office: The Abaya Store, Nairobi-Kenya. </p>
          </Col>
        </Row>
        <h2 className="text-center my-4">Sign Up</h2>
        <Form className="mb-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
            />
          </Form.Group>
          <Button className="contact-btn" type="submit">
            Submit
          </Button>
          {showMessage && (
            <p className="mt-3 text-center">Thank you for your message. We will get back to you soon!</p>
          )}
        </Form>
      </Container>
      <Footer />
    </div>
  );
}

export default ContactUs;
