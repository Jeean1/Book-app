import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createUserAccountThunk } from "../store/slices/user.slice";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Inputs controllers
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();

    let newUser = {
      name,
      email,
      password,
    };

    dispatch(createUserAccountThunk(newUser));
    navigate("/");
    swal("User account has been created", "", "success");
  };

  return (
    <div className="createUser_container">
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <br />
        <Button variant="primary" type="submit" onClick={submit}>
          Register user account
        </Button>
      </Form>
    </div>
  );
};

export default CreateUser;
