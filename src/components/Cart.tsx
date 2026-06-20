import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <h2>Tu carrito está vacío</h2>

        <Button as={Link} to="/" variant="primary">
          Volver a comprar
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Carrito</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Imagen</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Eliminar</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.description}</td>

              <td>
                <img
                  src={item.image}
                  alt={item.description}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "contain",
                  }}
                />
              </td>

              <td>${item.price}</td>

              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => updateQuantity(item.id, -1)}
                  disabled={item.cartQuantity <= 1}
                >
                  -
                </Button>

                <span className="mx-3">{item.cartQuantity}</span>

                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => updateQuantity(item.id, 1)}
                  disabled={item.cartQuantity >= item.quantity}
                >
                  +
                </Button>
              </td>

              <td>${item.price * item.cartQuantity}</td>

              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Total: ${totalPrice}</h3>

      <Button
        variant="danger"
        onClick={clearCart}
        className="me-2"
      >
        Vaciar carrito
      </Button>

      <Button
        as={Link}
        to="/checkout"
        variant="success"
      >
        Checkout
      </Button>
    </Container>
  );
};

export default Cart;