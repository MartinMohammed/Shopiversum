import { createContext, ReactNode, useContext, useState } from "react";

// IMPORT COMPONENTS
import ShoppingCart from "../components/ShoppingCart";

// IMPORT CUSTOM HOOKS
import { useLocalStorage } from "../hooks/useLocalStorage";

// IMPORT MODEL
import { CartItem } from "../models";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;

  // * About subsequent functions:
  /*
  Functions that allow descadant (nested) components
  to update the application state (e.g. add cartItem to cartItems),
  or get information about it (e.g. getItemQuantity)
  */

  getItemQuantity: (id: number) => number;
  increaseCartItemQuantity: (id: number) => void; // + If adding new Item to cart
  decreaseCartItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;

  cartTotalQuantity: number;
  cartItems: Array<CartItem>; // For populating our cart
};

// # Context Object & Type Casting
const ShoppingCartContext = createContext({} as ShoppingCartContext);

// ! "custom hook" FOR CONSUMING THE VALUE (context) FROM NEAREST PARENT PROVIDER
export function useShoppingCart() {
  return useContext(ShoppingCartContext); // consume from that particular created Context Object
}

// ! --------- A WRAPPER AROUND THE CONTEXT THAT HAS THE CHILDREN ------------------
// All descadants of the Provider component are able to consume / subscribe to context changes
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  // * Before:
  /* 
    const [cartItems, setCartItems] = useState<Array<CartItem>>([] as CartItem)
  */

  // -------------- STATE --------------
  // ! Provider Component Manages it's own State / data: (key, initial_value)
  const [cartItems, setCartItems] = useLocalStorage<Array<CartItem>>(
    "shopping-cart",
    []
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // -------------- STATE DONE --------------

  // * About .reduce()
  /* 
  ((total, currentValue, currentIndex, arr) => any, initialValue)
  Iterates through a given iterable and sum for every
  iteration the total with the currentValue: number
  */
  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  function getItemQuantity(id: number): number {
    const cartItem = cartItems.find(
      (singleCartItem) => singleCartItem.id === id
    );
    return cartItem ? cartItem?.quantity : 0;
  }

  //  ! --------- CART ----------
  function openCart(): void {
    setIsOpen(true);
  }

  function closeCart(): void {
    setIsOpen(false);
  }

  // !  --------- CART ITEM ----------
  function increaseCartItemQuantity(id: number): void {
    // * Add functionality: Add new Item to cart
    setCartItems((prevCartItems) => {
      // ! if we did not found an item: x == null : checks implicitly for undefined (but not booleanic values!!!)
      const cartItem = prevCartItems.find(
        (singlePrevCartItem) => singlePrevCartItem.id === id
      );
      if (cartItem == null) {
        return [...prevCartItems, { id: id, quantity: 1 }];
      } else {
        // found previous cart item - so it is already in the cart
        return prevCartItems.map((singlePrevCartItem) =>
          singlePrevCartItem.id === id
            ? {
                ...singlePrevCartItem,
                quantity: singlePrevCartItem.quantity + 1,
              }
            : singlePrevCartItem
        );
      }
    });
  }
  function decreaseCartItemQuantity(id: number): void {
    setCartItems((prevCartItems) => {
      const cartItem = prevCartItems.find(
        (singlePrevCartItem) => singlePrevCartItem.id === id
      );

      if (cartItem?.quantity === 1) {
        // remove it from cart because it's qty is 1
        return prevCartItems.filter(
          (prevSingleCartItem) => prevSingleCartItem.id != id
        );
      } else {
        // just decrease it's qty (-1)
        return prevCartItems.map((prevSingleCartItem) =>
          prevSingleCartItem.id === id
            ? {
                ...prevSingleCartItem,
                quantity: prevSingleCartItem.quantity - 1,
              }
            : prevSingleCartItem
        );
      }
    });
  }
  function removeFromCart(id: number): void {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((singlePrevCartItem) => singlePrevCartItem.id !== id)
    );
  }

  const ShoppingCartContextValue: ShoppingCartContext = {
    getItemQuantity,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    removeFromCart,
    cartItems,
    cartTotalQuantity: cartQuantity,
    openCart,
    closeCart,
  };

  return (
    // value is everything the consumer can access
    <ShoppingCartContext.Provider value={ShoppingCartContextValue}>
      {children}
      {/* Also possible to put the component at the end of App.tsx, here it is easier to acess state */}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
