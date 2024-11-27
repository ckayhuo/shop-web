import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

    const quantity = getItemQuantity(id);
//   const quantity = 1;

  return (
    // 100% height
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="500px"
        style={{
          maxWidth: "250px",
          maxHeight: "300px",
          objectFit: "contain",
          backgroundColor: "white",
          display: "block",
          margin: "auto",
        }}
      />
      {/* For showing name and price, and adding items into cart */}
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          {/* Give some margin to avoid overlapping texts */}
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {/* "Add to cart button" or Add/Remove items */}
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            // Two rows when adding/removing items
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              {/* row of add/remove buttons */}
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                <div>
                  {/* Use span to format the quantity output size */}
                  <span className="fs-2">{quantity}</span>
                </div>
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
