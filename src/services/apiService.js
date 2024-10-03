import axios from "axios";
import { getMyPosts } from "./postService";

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

  // getMyEvents: async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(`${API_BASE_URL}/my-events`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching my events:", error);
  //     throw error;
  //   }
  // },

  getMyEvents : async () => {
    try {
      const response = await getMyPosts();
      return response.data;
    } catch (error) {
      console.error("Error fetching my events:", error);
          throw error;
    }
  },
};

export default apiService;
