import React from "react";
import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUserAccountThunk, loginThunk } from "../store/slices/user.slice";
import swal from "sweetalert";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //Inputs controllers
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //form
  const submit = (e) => {
    e.preventDefault();

    //submit para loggin

    const login = {
      email,
      password,
    };

    dispatch(loginThunk(login));

    let token = localStorage.getItem("token");

    if (token) {
      navigate("/profile");
    }
  };

  const toCreateUserSection = () => {
    navigate("/createuser");
  };

  return (
    <div className="login_container">
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Type your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Type your password..."
            value={name}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="buttom"
          onClick={toCreateUserSection}
          className="createUserStyle"
        >
          Create new user
        </Button>
        <br />
        <Button variant="primary" type="submit" onClick={submit}>
          Logg in
        </Button>
      </Form>
    </div>
  );
};

export default Login;
