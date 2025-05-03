import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import { EventDialog, NewEventForm, AreYouSure } from "../";
import { useEvents } from "../../hooks";
import { Event } from "../../types";

export interface EventDialogProps {
  open: boolean;
  event: Event | null;
  onClose: () => void;
}

export type DialogType = "none" | "view" | "new" | "delete";

function UpcomingEvents() {
  const [activeDialog, setActiveDialog] = useState<DialogType>("none");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleOpenDialog = (type: DialogType, event?: Event) => {
    setActiveDialog(type);
    if (event) {
      setSelectedEvent(event);
    }
  };
  const handleClose = () => {
    setActiveDialog("none");
    setSelectedEvent(null);
  };

  const { events, isLoading, error } = useEvents();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "background.paper",
            padding: 4,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h3" sx={{ marginBottom: 2 }}>
              Upcoming Events
            </Typography>
            <IconButton
              aria-label="add"
              size="large"
              onClick={() => handleOpenDialog("new")}
              sx={{ marginBottom: 2 }}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <TableContainer sx={{ maxHeight: 400, width: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Event Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Spots Available</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.date.toLocaleDateString()}</TableCell>
                    <TableCell>
                      {event.date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.spotsAvailable}</TableCell>
                    <TableCell>{event.status}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="view"
                        size="small"
                        onClick={() => handleOpenDialog("view", event)}
                      >
                        <PreviewIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => handleOpenDialog("delete", event)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Dialog open={activeDialog === "view"} onClose={handleClose} fullWidth>
        <EventDialog event={selectedEvent} onClose={handleClose} />
      </Dialog>
      <Dialog open={activeDialog === "new"} onClose={handleClose} fullWidth>
        <NewEventForm onClose={handleClose} />
      </Dialog>
      <Dialog open={activeDialog === "delete"} onClose={handleClose} fullWidth>
        <AreYouSure event={selectedEvent} onClose={handleClose} />
      </Dialog>
    </>
  );
}

export default UpcomingEvents;
