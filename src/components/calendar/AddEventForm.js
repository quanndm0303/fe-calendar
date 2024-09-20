import React, { useState } from "react";
import { format } from "date-fns";

const AddEventForm = ({ currentDate, onAddEvent, onClose }) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    startTime: format(currentDate, "yyyy-MM-dd'T'HH:mm"),
    endTime: format(currentDate, "yyyy-MM-dd'T'HH:mm"),
    location: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent(eventData);
  };

  return (
    <div className="add-event-form">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          placeholder="Event Title"
          required
        />
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
          placeholder="Event Description"
        />
        <input
          type="datetime-local"
          name="startTime"
          value={eventData.startTime}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="endTime"
          value={eventData.endTime}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <button type="submit">Add Event</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEventForm;
