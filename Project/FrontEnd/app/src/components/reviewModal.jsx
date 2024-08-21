// src/RatingModal.js

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const RatingModal = ({ show, handleClose, handleSave,rating2,comment2,id }) => {
  const [rating, setRating] = useState(rating2?rating2:0);
  const [comment, setComment] = useState(comment2?comment2:'');

  const handleRatingChange = (e) => setRating(e.target.value);
  const handleCommentChange = (e) => setComment(e.target.value);

  const onSave = () => {
    handleSave({ rating, comment,id});
    setRating(0);
    setComment('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rate and Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control as="select" value={rating} onChange={handleRatingChange}>
              <option value={0}>Choose...</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea" rows={3} value={comment} onChange={handleCommentChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RatingModal;
