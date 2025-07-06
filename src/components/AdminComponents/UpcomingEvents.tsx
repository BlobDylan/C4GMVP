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
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useSnackbar } from "notistack";

import {
  EventDialog,
  NewEventForm,
  AreYouSure,
  UpcomingEventRowSkeleton,
} from "../";
import { useEvents } from "../../hooks";
import { Event } from "../../types";

export interface EventDialogProps {
  open: boolean;
  event: Event | null;
  onClose: () => void;
}

export type DialogType = "none" | "view" | "new" | "delete";

function UpcomingEvents() {
  const { enqueueSnackbar } = useSnackbar();
  const [activeDialog, setActiveDialog] = useState<DialogType>("none");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
  if (error) {
    enqueueSnackbar(error, { variant: "error" });
  }

  const numRowsToLoad = 4;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          padding: { xs: 1, sm: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "background.paper",
            padding: { xs: 2, sm: 4 },
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "center", sm: "flex-start" },
              width: "100%",
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Typography variant="h3" sx={{ marginBottom: 2, textAlign: { xs: "center", sm: "left" } }}>
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
          
          {isMobile ? (
            // Mobile card layout
            <Stack spacing={2} sx={{ width: "100%" }}>
              {isLoading
                ? Array.from({ length: numRowsToLoad }, (_, index) => (
                    <Card key={index} sx={{ backgroundColor: "background.default" }}>
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography variant="h6">Loading...</Typography>
                          <Stack direction="row" spacing={1}>
                            <IconButton size="small" disabled>
                              <PreviewIcon />
                            </IconButton>
                            <IconButton size="small" disabled>
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </Box>
                      </CardContent>
                    </Card>
                  ))
                : events.map((event) => (
                    <Card key={event.id} sx={{ backgroundColor: "background.default" }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: 1 }}>
                          {event.title}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                          <strong>Channel:</strong> {event.channel}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                          <strong>Language:</strong> {event.language}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                          <strong>Date:</strong> {event.date.toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                          <strong>Time:</strong> {event.date.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                          <strong>Location:</strong> {event.location}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                          <strong>Group Size:</strong> {event.group_size}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                          <strong>Instructors:</strong> {event.num_instructors_needed}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                          <strong>Representatives:</strong> {event.num_representatives_needed}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 1 }}>
                          <strong>Status:</strong> {event.status}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
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
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
            </Stack>
          ) : (
            // Desktop table layout
            <TableContainer sx={{ maxHeight: 400, width: "100%" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Channel</TableCell>
                    <TableCell>Language</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Group Size</TableCell>
                    <TableCell>Instructors Needed</TableCell>
                    <TableCell>Representatives Needed</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading
                    ? Array.from({ length: numRowsToLoad }, (_, index) => (
                        <UpcomingEventRowSkeleton key={index} />
                      ))
                    : events.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>{event.title}</TableCell>
                          <TableCell>{event.channel}</TableCell>
                          <TableCell>{event.language}</TableCell>
                          <TableCell>{event.date.toLocaleDateString()}</TableCell>
                          <TableCell>
                            {event.date.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>{event.group_size}</TableCell>
                          <TableCell>{event.num_instructors_needed}</TableCell>
                          <TableCell>
                            {event.num_representatives_needed}
                          </TableCell>
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
          )}
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
