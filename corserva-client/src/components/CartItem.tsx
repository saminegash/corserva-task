import { Button, Stack } from "react-bootstrap";
import {
  StoreItemProps,
  useShoppingCart,
} from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";
import { useEffect, useState } from "react";
import itemService from "../api/itemService";
type CartItemProps = {
  id: string;
  quantity: number;
};
export function CartItem({ id, quantity }: CartItemProps) {
  const [item, setItem] = useState({} as StoreItemProps);
  const { removeFromCart } = useShoppingCart();

  useEffect(() => {
    const fetchData = async () => {
      const response = await itemService.getItem(id);
      setItem(response);
      console.log(response);
    };
    fetchData();
  }, []);
  // const item = storeItems.find((item) => item.id === id);
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2}>
      <img
        src={item.photo}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outlined-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
