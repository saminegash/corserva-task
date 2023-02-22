import { Button, Offcanvas, Stack } from "react-bootstrap";
import {
  StoreItemProps,
  useShoppingCart,
} from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utils/formatCurrency";
import { useEffect, useState } from "react";
import itemService from "../api/itemService";

type ShoppingCartProps = {
  isOpen: boolean;
};
export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const [storeItems, setStoreItems] = useState([] as StoreItemProps[]);
  const { closeCart, cartItems } = useShoppingCart();
  useEffect(() => {
    const fetchedItems = async () => {
      const items = await itemService.getItems();
      setStoreItems(items);
    };
    fetchedItems();
  }, []);
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((item) => item.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
          //TODO: TO BE DONE NEXT IF NEEDED
          <Button>Check Out</Button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
