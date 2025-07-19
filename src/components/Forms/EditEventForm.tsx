import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useEvents } from "../../hooks";
import { Event, CreateEventRequest } from "../../types";
import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";


export default function EditEventForm({
  onClose,
  initialEvent,
}: {
  onClose: () => void;
  initialEvent: Event;
}) {
  const { i18n } = useTranslation();
  const direction = i18n.language === "he" ? "rtl" : "ltr";
  const { updateEvent } = useEvents();
  const [formData, setFormData] = useState<Omit<CreateEventRequest, "date">>({
    title: initialEvent.title,
    channel: initialEvent.channel,
    language: initialEvent.language,
    location: initialEvent.location,
    target_audience: initialEvent.target_audience,
    group_size: initialEvent.group_size,
    num_instructors_needed: initialEvent.num_instructors_needed,
    num_representatives_needed: initialEvent.num_representatives_needed,
    group_description: initialEvent.group_description,
    additional_notes: initialEvent.additional_notes,
  });

  const [eventDate, setEventDate] = useState<Dayjs>(dayjs(initialEvent.date));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateEvent(initialEvent.id, {
        ...formData,
        date: eventDate.toDate(),
      });
      onClose();
    } catch (err) {
      console.error("Failed to update event:", err);
    }
  };

  return (
  <Box component="form" onSubmit={handleSubmit}>
    <TextField
      label="Title"
      value={formData.title}
      onChange={(e) =>
        setFormData({ ...formData, title: e.target.value })
      }
      fullWidth
      margin="normal"
    />
    <TextField
      label="Channel"
      value={formData.channel}
      onChange={(e) =>
        setFormData({ ...formData, channel: e.target.value })
      }
      fullWidth
      margin="normal"
    />
    <TextField
      label="Language"
      value={formData.language}
      onChange={(e) =>
        setFormData({ ...formData, language: e.target.value })
      }
      fullWidth
      margin="normal"
    />
    <TextField
      label="Location"
      value={formData.location}
      onChange={(e) =>
        setFormData({ ...formData, location: e.target.value })
      }
      fullWidth
      margin="normal"
    />
    <TextField
      label="Target Audience"
      value={formData.target_audience}
      onChange={(e) =>
        setFormData({ ...formData, target_audience: e.target.value })
      }
      fullWidth
      margin="normal"
    />
    <TextField
      label="Group Size"
      type="number"
      value={formData.group_size}
      onChange={(e) =>
        setFormData({ ...formData, group_size: Number(e.target.value) })
      }
      fullWidth
      margin="normal"
    />
    <TextField
      label="Instructors Needed"
      type="number"
      value={formData.num_instructors_needed}
      onChange={(e) =>
        setFormData({
          ...formData,
          num_instructors_needed: Number(e.target.value),
        })
      }
      fullWidth
      margin="normal"
    />
    <TextField
      label="Representatives Needed"
      type="number"
      value={formData.num_representatives_needed}
      onChange={(e) =>
        setFormData({
          ...formData,
          num_representatives_needed: Number(e.target.value),
        })
      }
      fullWidth
      margin="normal"
    />
    <TextField
      label="Group Description"
      value={formData.group_description}
      onChange={(e) =>
        setFormData({ ...formData, group_description: e.target.value })
      }
      fullWidth
      margin="normal"
      multiline
      rows={3}
    />
    <TextField
      label="Additional Notes"
      value={formData.additional_notes}
      onChange={(e) =>
        setFormData({ ...formData, additional_notes: e.target.value })
      }
      fullWidth
      margin="normal"
      multiline
      rows={2}
    />
    <Button type="submit">Save</Button>
  </Box>
  );
}
