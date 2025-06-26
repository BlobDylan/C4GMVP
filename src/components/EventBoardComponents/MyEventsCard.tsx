import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { EventStatus, Event } from "../../types";
import { useEvents, useAuth } from "../../hooks";
import { useSnackbar } from "notistack";

function MyEventsCard({ id, title, description, date, location, channel, group_size, language, num_instructors_needed, num_representatives_needed, status, registrationStatus }: Event) {
  const { unregisterFromEvent, isLoadingUnregisterID } = useEvents();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();
  const isGuide = user?.role === "Guide";
  const isPending = isGuide && registrationStatus === 'pending';

  const handleUnregisterButton = async () => {
    try {
      await unregisterFromEvent(id);
      enqueueSnackbar("Unregistered successfully!", { variant: "success" });
    } catch (err: unknown) {
      enqueueSnackbar(
        err instanceof Error ? err.message : "Failed to unregister.",
        { variant: "error" }
      );
    }
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
        Time: {date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Location: {location}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Channel: {channel}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Group Size: {group_size}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Language: {language}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Instructors Needed: {num_instructors_needed}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Representatives Needed: {num_representatives_needed}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          marginBottom: 2,
        }}
      >
        Event Status: {status === EventStatus.APPROVED ? "Approved" : "Pending"}
      </Typography>
      {isGuide && (
        <Typography
          variant="body2"
          sx={{
            marginBottom: 2,
            color: isPending ? 'orange' : 'green',
            fontWeight: 'bold',
          }}
        >
          My Registration Status: {isPending ? 'Pending Approval' : 'Approved'}
        </Typography>
      )}
      <Button
        variant="contained"
        color="secondary"
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