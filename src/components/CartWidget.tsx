import { FaShoppingCart } from "react-icons/fa";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartWidget = () => {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="text-dark text-decoration-none">
      <FaShoppingCart size={24} />

      {totalItems > 0 && (
        <Badge bg="danger" className="ms-1">
          {totalItems}
        </Badge>
      )}
    </Link>
  );
};

export default CartWidget;