import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import { useSnackbar } from "notistack";
import { useEvents } from "../../hooks";
import { CreateEventRequest } from "../../types";
import { useTranslation } from "react-i18next";

function NewEventForm({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const { createEvent } = useEvents();
  const { enqueueSnackbar } = useSnackbar();

  const channels = [
    { label: t("newEvent.channels.hostagesSquare"), value: "Hostages Square" },
    { label: t("newEvent.channels.businessSector"), value: "Business Sector" },
    { label: t("newEvent.channels.donations"), value: "Donations" },
    {
      label: t("newEvent.channels.religiousZionism"),
      value: "Religious Zionism",
    },
    { label: t("newEvent.channels.virtual"), value: "Virtual" },
  ];

  const languages = [
    { label: t("newEvent.languages.hebrew"), value: "Hebrew" },
    { label: t("newEvent.languages.english"), value: "English" },
    { label: t("newEvent.languages.arabic"), value: "Arabic" },
    { label: t("newEvent.languages.russian"), value: "Russian" },
    { label: t("newEvent.languages.french"), value: "French" },
    { label: t("newEvent.languages.spanish"), value: "Spanish" },
    { label: t("newEvent.languages.other"), value: "Other" },
  ];

  const locations = [
    { label: t("newEvent.locations.hostagesSquare"), value: "Hostages Square" },
    { label: t("newEvent.locations.zoom"), value: "Zoom" },
    { label: t("newEvent.locations.north"), value: "North" },
    { label: t("newEvent.locations.south"), value: "South" },
    { label: t("newEvent.locations.offices"), value: "Offices" },
    { label: t("newEvent.locations.jerusalem"), value: "Jerusalem" },
    { label: t("newEvent.locations.center"), value: "Center" },
    { label: t("newEvent.locations.shfela"), value: "Shfela" },
    {
      label: t("newEvent.locations.acrossGreenLine"),
      value: "Across the green line",
    },
  ];

  const targetAudiences = [
    {
      label: t("newEvent.targetAudiences.religiousSector"),
      value: "Religious Sector",
    },
    { label: t("newEvent.targetAudiences.highSchools"), value: "High Schools" },
    {
      label: t("newEvent.targetAudiences.universities"),
      value: "Universities",
    },
    {
      label: t("newEvent.targetAudiences.businessSector"),
      value: "Business Sector",
    },
    { label: t("newEvent.targetAudiences.army"), value: "Army" },
    { label: t("newEvent.targetAudiences.donors"), value: "Donors" },
  ];

  const [formData, setFormData] = useState<Omit<CreateEventRequest, "date">>({
    title: "",
    description: "",
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
      enqueueSnackbar(t("newEvent.createSuccess"), { variant: "success" });
    } catch (err) {
      console.error("Failed to create event:", err);
      enqueueSnackbar(t("newEvent.createError"), { variant: "error" });
    }
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={3}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {t("newEvent.createNewEvent")}
      </Typography>

      <TextField
        fullWidth
        label={t("newEvent.title")}
        name="title"
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label={t("newEvent.description")}
        name="description"
        onChange={handleChange}
        margin="normal"
        multiline
        required
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", gap: 2, my: 2 }}>
          <DatePicker
            label={t("newEvent.date")}
            value={eventDate}
            onChange={handleDateChange}
            sx={{ flex: 1 }}
          />
          <TimePicker
            label={t("newEvent.time")}
            value={eventDate}
            onChange={handleTimeChange}
            sx={{ flex: 1 }}
          />
        </Box>
      </LocalizationProvider>

      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <TextField
          fullWidth
          label={t("newEvent.channel")}
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
          label={t("newEvent.language")}
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
        label={t("newEvent.location")}
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
        label={t("newEvent.targetAudience")}
        name="target_audience"
        select
        value={formData.target_audience}
        onChange={handleChange}
        required
        margin="normal"
      >
        {targetAudiences.map((tgt) => (
          <MenuItem key={tgt.value} value={tgt.value}>
            {tgt.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label={t("newEvent.groupDescription")}
        name="group_description"
        onChange={handleChange}
        margin="normal"
        multiline
        minRows={2}
      />

      <TextField
        fullWidth
        label={t("newEvent.contactPhoneNumber")}
        name="contact_phone_number"
        onChange={handleChange}
        margin="normal"
        type="tel"
        minRows={2}
      />

      <TextField
        fullWidth
        label={t("newEvent.groupSize")}
        name="group_size"
        type="number"
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label={t("newEvent.numInstructorsNeeded")}
        name="num_instructors_needed"
        type="number"
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label={t("newEvent.numRepresentativesNeeded")}
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
        {t("newEvent.submit")}
      </Button>
    </Box>
  );
}

export default NewEventForm;
