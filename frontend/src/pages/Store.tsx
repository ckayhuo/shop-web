import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useEffect, useState } from "react";
import "../utilities/Style.css";

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
      .then((data) => {
        const productsData = Array.isArray(data) ? data : [data];
        setStoreItems(productsData);
      });
  }, []);

  return (
    <>
      <h3>Kay's Store</h3>
      {/* Allow layout adjusts according to screen size */}
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
