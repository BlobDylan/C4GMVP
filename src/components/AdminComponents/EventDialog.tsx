import { Event, EventStatus } from "../../types";
import { Box, Typography, Button } from "@mui/material";
import { useEvents } from "../../hooks";

interface EventDialogProps {
  event: Event | null;
  onClose: () => void;
}

function EventDialog({ event, onClose }: EventDialogProps) {
  if (!event) return null;

  const { approveEvent, unapproveEvent } = useEvents();

  const handleClick = async () => {
    if (event.status === EventStatus.APPROVED) {
      await unapproveEvent(event.id);
    } else {
      await approveEvent(event.id);
    }
    onClose();
  };

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
        Channel: {event.channel}
      </Typography>
      <Typography variant="body2" paragraph>
        Language: {event.language}
      </Typography>
      <Typography variant="body2" paragraph>
        Group Size: {event.group_size}
      </Typography>
      <Typography variant="body2" paragraph>
        Instructors Needed: {event.num_instructors_needed}
      </Typography>
      <Typography variant="body2" paragraph>
        Representatives Needed: {event.num_representatives_needed}
      </Typography>
      <Typography variant="body2" paragraph>
        Location: {event.location}
      </Typography>
      <Typography variant="body2" paragraph>
        Status: {event.status}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleClick}
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
