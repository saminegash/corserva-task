import React, { useRef, useState, useEffect } from "react";
import Joi from "joi";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type ItemProps = {
  name: string;
  vendorName: string;
  description: string;
  photo: string;
  price: number;
  quantity: number;
};

const schema = Joi.object({
  name: Joi.string().required().label("Item Name"),
  vendorName: Joi.string().required().label("Vendor Name"),
  description: Joi.string().required().label("Photo URL"),
  photo: Joi.string().required().label("Description"),
  price: Joi.number().required().label("Price"),
  quantity: Joi.number().required().label("Quantity"),
});

const initData = {
  name: "",
  vendorName: "",
  description: "New item to be created",
  photo:
    "https://images.pexels.com/photos/3691112/pexels-photo-3691112.jpeg?auto=compress&cs=tinysrgb&w=1600",
  price: 0,
  quantity: 0,
};

export const ItemForm = () => {
  const itemRef = useRef<HTMLInputElement>(null);
  const errRef = useRef();

  const [errors, setErrors] = useState({} as ItemProps);
  const [data, setData] = useState<ItemProps>(initData);
  const [errorExist, setErrorExist] = useState(true);

  const validate = () => {
    const options = { abortEarly: false };

    const { error } = schema.validate(data);
    if (!error) return null;
    const errors = {} as any;
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors as ItemProps;
  };

  const handleChange = (
    e: any,
    field:
      | "name"
      | "vendorName"
      | "price"
      | "quantity"
      | "photo"
      | "description"
  ) => {
    const updateData: ItemProps = { ...data };

    if (field === "price" || field === "quantity") {
      updateData[field] = Number(e.target.value);
    } else {
      updateData[field] = e.target.value;
    }
    setData((prevData) => updateData);
  };

  useEffect(() => {
    itemRef?.current?.focus();
  }, []);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/store");
  };

  useEffect(() => {
    const result = validate();
    if (result) {
      setErrors(result);
      setErrorExist(true);
    } else {
      setErrors(initData);
      setErrorExist(false);
    }
  }, [
    data.name,
    data.vendorName,
    data.description,
    data.price,
    data.quantity,
    data.photo,
  ]);
  return (
    <>
      <h1>Item</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            onChange={(e) => handleChange(e, "name")}
            placeholder="Enter Name of Item"
          />
        </Form.Group>
        {errors && errors["name"] && (
          <span className="alert alert-danger">{errors["name"]}</span>
        )}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="vendorName">VendorName</Form.Label>
          <Form.Control
            type="text"
            id="vendorName"
            onChange={(e) => handleChange(e, "vendorName")}
            placeholder="Enter VendorName of Item"
          />
        </Form.Group>
        {errors && errors["vendorName"] && (
          <span className="alert alert-danger">{errors["vendorName"]}</span>
        )}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control
            type="text"
            id="description"
            onChange={(e) => handleChange(e, "description")}
            placeholder="Enter Description of Item"
          />
        </Form.Group>
        {errors && errors["description"] && (
          <span className="alert alert-danger">{errors["description"]}</span>
        )}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="photo">Photo</Form.Label>
          <Form.Control
            type="text"
            id="photo"
            onChange={(e) => handleChange(e, "photo")}
            placeholder="Enter Photo of Item"
          />
        </Form.Group>
        {errors && errors["photo"] && (
          <span className="alert alert-danger">{errors["photo"]}</span>
        )}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="price">Price</Form.Label>
          <Form.Control
            type="number"
            id="price"
            onChange={(e) => handleChange(e, "price")}
            placeholder="Enter price of Item"
          />
        </Form.Group>
        {errors && errors["price"] && (
          <span className="alert alert-danger">{errors["price"]}</span>
        )}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="quantity">Quantity</Form.Label>
          <Form.Control
            type="number"
            id="quantity"
            onChange={(e) => handleChange(e, "quantity")}
            placeholder="Enter quantity of Item"
          />
        </Form.Group>
        {errors && errors["quantity"] && (
          <span className="alert alert-danger">{errors["quantity"]}</span>
        )}

        <Button disabled={errorExist} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
