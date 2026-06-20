import { Button } from "react-bootstrap";

interface ItemCountProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  stock: number;
}

const ItemCount = ({
  quantity,
  setQuantity,
  stock,
}: ItemCountProps) => {
  const increase = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="d-flex align-items-center gap-2 my-3">
      <Button
        variant="outline-danger"
        onClick={decrease}
      >
        -
      </Button>

      <h5 className="m-0">{quantity}</h5>

      <Button
        variant="outline-success"
        onClick={increase}
      >
        +
      </Button>
    </div>
  );
};

export default ItemCount;