import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { createEvent } from "../../services/Event";
import "./CreateEventForm.css";

const CreateEventForm = ({ show, handleClose, onEventCreated }) => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    location: "",
    participants: [],
    priority: "LOW",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(newEvent);
      handleClose();
      onEventCreated();
      setNewEvent({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        location: "",
        participants: [],
        priority: "LOW",
      });
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="create-event-modal">
      <Modal.Header closeButton>
        <Modal.Title>Create New Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="startTime"
              value={newEvent.startTime}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="endTime"
              value={newEvent.endTime}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={newEvent.location}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Participants</Form.Label>
            <Form.Control
              type="text"
              name="participants"
              value={newEvent.participants.join(", ")}
              onChange={(e) =>
                setNewEvent((prev) => ({
                  ...prev,
                  participants: e.target.value.split(",").map((p) => p.trim()),
                }))
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={newEvent.priority}
              onChange={handleInputChange}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Event
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateEventForm;
