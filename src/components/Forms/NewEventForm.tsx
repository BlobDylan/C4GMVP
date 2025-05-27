import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import { useEvents } from "../../hooks";
import { CreateEventRequest } from "../../types";

function NewEventForm({ onClose }: { onClose: () => void }) {
  const { createEvent } = useEvents();

  const channels = [
    { label: "Example Channel 1", value: "Example Channel 1" },
    { label: "Example Channel 2", value: "Example Channel 2" },
    { label: "Example Channel 3", value: "Example Channel 3" },
  ];

  const languages = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Hebrew", value: "zh" },
  ];

  const [formData, setFormData] = useState<Omit<CreateEventRequest, "date">>({
    title: "",
    description: "",
    channel: channels[0].value,
    language: languages[0].value,
    location: "",
    group_size: 0,
    num_instructors_needed: 0,
    num_representatives_needed: 0,
  });

  const [eventDate, setEventDate] = useState<Dayjs>(dayjs());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("num_") || name === "group_size" ? +value : value,
    }));
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setEventDate((prev) => newDate.hour(prev.hour()).minute(prev.minute()));
    }
  };

  const handleTimeChange = (newTime: Dayjs | null) => {
    if (newTime) {
      setEventDate((prev) =>
        prev.hour(newTime.hour()).minute(newTime.minute())
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData: CreateEventRequest = {
      ...formData,
      date: eventDate.toDate(),
    };
    try {
      console.log("Submitting event data:", submissionData);
      await createEvent(submissionData);
    } catch (err) {
      console.error("Failed to create event:", err);
    }
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={3}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Create a New Event
      </Typography>

      <TextField
        fullWidth
        label="Title"
        name="title"
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Description"
        name="description"
        onChange={handleChange}
        margin="normal"
        multiline
        required
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", gap: 2, my: 2 }}>
          <DatePicker
            label="Date"
            value={eventDate}
            onChange={handleDateChange}
            sx={{ flex: 1 }}
          />
          <TimePicker
            label="Time"
            value={eventDate}
            onChange={handleTimeChange}
            sx={{ flex: 1 }}
          />
        </Box>
      </LocalizationProvider>

      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <TextField
          fullWidth
          label="Channel"
          name="channel"
          select
          value={formData.channel}
          onChange={handleChange}
          required
        >
          {channels.map((c) => (
            <MenuItem key={c.value} value={c.value}>
              {c.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Language"
          name="language"
          select
          value={formData.language}
          onChange={handleChange}
          required
        >
          {languages.map((l) => (
            <MenuItem key={l.value} value={l.value}>
              {l.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <TextField
        fullWidth
        label="Location"
        name="location"
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Group Size"
        name="group_size"
        type="number"
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Number of Instructors Needed"
        name="num_instructors_needed"
        type="number"
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Number of Representatives Needed"
        name="num_representatives_needed"
        type="number"
        onChange={handleChange}
        margin="normal"
        required
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
}

export default NewEventForm;
