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
        padding: 3,
        border: "1px solid white",
        borderRadius: "8px",
        backgroundColor: "background.default",
        boxShadow: 3,
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
        תאריך: {event.date.toLocaleDateString()}
      </Typography>

      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        שעה:{" "}
        {event.date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        מיקום: {event.location}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        ערוץ: {event.channel}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        גודל קבוצה: {event.group_size}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        שפה: {event.language}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        כמות מדריכים נדרשת: {event.num_instructors_needed}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        כמות נציגים נדרשת: {event.num_representatives_needed}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          marginBottom: 2,
        }}
      >
        Status: {event.status === EventStatus.APPROVED ? "מאושר" : "ממתין"}
      </Typography>
      <Button
        variant="contained"
        disabled={isLoadingUnregisterID === event.id}
        onClick={handleUnregisterButton}
      >
        {isLoadingUnregisterID === event.id ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          "בטל הרשמה"
        )}
      </Button>
    </Box>
  );
}

export default MyEventsCard;
