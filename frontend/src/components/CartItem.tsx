import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { FaTrash } from "react-icons/fa";
import { FetchItems } from "../services/FetchItems";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
  const storeItems = FetchItems();

  const item = storeItems.find((i) => i.id === id);

  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "100px", height: "100px", objectFit: "contain" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>
        <div> {formatCurrency(item.price * quantity)}</div>
        <div>
          {" "}
          <Button
            // variant="outline-primary"
            size="sm"
            onClick={() => decreaseCartQuantity(id)}
          >
            {quantity === 1 ? <FaTrash /> : "-"}
          </Button>
          <span style={{ fontWeight: "bold" }}> {quantity} </span>
          <Button
            // variant="outline-primary"
            size="sm"
            onClick={() => increaseCartQuantity(id)}
          >
            +
          </Button>
        </div>
      </div>

      {/* <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button> */}
    </Stack>
  );
}
