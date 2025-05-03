import { Box, Typography } from "@mui/material";
import { EventStatus, Event } from "../../types";

function MyEventsCard(event: Event) {
  const { id, title, description, date, location, status } = event;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        alignContent: "center",
        justifyContent: "space-between",
        padding: 3,
        border: "1px solid white",
        borderRadius: "8px",
        backgroundColor: "background.default",
        boxShadow: 3,
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        {description}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Date: {date.toLocaleDateString()}
      </Typography>

      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Time:{" "}
        {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Location: {location}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          marginBottom: 2,
          backgroundColor:
            status === EventStatus.APPROVED
              ? "custom.approved"
              : "custom.pending",
          color: "black",
          padding: 1,
          borderRadius: 1,
        }}
      >
        {status === EventStatus.APPROVED ? "Approved" : "Pending"}
      </Typography>
    </Box>
  );
}

export default MyEventsCard;
