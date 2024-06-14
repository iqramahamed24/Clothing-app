import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div className="bg-brown min-vh-100 d-flex align-items-center justify-content-center">
      <Container className="text-center position-relative">
        <div className="position-relative">
          <img src="/images/AbayaHomepage.jpg" alt="Homepage" className="img-fluid rounded shadow homepage-image" />
          <div className="homepage-text text-white text-shadow">
            <h1 className="display-4 fw-bold">Discover Modest Abayas & Fashion</h1>
            <p className="lead mb-4">
              Explore our latest collection featuring modest abayas and fashion-forward designs,
              crafted with high-quality materials and attention to detail. Elevate your wardrobe
              with pieces that offer both modesty and style, perfect for any occasion. Find your
              perfect outfit today and embrace the beauty of modest fashion!
            </p>
            <Button className="btn" href="/catalogue">
              View Collection
            </Button>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default HomePage;
