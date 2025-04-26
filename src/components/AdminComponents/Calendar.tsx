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
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { EventStatus } from "../../types";
import { useState } from "react";
import { useEvents } from "../../hooks";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

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
          Weekly Calendar
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" color="white">
            {format(weekStart, "MMMM d")} - {format(weekEnd, "MMMM d, yyyy")}
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton onClick={handlePreviousWeek}>
              <ChevronLeftIcon />
            </IconButton>
            <Button
              onClick={() => onWeekChange(new Date())}
              variant="contained"
              color="warning"
            >
              Today
            </Button>
            <IconButton onClick={handleNextWeek}>
              <ChevronRightIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Box className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
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
            const dayEvents = events.filter((event) =>
              isSameDay(new Date(event.date), day)
            );

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
  );
}

export default Calendar;
