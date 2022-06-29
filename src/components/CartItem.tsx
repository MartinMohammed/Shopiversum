import { Stack } from "react-bootstrap";
import { Button } from "react-bootstrap";

// IMPORT UTILITIES
import { formatCurrency } from "../util/formatCurrency";

// IMPORT CONTEXT
import { useShoppingCart } from "../context/ShoppingCartContext";

// IMPORT DATA
import storeItems from "../data/items.json";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();
  const storeItem = storeItems.find(
    (singleStoreItem) => singleStoreItem.id === id
  );
  if (storeItem == null) return null; /* Item does not exist - render nothing */

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={storeItem.imgUrl}
        alt={storeItem.name}
        style={{
          width: "125px",
          height: "75px",
          objectFit: "cover",
          borderRadius: "5px",
        }}
      ></img>
      <div className="me-auto">
        <div>
          {storeItem.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(storeItem.price)}
        </div>
      </div>
      <div>{formatCurrency(storeItem.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => {
          removeFromCart(id);
        }}
      >
        &times; {/* Give us a special button - x */}
      </Button>
    </Stack>
  );
};

export default CartItem;
