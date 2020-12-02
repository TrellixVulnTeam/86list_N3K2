import React from "react";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap'
import { destroyPost, putPost } from '../services/posts'
import "./PostCard.css";

const LessonCard = (props) => {
  const [post, setPost] = useState([])
  const history = useHistory();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // Iteration 1 - this will take you to a new screen to edit / Iteration 2 will edit the post right here
  const handleUpdate = async (id, postData) => {
    const updatedPost = await putPost(id, postData);
    setPost(prevState => prevState.map(post => {
      return post.id === Number(id) ? updatedPost : post
    }))
    history.push('/posts');
  }

  const handleDelete = async (id) => {
    await destroyPost(id);
    setPost(prevState => prevState.filter(post => post.id !== id))
  }

  return (
    <div id="post-card-main-container">
        <div>
          <div id="post-card-container">
            <div id="post-card-details">
              <p className="post-attr">Title: {props.title}</p>
              <p className="post-attr">Content: {props.content}</p>
            <p className="post-attr">{props.image_url}</p>
            <div id="post-card-bottom">
              <p id="comment-ternary">Hide | Show Comments</p>
              <div id="post-card-button-container">
                <NavLink id="post-card-edit-link" to={`/posts/${props.id}/edit`}><button id="post-card-edit-button">Edit</button></NavLink>
                <button id="post-card-delete-button" onClick={handleShow}>Delete</button>
                
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>¡Alert!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you want to delete this post? This action cannot be undone.</Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" autoFocus onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(props.id)}>
                      Yes, Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LessonCard;