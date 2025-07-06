import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addWeeks,
  subWeeks,
  isSameDay,
  isToday,
} from "date-fns";
import {
  IconButton,
  Button,
  Stack,
  Typography,
  Paper,
  Box,
  Dialog,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { EventStatus, Event } from "../../types";
import { useState } from "react";
import { useEvents } from "../../hooks";

import { EventDialog } from "../";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = (event: Event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const onWeekChange = (date: Date) => {
    setCurrentDate(date);
  };

  const handlePreviousWeek = () => {
    onWeekChange(subWeeks(currentDate, 1));
  };

  const handleNextWeek = () => {
    onWeekChange(addWeeks(currentDate, 1));
  };

  const { events } = useEvents();

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
          <Typography variant="h3" sx={{ marginBottom: 2, textAlign: "center" }}>
            Weekly Calendar
          </Typography>
          <Stack
            direction={isMobile ? "column" : "row"}
            justifyContent="space-between"
            alignItems={isMobile ? "center" : "center"}
            mb={2}
            spacing={isMobile ? 2 : 0}
            sx={{ width: "100%" }}
          >
            <Typography variant="h6" color="white" sx={{ textAlign: { xs: "center", sm: "left" } }}>
              {format(weekStart, "MMMM d")} - {format(weekEnd, "MMMM d, yyyy")}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton onClick={handlePreviousWeek} size={isMobile ? "small" : "medium"}>
                <ChevronLeftIcon />
              </IconButton>
              <Button
                onClick={() => onWeekChange(new Date())}
                variant="contained"
                color="warning"
                size={isMobile ? "small" : "medium"}
              >
                Today
              </Button>
              <IconButton onClick={handleNextWeek} size={isMobile ? "small" : "medium"}>
                <ChevronRightIcon />
              </IconButton>
            </Stack>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(7, 1fr)", sm: "repeat(7, 1fr)" },
              gap: { xs: 1, sm: 2 },
              width: "100%",
            }}
          >
            {days.map((day) => {
              const dayEvents = events.filter((event) => {
                return isSameDay(new Date(event.date), day);
              });

              return (
                <Paper
                  key={day.toString()}
                  sx={{
                    padding: { xs: 1, sm: 2 },
                    minHeight: { xs: "80px", sm: "120px" },
                    backgroundColor: isToday(day) ? "custom.pending" : "background.default",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    sx={{
                      fontWeight: isToday(day) ? "bold" : "normal",
                      textAlign: "center",
                      marginBottom: 1,
                    }}
                  >
                    {format(day, "EEE")}
                  </Typography>
                  <Typography
                    variant={isMobile ? "caption" : "body2"}
                    sx={{
                      fontWeight: isToday(day) ? "bold" : "normal",
                      textAlign: "center",
                      marginBottom: 1,
                    }}
                  >
                    {format(day, "d")}
                  </Typography>
                  <Box>
                    {dayEvents
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .map((event) => (
                        <Box
                          key={event.id}
                          sx={{
                            borderRadius: "5px",
                            padding: { xs: 0.5, sm: 1 },
                            margin: { xs: 0.25, sm: 0.5 },
                            backgroundColor:
                              event.status === EventStatus.PENDING
                                ? "custom.pending"
                                : "custom.approved",
                            fontSize: { xs: "0.7rem", sm: "0.875rem" },
                          }}
                          onClick={() => handleOpen(event)}
                          className="cursor-pointer"
                        >
                          <Typography color="black" sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>
                            {format(new Date(event.date), "HH:mm")}
                          </Typography>
                          <Typography color="black" sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>
                            {event.title}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                </Paper>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={handleClose} fullWidth>
        <EventDialog event={selectedEvent} onClose={handleClose} />
      </Dialog>
    </>
  );
}

export default Calendar;
