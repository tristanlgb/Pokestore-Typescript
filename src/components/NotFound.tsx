import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container className="mt-5 text-center">
      <h1>404</h1>
      <h2>Página no encontrada</h2>

      <Button as={Link} to="/" variant="primary">
        Volver al Home
      </Button>
    </Container>
  );
};

export default NotFound;