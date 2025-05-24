import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { EventStatus, Event } from "../../types";
import { useEvents } from "../../hooks/useEvents";

function MyEventsCard(event: Event) {
  const { id, title, description, date, location, status } = event;
  const { unregisterFromEvent, isLoadingUnregisterID } = useEvents();
  const handleUnregisterButton = () => {
    unregisterFromEvent(id);
  };

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
        }}
      >
        {status === EventStatus.APPROVED ? "Approved" : "Pending"}
      </Typography>
      <Button
        variant="contained"
        disabled={isLoadingUnregisterID === id}
        onClick={handleUnregisterButton}
      >
        {isLoadingUnregisterID === id ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          "Unregister"
        )}
      </Button>
    </Box>
  );
}

export default MyEventsCard;
