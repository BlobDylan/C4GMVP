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
    { label: "Email", value: "Email" },
    { label: "Phone", value: "Phone" },
    { label: "WhatsApp", value: "WhatsApp" },
    { label: "Telegram", value: "Telegram" },
    { label: "Zoom", value: "Zoom" },
    { label: "Other", value: "Other" },
  ];

  const languages = [
    { label: "Hebrew", value: "Hebrew" },
    { label: "English", value: "English" },
    { label: "Arabic", value: "Arabic" },
    { label: "Russian", value: "Russian" },
    { label: "French", value: "French" },
    { label: "Spanish", value: "Spanish" },
    { label: "German", value: "German" },
    { label: "Italian", value: "Italian" },
    { label: "Portuguese", value: "Portuguese" },
    { label: "Amharic", value: "Amharic" },
    { label: "Tigrinya", value: "Tigrinya" },
    { label: "Other", value: "Other" },
  ];

  const locations = [
    { label: "Jerusalem", value: "Jerusalem" },
    { label: "Tel Aviv", value: "Tel Aviv" },
    { label: "Haifa", value: "Haifa" },
    { label: "Be'er Sheva", value: "Be'er Sheva" },
    { label: "North", value: "North" },
    { label: "Center", value: "Center" },
    { label: "South", value: "South" },
    { label: "Judea and Samaria", value: "Judea and Samaria" },
    { label: "Jezreel Valley", value: "Jezreel Valley" },
    { label: "Galilee", value: "Galilee" },
    { label: "Negev", value: "Negev" },
    { label: "Other", value: "Other" },
  ];

  const targetAudiences = [
    { label: "North American Community", value: "North American Community" },
    { label: "Secular", value: "Secular" },
    { label: "Traditional", value: "Traditional" },
    { label: "Religious", value: "Religious" },
    { label: "Ultra-Orthodox", value: "Ultra-Orthodox" },
    { label: "New Immigrants", value: "New Immigrants" },
    { label: "Ethiopian Community", value: "Ethiopian Community" },
    { label: "Russian Community", value: "Russian Community" },
    { label: "French Community", value: "French Community" },
    { label: "Arabs", value: "Arabs" },
    { label: "Druze", value: "Druze" },
    { label: "Bedouin", value: "Bedouin" },
    { label: "Youth", value: "Youth" },
    { label: "Seniors", value: "Seniors" },
    { label: "Families", value: "Families" },
    { label: "Individuals", value: "Individuals" },
    { label: "Other", value: "Other" },
  ];

  const [formData, setFormData] = useState<Omit<CreateEventRequest, "date">>({
    title: "",
    channel: channels[0].value,
    language: languages[0].value,
    location: locations[0].value,
    target_audience: targetAudiences[0].value,
    group_size: 0,
    num_instructors_needed: 0,
    num_representatives_needed: 0,
    group_description: "",
    additional_notes: "",
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
        select
        value={formData.location}
        onChange={handleChange}
        required
      >
        {locations.map((l) => (
          <MenuItem key={l.value} value={l.value}>
            {l.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Target Audience"
        name="target_audience"
        select
        value={formData.target_audience}
        onChange={handleChange}
        required
        margin="normal"
      >
        {targetAudiences.map((t) => (
          <MenuItem key={t.value} value={t.value}>
            {t.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Group Description"
        name="group_description"
        onChange={handleChange}
        margin="normal"
        multiline
        minRows={2}
      />

      <TextField
        fullWidth
        label="Additional Notes"
        name="additional_notes"
        onChange={handleChange}
        margin="normal"
        multiline
        minRows={2}
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
