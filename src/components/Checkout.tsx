import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();

  const [buyer, setBuyer] = useState({
    name: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
  });

  const [orderId, setOrderId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const order = {
      buyer,
      items: cartItems.map((item) => ({
        id: item.id,
        description: item.description,
        price: item.price,
        quantity: item.cartQuantity,
      })),
      total: totalPrice,
      date: serverTimestamp(),
    };

    const ordersRef = collection(db, "orders");
    const docRef = await addDoc(ordersRef, order);

    setOrderId(docRef.id);
    clearCart();
  };

  if (orderId) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="success">
          Compra generada correctamente.
          <br />
          Tu ID de orden es:
          <strong> {orderId}</strong>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Checkout</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={buyer.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={buyer.lastname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={buyer.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={buyer.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={buyer.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <h4>Total: ${totalPrice}</h4>

        <Button type="submit" variant="success">
          Confirmar compra
        </Button>
      </Form>
    </Container>
  );
};

export default Checkout;