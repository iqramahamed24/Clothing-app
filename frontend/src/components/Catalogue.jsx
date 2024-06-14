import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Row, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";

function Catalogue() {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/clothes/")
      .then((res) => {
        setClothes(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the clothes", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="collection-wrapper">
      <Row xs={1} md={2} lg={3} className="g-4">
        {loading
          ? Array.from({ length: 12 }).map((_, idx) => (
              <Col key={idx}>
                <Card style={{ width: "18rem" }}>
                  <Placeholder as={Card.Img} variant="top" />
                  <Card.Body>
                    <Placeholder as={Card.Title}>
                      <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text}>
                      <Placeholder xs={7} />
                      <Placeholder xs={4} />
                      <Placeholder xs={4} />
                      <Placeholder xs={6} />
                      <Placeholder xs={8} />
                    </Placeholder>
                    <Button variant="" disabled></Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : clothes.map((item) => (
              <Col key={item.id} className="d-flex align-items-stretch"> 
                <Card className=" custom-card">
                  <div className="img-wrapper">
                  <Card.Img variant="top" src={item.url} alt={item.name} />
                  </div>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text className="description-text">
                      {item.description}
                    </Card.Text>
                    <div className="bottom">
                      <p>Price: KSH {item.price}</p>
                      <Link to={`/product/${item.id}`}>
                        <Button className="view-btn">View Product</Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>
    </div>
  );
}

export default Catalogue;
