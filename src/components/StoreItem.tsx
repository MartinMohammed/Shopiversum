import React from "react";
import { Button, Card } from "react-bootstrap";
import { FiPlusSquare } from "react-icons/fi";

// IMPORT UTILITIES
import { formatCurrency } from "../util/formatCurrency";

// IMPORT CONTEXT
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  // consume the context values / functions
  const contextObject = useShoppingCart();
  const {
    getItemQuantity,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    removeFromCart,
  } = useShoppingCart();

  // if quantity === 0: Item is not in the cart - "Add to Cart" Button
  // else (+ | -) quantity of item in the cart

  const quantity = getItemQuantity(id);

  return (
    // DOT NOTATION
    <Card className="h-100">
      {/* full height */}
      {/* // Basically Card.<more concrete - sub category>
    // There are also other types such as Card.Title */}
      <Card.Img variant="top" src={`${imgUrl}`} height="200px"></Card.Img>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          {/* font - size */}
          <span className="fs-2">{name}</span>
          {/* text-muted => less attention => more gray shade */}
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>

        {/* fill all the available possible space inside the flex container that is possible */}
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              className="w-100"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                increaseCartItemQuantity(id)
              }
            >
              <FiPlusSquare style={{ transform: "translateY(-2px)" }} /> Add To
              Cart
            </Button>
          ) : (
            <div /* vertical } flex-column */
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div /* horizontal */
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    decreaseCartItemQuantity(id)
                  }
                >
                  -
                </Button>

                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    increaseCartItemQuantity(id)
                  }
                >
                  +
                </Button>
              </div>
              <Button
                variant="danger"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  removeFromCart(id)
                }
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
