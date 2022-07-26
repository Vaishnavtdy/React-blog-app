import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

function AddBlog() {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    title : "",
    description : "",
    image: ""
  })
  const handleChange = (e) => {
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
  }))}
  const sendRequest = async() => {
    const res = await axios.post("https://react-blog-app2652.herokuapp.com/api/blog/add",{
      title : inputs.title,
      description: inputs.description,
      image: inputs.image,
      user: localStorage.getItem("userId")
    }).catch((err)=> console.log(err))
    const data = await res.data
    return data
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    sendRequest()
    .then((data)=> console.log(data))
    .then(()=> navigate("/"))
  }
  return (
    <div
      className="container mt-5 p-5"
      style={{ maxWidth: "500px", border: "1px solid #ccc" }}
    >
      <Form onSubmit={handleSubmit} className="d-flex flex-column">
        <h2 className="text-center mb-4">Add Your Blog</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={inputs.title}
            onChange={handleChange}
            name="title"
            placeholder="Enter title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={inputs.description}
            onChange={handleChange}
            name="description"
            placeholder="Enter description"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            value={inputs.image}
            onChange={handleChange}
            name="image"
            placeholder="ImageURL"
          />
        </Form.Group>
        <Button variant="primary" className="m-auto mt-3" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default AddBlog