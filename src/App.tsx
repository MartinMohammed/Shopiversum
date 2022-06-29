import { Routes, Route, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AnimatePresence } from "framer-motion";

// IMPORT CONTET
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

// IMPORT COMPONENTS
import Navbar from "./components/Navbar";

// IMPORT PAGES
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";

function App() {
  // * About useLocation()
  /* 
  useLocation(): location_object
  location_object => contains information about the current URL 
  A new location object whenever the URL changes (location_object has changed)

  motion need that in order to understand when the component does umount or mount for fading in or fading out
  */
  const currentLocation = useLocation();
  return (
    <>
      {/* About AnimatePresence */}
      {/* 
        All routes that fade in and fade out need to be wrapped in
        AnimatePresence.
        Fade out this page before the other one comes in
    */}
      <AnimatePresence exitBeforeEnter>
        <ShoppingCartProvider>
          <Navbar />
          <Container className="mb-4">
            <Routes location={currentLocation} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Container>
        </ShoppingCartProvider>
      </AnimatePresence>
    </>
  );
}

export default App;
