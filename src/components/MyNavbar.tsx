import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const MyNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Tienda Pokemon
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/category/fire">
              Fire Pokemons
            </Nav.Link>

            <Nav.Link as={Link} to="/category/water">
              Water Pokemons
            </Nav.Link>

            <Nav.Link as={Link} to="/category/plant">
              Plant Pokemons
            </Nav.Link>
          </Nav>

          <CartWidget />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;