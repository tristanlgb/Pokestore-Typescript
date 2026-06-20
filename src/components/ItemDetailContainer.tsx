import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import ItemCount from "./ItemCount";

const ItemDetailContainer = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const getProduct = async () => {
      if (!id) return;

      const productRef = doc(db, "pokemons", id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        setProduct({
          id: productSnap.id,
          ...productSnap.data(),
        } as Product);
      }

      setLoading(false);
    };

    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, quantity);
    setAddedToCart(true);
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Loading...</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="mt-5">
        <h2>Producto no encontrado</h2>
        <Button as={Link} to="/">
          Volver al Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.description}
          style={{
            maxHeight: "350px",
            objectFit: "contain",
          }}
        />

        <Card.Body>
          <Card.Title>{product.description}</Card.Title>

          <Card.Text>
            Categoría: {product.category}
          </Card.Text>

          <Card.Text>
            Precio: ${product.price}
          </Card.Text>

          <Card.Text>
            Stock disponible: {product.quantity}
          </Card.Text>

          {product.quantity <= 0 ? (
            <p className="text-danger">Producto sin stock</p>
          ) : addedToCart ? (
            <div>
              <p className="text-success">
                Producto agregado al carrito.
              </p>

              <Button
                as={Link}
                to="/cart"
                variant="success"
                className="me-2"
              >
                Ir al carrito
              </Button>

              <Button as={Link} to="/" variant="secondary">
                Volver al Home
              </Button>
            </div>
          ) : (
            <>
              <ItemCount
                quantity={quantity}
                setQuantity={setQuantity}
                stock={product.quantity}
              />

              <Button
                variant="primary"
                onClick={handleAddToCart}
              >
                Agregar al carrito
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ItemDetailContainer;