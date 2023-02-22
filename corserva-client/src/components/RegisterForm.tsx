import React, { useRef, useState, useEffect } from "react";
import Joi from "joi";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authService from "../api/authService";
import { useUserContext } from "../context/UserContext";

type RegisterProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = Joi.object({
  name: Joi.string().min(4).max(25).required().label("Name"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().required().label("Password"),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm Password"),
});

const initData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterForm = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef();

  const [errors, setErrors] = useState({} as RegisterProps);
  const [data, setData] = useState<RegisterProps>(initData);
  const [errorExist, setErrorExist] = useState(true);

  const validate = () => {
    const options = { abortEarly: false };

    const { error } = schema.validate(data);
    if (!error) return null;
    const errors = {} as any;
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors as RegisterProps;
  };

  const { setUser } = useUserContext();

  const handleChange = (
    e: any,
    field: "name" | "email" | "password" | "confirmPassword"
  ) => {
    const updateData = { ...data };
    updateData[field] = e.target.value;

    setData((prevData) => updateData);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const errors = validate();
    if (errors) {
      setErrors(errors);
      setErrorExist(true);
    } else {
      setErrorExist(false);
      setErrors(initData);
    }

    const registerData = {
      name: data.name,
      email: data.email,
      password: data.password,
      roleId: "521fae64-df67-4caf-b812-c85021e114fa",
    };
    const response = await authService.register(registerData);
    console.log(response);
    setUser(response.data.user);
    navigate("/");
  };

  useEffect(() => {
    userRef?.current?.focus();
  }, []);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/login");
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
  }, [data.name, data.password, data.email, data.confirmPassword]);
  return (
    <>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            ref={userRef}
            onChange={(e) => handleChange(e, "name")}
            placeholder="Enter Name"
          />
        </Form.Group>
        {errors && errors["name"] && (
          <span className="alert alert-danger">{errors["name"]}</span>
        )}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            onChange={(e) => handleChange(e, "email")}
            placeholder="Enter Email"
          />
        </Form.Group>
        {errors && errors["email"] && (
          <span className="alert alert-danger">{errors["email"]}</span>
        )}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            onChange={(e) => handleChange(e, "password")}
            placeholder="Enter Password"
          />
        </Form.Group>
        {errors && errors["password"] && (
          <span className="alert alert-danger">{errors["password"]}</span>
        )}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="confirmPassword"> Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="cofirmPassword"
            onChange={(e) => handleChange(e, "confirmPassword")}
            placeholder="Confirm Password"
          />
        </Form.Group>
        {errors && errors["confirmPassword"] && (
          <span className="alert alert-danger">
            Password must match to continue
          </span>
        )}

        <Button disabled={errorExist} variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <span>
        Have an Account?{" "}
        <Button size="sm" onClick={handleNavigate}>
          Login
        </Button>
      </span>
    </>
  );
};
