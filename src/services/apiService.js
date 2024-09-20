import axios from "axios";

const API_BASE_URL = "http://localhost:8083/event";

const apiService = {
  updateEvent: async (eventId, eventData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  },

  deleteEvent: async (eventId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${eventId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  },

  createEvent: async (eventData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add-event`, eventData);
      return response.data;
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  },

  getMyEvents: async (page = 1, size = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/my-events`, {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching my events:", error);
      throw error;
    }
  },
};

export default apiService;
