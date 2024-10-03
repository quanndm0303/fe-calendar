import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { isAuthenticated } from "../services/authenticationService";
import Scene from "./Scene";
import Event from "../components/Event";
import apiService from "../services/apiService";
import { logOut } from "../services/authenticationService";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef();
  const lastEventElementRef = useRef();

  const navigate = useNavigate();

useEffect(() => {
  if (!isAuthenticated()) {
    navigate("/login");
  } else {
    loadEvents();
  }
}, [navigate]);


const loadEvents = () => {
  console.log(`loading events`);
  setLoading(true);
  apiService
    .getMyEvents() 
    .then((response) => {
      setEvents(response.result.data); 
      setTotalPages(response.result.totalPages); 
      setHasMore(response.result.data.length > 0);
      console.log("loaded events:", response.result);
    })
    .catch((error) => {
      console.error("Error fetching events:", error);

      if (error.response && error.response.status === 401) {
        logOut();
        navigate("/login");
      }
    })
    .finally(() => {
      setLoading(false);
    });
};


  useEffect(() => {
    if (!hasMore) return;

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (page < totalPages) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    });
    if (lastEventElementRef.current) {
      observer.current.observe(lastEventElementRef.current);
    }

    setHasMore(false);
  }, [hasMore]);

  return (
    <Scene>
      <Card
        sx={{
          minWidth: 500,
          maxWidth: 600,
          boxShadow: 3,
          borderRadius: 2,
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            gap: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              mb: "10px",
            }}
          >
            Your Events,
          </Typography>
          {events.map((event, index) => {
            if (events.length === index + 1) {
              return (
                <Event ref={lastEventElementRef} key={event.id} event={event} />
              );
            } else {
              return <Event key={event.id} event={event} />;
            }
          })}
          {loading && (
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <CircularProgress size="24px" />
            </Box>
          )}
        </Box>
      </Card>
    </Scene>
  );
}
