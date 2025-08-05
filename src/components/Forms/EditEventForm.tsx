import { useState, SyntheticEvent } from "react";
import { Box, Button, TextField, IconButton, Fab, Snackbar, SnackbarCloseReason, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import { useEvents } from "../../hooks";
import { Event, CreateEventRequest } from "../../types";
import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import {
    DateTimePicker,
    LocalizationProvider
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface EditEventFormProps {
    onClose: () => void;
    initialEvent: Event;
}

export default function EditEventForm({ onClose, initialEvent }: EditEventFormProps) {
    const { i18n, t } = useTranslation();
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
        contact_phone_number: initialEvent.contact_phone_number ?? "",
    });

    const [eventDate, setEventDate] = useState<Dayjs>(dayjs(initialEvent.date));

    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateEvent(initialEvent.id, {
                ...formData,
                date: eventDate.toDate(),
            });
            setSnackbarOpen(true); // Show success message
            // Optionally, you can call onClose() after a delay if you want to close the form automatically
        } catch (err) {
            console.error("Failed to update event:", err);
        }
    };

    const handleSnackbarClose = (
        _event: SyntheticEvent<any> | globalThis.Event,
        reason: SnackbarCloseReason
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleAlertClose = () => {
    setSnackbarOpen(false);
    };

    // Floating language toggle button
    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === "he" ? "en" : "he");
    };

    // Real labels for specific fields
    const phoneLabel = t("editForm.phone");
    const groupDescLabel = t("editForm.groupDescription");
    const notesLabel = t("editForm.additionalNotes");
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    position: "relative",
                    direction: direction,
                    textAlign: direction === "rtl" ? "right" : "left",
                }}
                dir={direction}
            >
                {/* Exit Button */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1,
                    }}
                    aria-label={t("common.exit") || "Exit"}
                >
                    <CloseIcon />
                </IconButton>

                {/* Floating Language Toggle Button */}
                <Fab
                    color="primary"
                    size="small"
                    onClick={toggleLanguage}
                    sx={{
                        position: "fixed",
                        bottom: 24,
                        right: 24,
                        zIndex: 2000,
                        direction: "ltr"
                    }}
                    aria-label={i18n.language === "he" ? "English" : "עברית"}
                >
                    <LanguageIcon />
                </Fab>

                <TextField
                    label={t("upcomingEvents.table.title")}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    fullWidth
                    slotProps={{ input: { dir: direction } }}
                />

                <TextField
                    label={t("upcomingEvents.table.channel")}
                    value={formData.channel}
                    onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                    fullWidth
                    slotProps={{ input: { dir: direction } }}
                />

                <TextField
                    label={t("upcomingEvents.table.language")}
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    fullWidth
                    slotProps={{ input: { dir: direction } }}
                />

                <TextField
                    label={t("upcomingEvents.table.location")}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    fullWidth
                    slotProps={{ input: { dir: direction } }}
                />

                <DateTimePicker
                    label={`${t("upcomingEvents.table.date")} & ${t("upcomingEvents.table.time")}`}
                    value={eventDate}
                    onChange={(newValue) => newValue && setEventDate(newValue)}
                    slotProps={{ textField: { fullWidth: true, inputProps: { dir: direction } } }}
                />

                <TextField
                    label={t("upcomingEvents.table.groupSize")}
                    type="number"
                    value={formData.group_size}
                    onChange={(e) => setFormData({ ...formData, group_size: Number(e.target.value) })}
                    fullWidth
                    slotProps={{ input: { dir: direction } }}
                />

                <TextField
                    label={t("upcomingEvents.table.instructorsNeeded")}
                    type="number"
                    value={formData.num_instructors_needed}
                    onChange={(e) =>
                        setFormData({ ...formData, num_instructors_needed: Number(e.target.value) })
                    }
                    fullWidth
                    slotProps={{ input: { dir: direction } }}
                />

                <TextField
                    label={t("upcomingEvents.table.representativesNeeded")}
                    type="number"
                    value={formData.num_representatives_needed}
                    onChange={(e) =>
                        setFormData({ ...formData, num_representatives_needed: Number(e.target.value) })
                    }
                    fullWidth
                    slotProps={{ input: { dir: direction } }}
                />

                <TextField
                    label={t("upcomingEvents.table.targetAudience")}
                    value={formData.target_audience}
                    onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                    fullWidth
                    slotProps={{ input: { dir: direction } }}
                />

                <TextField
                    label={phoneLabel}
                    value={formData.contact_phone_number}
                    onChange={(e) => setFormData({ ...formData, contact_phone_number: e.target.value })}
                    fullWidth
                    slotProps={{ input: { dir: direction } }}
                />

                <TextField
                    label={groupDescLabel}
                    value={formData.group_description}
                    onChange={(e) => setFormData({ ...formData, group_description: e.target.value })}
                    fullWidth
                    multiline
                    rows={3}
                    slotProps={{ input: { dir: direction } }}
                />

                <TextField
                    label={notesLabel}
                    value={formData.additional_notes}
                    onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                    fullWidth
                    multiline
                    rows={2}
                    slotProps={{ input: { dir: direction } }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: "#4caf50",
                        color: "#fff",
                        "&:hover": {
                            backgroundColor: "#388e3c",
                        },
                    }}
                >
                    {t("save")}
                </Button>

                {/* Snackbar for success message */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: direction === "rtl" ? "left" : "right",
                    }}
                >
                    <Alert
                        onClose={handleAlertClose}
                        severity="success"
                        sx={{ width: "100%", direction: direction, textAlign: direction === "rtl" ? "right" : "left" }}
                    >
                        {i18n.language === "he" ? "האירוע נשמר בהצלחה!" : "Event saved successfully!"}
                    </Alert>
                </Snackbar>
            </Box>
        </LocalizationProvider>
    );
}
