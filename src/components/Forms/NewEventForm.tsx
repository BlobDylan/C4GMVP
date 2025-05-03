import { Box, Button, TextField, Typography } from "@mui/material";
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
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: dayjs(),
    location: "",
    spotsAvailable: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Form submitted: ", {
        ...formData,
        date: formData.date.toDate(),
      });
      await createEvent({
        ...formData,
        date: formData.date.toDate(),
      } as CreateEventRequest);
    } catch (err) {}
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      const newDate = newValue
        .hour(formData.date.hour())
        .minute(formData.date.minute());
      setFormData((prev) => ({ ...prev, date: newDate }));
    }
  };

  const handleTimeChange = (newValue: Dayjs | null) => {
    if (newValue) {
      const newDate = formData.date
        .hour(newValue.hour())
        .minute(newValue.minute());
      setFormData((prev) => ({ ...prev, date: newDate }));
    }
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
            value={formData.date}
            onChange={handleDateChange}
            sx={{ flex: 1 }}
          />
          <TimePicker
            label="Time"
            value={formData.date}
            onChange={handleTimeChange}
            sx={{ flex: 1 }}
          />
        </Box>
      </LocalizationProvider>
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
        label="Spots Available"
        name="spotsAvailable"
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
