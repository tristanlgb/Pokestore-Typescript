import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../types/Product";

interface ItemListProps {
  products: Product[];
}

const ItemList = ({ products }: ItemListProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <Row>
      {products.map((product) => (
        <Col md={4} key={product.id} className="mb-4">
          <Card className="h-100 shadow-sm">

            <Card.Img
              variant="top"
              src={product.image}
              alt={product.description}
              style={{
                height: "250px",
                objectFit: "contain",
                padding: "1rem",
              }}
            />

            <Card.Body className="d-flex flex-column">

              <Card.Title>
                {product.description}
              </Card.Title>

              <Card.Text>
                Categoría: {product.category}
              </Card.Text>

              <Card.Text>
                Precio: ${product.price}
              </Card.Text>

              <Card.Text>
                Stock: {product.quantity}
              </Card.Text>

              <div className="mt-auto">

                <Button
                  as={Link}
                  to={`/product/${product.id}`}
                  variant="primary"
                  className="me-2"
                >
                  Ver Detalles
                </Button>

                <Button
                  variant="success"
                  onClick={() => handleAddToCart(product)}
                >
                  Agregar
                </Button>

              </div>

            </Card.Body>

          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ItemList;