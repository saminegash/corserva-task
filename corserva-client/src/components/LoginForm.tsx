import React, { useRef, useState, useEffect } from "react";
import Joi from "joi";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authService from "../api/authService";
import { useUserContext } from "../context/UserContext";

type LoginProps = {
  email: string;
  password: string;
};

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().required().label("Password"),
});

const initData = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef();
  const [networkError, setNetworkError] = useState(
    {} as { status: number; message: string }
  );

  const [errors, setErrors] = useState({} as LoginProps);
  const [data, setData] = useState<LoginProps>(initData);
  const [errorExist, setErrorExist] = useState(true);

  const validate = () => {
    const options = { abortEarly: false };

    const { error } = schema.validate(data);
    if (!error) return null;
    const errors = {} as any;
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors as LoginProps;
  };

  const handleChange = (e: any, field: "email" | "password") => {
    const updateData = { ...data };
    updateData[field] = e.target.value;

    setData((prevData) => updateData);
  };

  const { setUser } = useUserContext();

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
    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });
      setUser(response.data.user);
      navigate("/");
    } catch (err: any) {
      console.log(err.response.data);
      setNetworkError({
        status: err.response.data.status as number,
        message: err.response.data.message,
      });
    }
  };
  useEffect(() => {
    userRef?.current?.focus();
  }, []);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/register");
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
  }, [data.password, data.email]);
  return (
    <>
      <h1 className="my-3">Login</h1>
      {networkError && networkError["status"] && (
        <span className="alert alert-danger my-3 align-center">
          {networkError["message"]}: email or password incorrect
        </span>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            onChange={(e) => handleChange(e, "email")}
            placeholder="Enter Email"
          />
        </Form.Group>
        {errors && errors["email"] && (
          <span className="alert alert-danger my-3">{errors["email"]}</span>
        )}

        <Form.Group className="my-3">
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

        <Button
          className="my-3"
          disabled={errorExist}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>

      <span>
        Have no Account?{" "}
        <Button size="sm" onClick={handleNavigate}>
          Register
        </Button>
      </span>
    </>
  );
};
