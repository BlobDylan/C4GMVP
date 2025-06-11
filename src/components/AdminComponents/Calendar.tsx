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
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { EventStatus, Event } from "../../types";
import { useState } from "react";
import { useEvents } from "../../hooks";
import { he } from "date-fns/locale";

import { EventDialog } from "../";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "background.paper",
            padding: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" sx={{ marginBottom: 2 }}>
            לוח שבועי
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              mb: 2,
            }}
          >
            <Typography variant="h6" color="white">
              {format(weekStart, "d MMMM", { locale: he })} - {format(weekEnd, "d MMMM, yyyy", { locale: he })}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton onClick={handlePreviousWeek}>
                <ChevronLeftIcon />
              </IconButton>
              <Button
                onClick={() => onWeekChange(new Date())}
                variant="contained"
              >
                היום
              </Button>
              <IconButton onClick={handleNextWeek}>
                <ChevronRightIcon />
              </IconButton>
            </Stack>
          </Box>

          <Box className="grid grid-cols-7 gap-1">
            {["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"].map((day) => (
              <Paper
                key={day}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  minWidth: "13dvw",
                }}
              >
                {day}
              </Paper>
            ))}
            {days.map((day) => {
              const dayEvents = events.filter((event) => {
                return isSameDay(event.date, day);
              });

              return (
                <Paper
                  key={day.toISOString()}
                  sx={{
                    minHeight: "50vh",
                    minWidth: "13dvw",
                    backgroundColor: isToday(day)
                      ? "background.paper"
                      : "background.default",
                  }}
                  elevation={3}
                >
                  <Typography>{format(day, "d")}</Typography>
                  <Box>
                    {dayEvents
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .map((event) => (
                        <Box
                          key={event.id}
                          sx={{
                            borderRadius: "5px",
                            padding: 1,
                            margin: 0.5,
                            backgroundColor:
                              event.status === EventStatus.PENDING
                                ? "custom.pending"
                                : "custom.approved",
                          }}
                          onClick={() => handleOpen(event)}
                          className="cursor-pointer"
                        >
                          <Typography color="black">
                            {format(new Date(event.date), "HH:mm")}
                          </Typography>
                          <Typography color="black">{event.title}</Typography>
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
