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
import { useState } from "react";

import { EventDialog } from "../";
import { useEvents } from "../../hooks";
import { Event } from "../../types";

export interface EventDialogProps {
  open: boolean;
  event: Event | null;
  onClose: () => void;
}

function UpcomingEvents() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };
  const handleClose = () => {
    setSelectedEvent(null);
    setOpenDialog(false);
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
          <Typography variant="h3" sx={{ marginBottom: 2 }}>
            Upcoming Events
          </Typography>
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
                        onClick={() => handleEventClick(event)}
                      >
                        <PreviewIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton aria-label="delete" size="small">
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
      <Dialog open={openDialog} onClose={handleClose}>
        <EventDialog event={selectedEvent} onClose={handleClose} />
      </Dialog>
    </>
  );
}

export default UpcomingEvents;
