import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { EventCardType } from "../../types";
import { useEvents } from "../../hooks";

function EventBoardCard(event: EventCardType) {
  const { registerToEvent, isLoadingRegister } = useEvents();
  const { id, title, description, date, location, spotsAvailable } = event;

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
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Spots Available: {spotsAvailable}
      </Typography>
      <Button variant="contained" onClick={() => registerToEvent(id)}>
        {isLoadingRegister ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          "Register"
        )}
      </Button>
    </Box>
  );
}

export default EventBoardCard;
