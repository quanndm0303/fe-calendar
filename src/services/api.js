import axios from "axios";

const API_KEY = "AIzaSyCsrE53rbKRv6EXpZM00WxhtVzZ0DGqHjQ";
const CALENDAR_ID = "nguyendinhminhquan03@gmail.com";

export const fetchEvents = async (date) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
      {
        params: {
          key: API_KEY,
          timeMin: date.toISOString(),
          timeMax: new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
          ).toISOString(),
          singleEvents: true,
          orderBy: "startTime",
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};
