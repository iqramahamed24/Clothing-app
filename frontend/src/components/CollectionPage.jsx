import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useParams , Link} from "react-router-dom";


function CollectionPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetch data with id:", id);
    if (id) {
      axios
        .get(`http://localhost:8000/clothes/${id}`)
        .then((res) => {
          console.log("product data:", res.data);
          setProduct(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error while fetching the clothes", error);
          setLoading(false);
        });
    }
  }, [id]);

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
            <div className="button">
              <Link to={`/add-to-cart/${product.id}`} >
                <Button className="cart">Add to cart</Button>
              </Link>
              <Link to="/catalogue">
                <Button className="back">Back to catalogue</Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default CollectionPage;
