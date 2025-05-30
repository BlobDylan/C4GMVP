import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { Event } from "../../types";
import { useEvents } from "../../hooks";

interface DeleteDialogProps {
  event: Event | null;
  onClose: () => void;
}

function AreYouSure({ event, onClose }: DeleteDialogProps) {
  const { deleteEvent, isLoading } = useEvents();

  const handleDelete = async () => {
    if (event) {
      await deleteEvent(event.id);
      onClose();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <>
          <Typography variant="h4" gutterBottom>
            Are you sure?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Yes
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default AreYouSure;
