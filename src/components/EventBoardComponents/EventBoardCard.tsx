import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { Event } from "../../types";
import { useEvents } from "../../hooks";

function EventBoardCard(event: Event) {
  const { registerToEvent, isLoadingRegisterID } = useEvents();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: { xs: "100%", sm: "40dvw" },
        alignContent: "center",
        justifyContent: "space-between",
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {event.title}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        {event.description}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Date: {event.date.toLocaleDateString()}
      </Typography>

      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Time:{" "}
        {event.date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Location: {event.location}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Channel: {event.channel}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Group Size: {event.group_size}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Language: {event.language}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Instructors Needed: {event.num_instructors_needed}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Representatives Needed: {event.num_representatives_needed}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Status: {event.status}
      </Typography>
      <Button
        variant="contained"
        disabled={isLoadingRegisterID === event.id}
        onClick={() => registerToEvent(event.id)}
      >
        {isLoadingRegisterID === event.id ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          "Register"
        )}
      </Button>
    </Box>
  );
}

export default EventBoardCard;
