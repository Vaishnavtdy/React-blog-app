import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../store";
import { useDispatch } from "react-redux";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => localStorage.setItem("userId", data.user._id))
      .then(() => dispatch(authActions.login()))
      .then(()=> navigate("/"))
  };
  const sendRequest = async () => {
    const res = await axios
      .post("https://react-blog-app2652.herokuapp.com/api/user/signup", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => {
        console.log(err);
      });
    const data = await res.data;
    return data;
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div
      className="container mt-5 p-5"
      style={{ maxWidth: "500px", border: "1px solid #ccc" }}
    >
      <Form onSubmit={handleSubmit} className="d-flex flex-column">
        <h2 className="text-center mb-4">Signup</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            placeholder="Enter your name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={inputs.email}
            onChange={handleChange}
            name="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputs.password}
            onChange={handleChange}
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" className="m-auto mt-3" type="submit">
          Submit
        </Button>
        <Form.Text
          className="text-center mt-3"
          onClick={() => navigate("/login")}
          style={{ color: "black", cursor: "pointer" }}
        >
          Change to Login
        </Form.Text>
      </Form>
    </div>
  );
}

export default Signup;
