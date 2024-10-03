import React from "react";
import { Box, Typography } from "@mui/material";

const Event = React.forwardRef(({ event }, ref) => {
  return (
    <Box ref={ref} sx={{ padding: 2, borderBottom: "1px solid #ccc" }}>
      <Typography variant="h6">{event.title}</Typography>
      <Typography variant="body2">{event.description}</Typography>
      <Typography variant="body2">Location: {event.location}</Typography>
      <Typography variant="body2">
        Start Time: {new Date(event.startTime).toLocaleString()}
      </Typography>
      <Typography variant="body2">
        End Time: {new Date(event.endTime).toLocaleString()}
      </Typography>
    </Box>
  );
});

export default Event;
