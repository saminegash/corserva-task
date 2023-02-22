import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import {
  StoreItemProps,
  useShoppingCart,
} from "../context/ShoppingCartContext";
import itemService from "../api/itemService";
export function Store() {
  const { user } = useUserContext();
  const [storeItems, setStoreItems] = useState([] as StoreItemProps[]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await itemService.getItems();
      setStoreItems(response);
    };
    fetchData();
  }, []);

  return (
    <>
      <div>Store</div>
      <Row>
        <Row className="mb-5">
          <Row className="justify-content-beetween">
            <Col md="10" lg="10">
              <h2>My Items</h2>{" "}
            </Col>
            <Col className="justify-content-end">
              {user && user.id && (
                <Link to="/store/new" className="btn btn-primary  mb-4">
                  New Item
                </Link>
              )}
            </Col>
          </Row>
          {storeItems.map((item) => (
            <Col key={item.id} md={3} lg={3} sm="4" xs={6}>
              <StoreItem {...item} />
            </Col>
          ))}
        </Row>
        <h2>Explore Items from Other vendors</h2>
        {storeItems.map((item) => (
          <Col key={item.id} md={3} lg={3} sm="4" xs={6}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
