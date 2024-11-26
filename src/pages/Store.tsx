import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useEffect, useState } from "react";

type StoreItem = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function Store() {
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((response) => response.json())
      .then((data) => setStoreItems(data));
  }, []);

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
