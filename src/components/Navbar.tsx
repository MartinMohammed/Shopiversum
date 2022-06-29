import React from "react";
// Rename Navbar because of the name collision
import { Container, Nav, Navbar as NavbarBs, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

// IMPORT CONTEXT
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar = () => {
  const { openCart, cartTotalQuantity: cartQuantity } = useShoppingCart();

  // If Cart.length > 0: show button to open the cart
  const renderButtonToCart = (
    <Button
      style={{ width: "3rem", height: "3rem", position: "relative" }}
      variant="outline-primary"
      className="rounded-circle"
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => openCart()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        fill="currentColor"
      >
        <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
      </svg>
      <div
        className="rounded-circle bg-danger d-flex justify-content-center"
        style={{
          color: "white",
          width: "1.5rem",
          height: "1.5rem",
          position: "absolute",
          bottom: 0,
          right: 0,
          //   off-set the small cicle a bit
          transform: "translate(25%)",
        }}
      >
        {cartQuantity}
      </div>
    </Button>
  );

  return (
    <NavbarBs className="bg-white shadow-sm mb-3" sticky="top">
      <Container>
        {/* put margin on the right hand side - so it pushed the element complete right */}
        <Nav className="me-auto">
          {/* Make it act like it is a navlink from react-router-dom */}
          {/* React Boostrap specific */}
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={NavLink} to="/store">
            Store
          </Nav.Link>
        </Nav>
        {/* IF NOTHING IN CART WHY SHOW cart symbol  */}
        {cartQuantity > 0 && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }} // exit only works in correlation with AnimatePresence
            transition={{ duration: 0.5 }} //  how long it takes to transition from intial style to default
          >
            {renderButtonToCart}
          </motion.div>
        )}
      </Container>
    </NavbarBs>
  );
};

export default Navbar;
