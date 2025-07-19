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
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import EditEventForm from "../Forms/EditEventForm";
import {
  EventDialog,
  NewEventForm,
  AreYouSure,
  UpcomingEventRowSkeleton,
  FilterBar,
} from "../";
import { useEvents } from "../../hooks";
import { useAuth } from "../../hooks";
import { Event } from "../../types";

export interface EventDialogProps {
  open: boolean;
  event: Event | null;
  onClose: () => void;
}

export type DialogType = "none" | "view" | "new" | "delete" | "edit";

function UpcomingEvents() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const { user } = useAuth();
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

  const { filteredEvents, isLoading, error } = useEvents();
  if (error) {
    enqueueSnackbar(error, { variant: "error" });
  }

  const numRowsToLoad = 4;

  return (
    <>
      <Box sx={{ width: "100%", padding: 2 }}>
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
          <Typography variant="h3">{t("upcomingEvents.title")}</Typography>
          <FilterBar />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              mb: 2,
            }}
          >
            <IconButton
              aria-label={t("common.add")}
              size="large"
              onClick={() => handleOpenDialog("new")}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Box>

          <TableContainer sx={{ maxHeight: 400, width: "100%" }}>
            <Table stickyHeader aria-label="upcoming events table">
              <TableHead>
                <TableRow>
                  <TableCell>{t("upcomingEvents.table.title")}</TableCell>
                  <TableCell>{t("upcomingEvents.table.channel")}</TableCell>
                  <TableCell>{t("upcomingEvents.table.language")}</TableCell>
                  <TableCell>{t("upcomingEvents.table.date")}</TableCell>
                  <TableCell>{t("upcomingEvents.table.time")}</TableCell>
                  <TableCell>{t("upcomingEvents.table.location")}</TableCell>
                  <TableCell>{t("upcomingEvents.table.groupSize")}</TableCell>
                  <TableCell>
                    {t("upcomingEvents.table.instructorsNeeded")}
                  </TableCell>
                  <TableCell>
                    {t("upcomingEvents.table.representativesNeeded")}
                  </TableCell>
                  <TableCell>
                    {t("upcomingEvents.table.targetAudience")}
                  </TableCell>
                  <TableCell>{t("upcomingEvents.table.status")}</TableCell>
                  <TableCell>{t("upcomingEvents.table.actions")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading
                  ? Array.from({ length: numRowsToLoad }, (_, index) => (
                      <UpcomingEventRowSkeleton key={index} />
                    ))
                  : filteredEvents.map((event) => (
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
                        <TableCell>{event.target_audience}</TableCell>
                        <TableCell>{event.status}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label={t("common.view")}
                            size="small"
                            onClick={() => handleOpenDialog("view", event)}
                          >
                            <PreviewIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton
                            aria-label={t("common.delete")}
                            size="small"
                            onClick={() => handleOpenDialog("delete", event)}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                          {user?.permissions === "super_admin" && (
                            <IconButton
                              aria-label={t("common.edit")}
                              size="small"
                              onClick={() => handleOpenDialog("edit", event)}
                            >
                              <EditIcon fontSize="inherit" />
                            </IconButton>
                          )}
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
      <Dialog open={activeDialog === "edit"} onClose={handleClose} fullWidth>
        {selectedEvent && (
  <EditEventForm onClose={handleClose} initialEvent={selectedEvent} />
)}
      </Dialog>
    </>
  );
}

export default UpcomingEvents;
