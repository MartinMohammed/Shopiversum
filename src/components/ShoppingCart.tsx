import { Offcanvas, Stack } from "react-bootstrap";

// IMPORT UTILITIES
import { formatCurrency } from "../util/formatCurrency";

// IMPORT CONTEXT
import { useShoppingCart } from "../context/ShoppingCartContext";

// IMPORT DATA
import storeItems from "../data/items.json";

// IMPORT COMPONENTS
import CartItem from "./CartItem";

type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart();

  const renderCartItems = cartItems.map((singleCartItem) => {
    return <CartItem key={singleCartItem.id} {...singleCartItem}></CartItem>;
  });

  const totalPrice = formatCurrency(
    // * About subsequent operation:
    /* 
      cartItems are items that are in the cart: So invidiual cartItem.qty > 0
      cartItem = {id: number, quantity: number}

      Search for that particular cartItem in the storeItems.json file (our improvised DB)
      It contains more information about the Item: price, title... 

      So End: cartItem.qty * storeItem.price + restTotalPrice
    */

    cartItems.reduce((totalPrice, currentItem) => {
      const item = storeItems.find(
        (singleStoreItem) => singleStoreItem.id === currentItem.id
      );
      //   if the item does not exist => it has no price tag
      return totalPrice + (item?.price || 0) * currentItem?.quantity;
    }, 0)
  );

  // OffCanvas is like a slide-in effect to see items
  return (
    //   {/* Position */}
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {renderCartItems}
          <div className="ms-auto fw-bold fs-5">Total: {totalPrice}</div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
