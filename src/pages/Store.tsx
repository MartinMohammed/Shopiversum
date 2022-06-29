import { Row, Col } from "react-bootstrap";

// IMPORT DATA
// JUST IMPORT .json data LIKE IT WOULD BE AN MODULE
import StoreItems from "../data/items.json";

// IMPORT COMPONENTS
import StoreItem from "../components/StoreItem";

const Store = () => {
  const renderStoreItems = StoreItems.map((storeItem) => {
    return (
      <Col key={storeItem.id}>
        {/* spread all key-value pairs inside the component as props */}
        <StoreItem {...storeItem} />
      </Col>
    );
  });
  return (
    <>
      <h1>Store</h1>
      {/* MAKE THE ROW RESPONSIVE (xtra small, medium, large) + gap 3 - LIKe a grid */}
      <Row md={2} xs={1} lg={3} className="g-3">
        {renderStoreItems}
      </Row>
    </>
  );
};

export default Store;
