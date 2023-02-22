import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useShoppingCart } from "../context/ShoppingCartContext";
import itemService from "../api/itemService";

export function Home() {
  const { storeItems, setStoreItems } = useShoppingCart();
  useEffect(() => {
    const fetchData = async () => {
      const response = await itemService.getItems();
      setStoreItems(response);
    };
    fetchData();
  }, []);
  return (
    <>
      <Row>
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
