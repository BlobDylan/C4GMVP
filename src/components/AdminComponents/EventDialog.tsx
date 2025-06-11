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
        תאריך: {event.date.toLocaleDateString()}
      </Typography>
      <Typography variant="body2" paragraph>
        שעה:{" "}
        {event.date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
      <Typography variant="body2" paragraph>
        ערוץ: {event.channel}
      </Typography>
      <Typography variant="body2" paragraph>
        שפה: {event.language}
      </Typography>
      <Typography variant="body2" paragraph>
        גודל קבוצה: {event.group_size}
      </Typography>
      <Typography variant="body2" paragraph>
        כמות מדריכים נדרשת: {event.num_instructors_needed}
      </Typography>
      <Typography variant="body2" paragraph>
        כמות נציגים נדרשת: {event.num_representatives_needed}
      </Typography>
      <Typography variant="body2" paragraph>
        מיקום: {event.location}
      </Typography>
      <Typography variant="body2" paragraph>
        סטטוס: {event.status}
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
          {event.status === EventStatus.APPROVED ? "הסר אישור" : "אשר"}
        </Button>
        <Button variant="contained" onClick={onClose}>
          סגור
        </Button>
      </Box>
    </Box>
  );
}

export default EventDialog;
