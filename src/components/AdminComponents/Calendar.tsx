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
import { he, enUS } from "date-fns/locale";
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
import { EventDialog } from "../";
import { useTranslation } from "react-i18next";

function Calendar() {
  const { t, i18n } = useTranslation();
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

  // קובע את ה־locale לפי השפה הפעילה
  const getLocale = () => {
    switch (i18n.language) {
      case "he":
        return he;
      case "en":
        return enUS;
      default:
        return enUS;
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", padding: 2 }}>
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
            {t("calendar.weeklyCalendar")}
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
              {format(weekStart, "d MMMM", { locale: getLocale() })} -{" "}
              {format(weekEnd, "d MMMM yyyy", { locale: getLocale() })}
            </Typography>
            <Stack direction="row" spacing={1}>
              {i18n.language === "he" ? (
                <IconButton onClick={handlePreviousWeek}>
                  <ChevronRightIcon />
                </IconButton>
              ) : (
                <IconButton onClick={handlePreviousWeek}>
                  <ChevronLeftIcon />
                </IconButton>
              )}
              <Button
                onClick={() => onWeekChange(new Date())}
                variant="contained"
              >
                {t("calendar.today")}
              </Button>
              {i18n.language === "he" ? (
                <IconButton onClick={handleNextWeek}>
                  <ChevronLeftIcon />
                </IconButton>
              ) : (
                <IconButton onClick={handleNextWeek}>
                  <ChevronRightIcon />
                </IconButton>
              )}
            </Stack>
          </Box>

          <Box className="grid grid-cols-7 gap-1">
            {t("calendar.days", { returnObjects: true }).map(
              (day: string, index: number) => (
                <Paper
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    minWidth: "13dvw",
                  }}
                >
                  {day}
                </Paper>
              )
            )}
            {days.map((day) => {
              const dayEvents = events.filter((event) =>
                isSameDay(event.date, day)
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
                  <Typography>
                    {format(day, "d", { locale: getLocale() })}
                  </Typography>
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
                            {format(new Date(event.date), "HH:mm", {
                              locale: getLocale(),
                            })}
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
