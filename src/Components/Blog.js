import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { PencilFill, Trash3 } from "react-bootstrap-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Blog({ title, description, image, blogId, userName, user }) {
  const navigate = useNavigate();
  let currentUser = false
  if(user === localStorage.getItem("userId")){
    currentUser = true
  }
  const sendRequest = async () => {
    const res = await axios
      .delete(`https://react-blog-app2652.herokuapp.com/api/blog/delete/${blogId}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const deleteBlog = (e) => {
    sendRequest()
      .then(() => navigate("/"))
  };
  const editBlog = () => {
    navigate(`/myblogs/${blogId}`)
  }
  return (
    <div className="mt-5">
      <Card style={{ width: "30rem" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <div className="d-flex justify-content-between">
            <Card.Title>{title}</Card.Title> {!currentUser && <Card.Text>{userName}</Card.Text>}
            {currentUser && (
              <div style={{cursor: "pointer"}}>
                <PencilFill onClick={editBlog} className="me-3" color="blue" />
                <Trash3 onClick={deleteBlog} color="red" />
              </div>
            )}
          </div>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Blog;
