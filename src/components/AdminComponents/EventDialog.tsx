import { Event, EventStatus } from "../../types";
import { Box, Typography, Button } from "@mui/material";

interface EventDialogProps {
  event: Event | null;
  onClose: () => void;
}

function EventDialog({ event, onClose }: EventDialogProps) {
  if (!event) return null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {event.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {event.description}
      </Typography>
      <Typography variant="body2">
        Date: {event.date.toLocaleDateString()}
      </Typography>
      <Typography variant="body2" paragraph>
        Time:{" "}
        {event.date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
      <Typography variant="body2" paragraph>
        Location: {event.location}
      </Typography>
      <Typography variant="body2" paragraph>
        Status: {event.status}
      </Typography>
      <Typography variant="body2" paragraph>
        Spots Available: {event.spotsAvailable}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor:
              event.status === EventStatus.APPROVED
                ? "custom.unassigned"
                : "custom.approved",
          }}
        >
          {event.status === EventStatus.APPROVED ? "Unapprove" : "Approve"}
        </Button>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Box>
  );
}

export default EventDialog;
