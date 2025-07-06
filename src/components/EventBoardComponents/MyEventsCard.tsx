import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { EventStatus, Event } from "../../types";
import { useEvents } from "../../hooks/useEvents";

function MyEventsCard(event: Event) {
  const { unregisterFromEvent, isLoadingUnregisterID } = useEvents();
  const handleUnregisterButton = () => {
    unregisterFromEvent(event.id);
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
        padding: { xs: 2, sm: 3 },
        border: "1px solid white",
        borderRadius: "8px",
        backgroundColor: "background.default",
        boxShadow: 3,
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2, fontSize: { xs: "1.5rem", sm: "2rem" } }}>
        {event.title}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
        {event.description}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
        Date: {event.date.toLocaleDateString()}
      </Typography>

      <Typography variant="body2" sx={{ marginBottom: 2, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
        Time:{" "}
        {event.date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
        Location: {event.location}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
        Channel: {event.channel}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
        Group Size: {event.group_size}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
        Language: {event.language}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
        Instructors Needed: {event.num_instructors_needed}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
        Representatives Needed: {event.num_representatives_needed}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          marginBottom: 2,
          fontSize: { xs: "0.8rem", sm: "0.875rem" }
        }}
      >
        Status: {event.status === EventStatus.APPROVED ? "Approved" : "Pending"}
      </Typography>
      <Button
        variant="contained"
        disabled={isLoadingUnregisterID === event.id}
        onClick={handleUnregisterButton}
        sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
      >
        {isLoadingUnregisterID === event.id ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          "Unregister"
        )}
      </Button>
    </Box>
  );
}

export default MyEventsCard;
