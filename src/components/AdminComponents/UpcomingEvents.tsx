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
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import {
  EventDialog,
  NewEventForm,
  AreYouSure,
  UpcomingEventRowSkeleton,
  FilterBar,
} from "../";
import { useAuth, useEvents } from "../../hooks";
import { Event } from "../../types";
import EditEventForm from "../Forms/EditEventForm";

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
            padding: { xs: 2, sm: 4 },
            borderRadius: 2,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, mb: 2 }}
          >
            {t("upcomingEvents.title")}
          </Typography>
          <FilterBar />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
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

          <TableContainer
            sx={{
              maxHeight: { xs: 300, sm: 400 },
              width: "100%",
              overflowX: "auto",
            }}
          >
            <Table stickyHeader aria-label="upcoming events table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t("upcomingEvents.table.title")}</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {t("upcomingEvents.table.channel")}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {t("upcomingEvents.table.language")}
                  </TableCell>
                  <TableCell>{t("upcomingEvents.table.date")}</TableCell>
                  <TableCell>{t("upcomingEvents.table.time")}</TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {t("upcomingEvents.table.location")}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {t("upcomingEvents.table.groupSize")}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {t("upcomingEvents.table.instructorsNeeded")}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {t("upcomingEvents.table.representativesNeeded")}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
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
                  : filteredEvents
                      .sort(
                        (a: Event, b: Event) =>
                          b.date.getTime() - a.date.getTime()
                      )
                      .map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>{event.title}</TableCell>
                          <TableCell
                            sx={{
                              display: { xs: "none", sm: "table-cell" },
                            }}
                          >
                            {event.channel}
                          </TableCell>
                          <TableCell
                            sx={{ display: { xs: "none", sm: "table-cell" } }}
                          >
                            {event.language}
                          </TableCell>
                          <TableCell>
                            {event.date.toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {event.date.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </TableCell>
                          <TableCell
                            sx={{ display: { xs: "none", md: "table-cell" } }}
                          >
                            {event.location}
                          </TableCell>
                          <TableCell
                            sx={{ display: { xs: "none", md: "table-cell" } }}
                          >
                            {event.group_size}
                          </TableCell>
                          <TableCell
                            sx={{ display: { xs: "none", md: "table-cell" } }}
                          >

                            {event.num_instructors_needed}
                          </TableCell>
                          <TableCell
                            sx={{ display: { xs: "none", md: "table-cell" } }}
                          >
                            {event.num_representatives_needed}
                          </TableCell>
                          <TableCell
                            sx={{ display: { xs: "none", md: "table-cell" } }}
                          >
                            {event.target_audience}
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: {
                                approved: "custom.approved",
                                pending: "custom.pending",
                              }[event.status],
                            }}
                          >
                            {event.status}
                          </TableCell>
                          <TableCell>
                            <Stack direction={{ xs: "column", sm: "row" }}>
                              <IconButton
                                aria-label={t("common.view")}
                                size="small"
                                onClick={() => handleOpenDialog("view", event)}
                              >
                                <PreviewIcon fontSize="inherit" />
                              </IconButton>
                              {user?.permissions === "super_admin" && (
                                <IconButton
                                  aria-label={t("common.edit")}
                                  size="small"
                                  onClick={() =>
                                    handleOpenDialog("edit", event)
                                  }
                                >
                                  <EditIcon fontSize="inherit" />
                                </IconButton>
                              )}
                              <IconButton
                                aria-label={t("common.delete")}
                                size="small"
                                onClick={() =>
                                  handleOpenDialog("delete", event)
                                }
                              >
                                <DeleteIcon fontSize="inherit" />
                              </IconButton>
                            </Stack>
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
      <Dialog open={activeDialog === "edit"} onClose={handleClose} fullWidth>
        {selectedEvent && (
          <EditEventForm onClose={handleClose} initialEvent={selectedEvent} />
        )}
      </Dialog>
      <Dialog open={activeDialog === "delete"} onClose={handleClose} fullWidth>
        <AreYouSure event={selectedEvent} onClose={handleClose} />
      </Dialog>
    </>
  );
}

export default UpcomingEvents;
