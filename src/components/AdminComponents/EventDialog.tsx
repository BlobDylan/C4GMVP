import { useState } from "react";
import { Event, EventStatus } from "../../types";
import { Box, Typography, Button } from "@mui/material";
import { useEvents } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import RegistrationDialog from "./RegistrationApprovalDialog";
import { useTranslation } from "react-i18next";

interface EventDialogProps {
  event: Event | null;
  onClose: () => void;
}

function EventDialog({ event, onClose }: EventDialogProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] =
    useState(false);

  const handleOpenRegistrationDialog = () => {
    setIsRegistrationDialogOpen(true);
  };

  const handleCloseRegistrationDialog = () => {
    setIsRegistrationDialogOpen(false);
  };

  if (!event) return null;

  const { approveEvent, unapproveEvent } = useEvents();

  const handleClick = async () => {
    if (event.status === EventStatus.APPROVED) {
      await unapproveEvent(event.id);
    } else {
      await approveEvent(event.id);
    }
    onClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {event.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {event.description}
      </Typography>
      <Typography variant="body2">
        {t("eventDialog.date")}: {event.date.toLocaleDateString()}
      </Typography>
      <Typography variant="body2" paragraph>
        {t("eventDialog.time")}:{" "}
        {event.date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
      <Typography variant="body2" paragraph>
        {t("eventDialog.channel")}: {event.channel}
      </Typography>
      <Typography variant="body2" paragraph>
        {t("eventDialog.language")}: {event.language}
      </Typography>
      <Typography variant="body2" paragraph>
        {t("eventDialog.groupSize")}: {event.group_size}
      </Typography>
      <Typography variant="body2" paragraph>
        {t("eventDialog.instructorsNeeded")}: {event.num_instructors_needed}
      </Typography>
      <Typography variant="body2" paragraph>
        {t("eventDialog.representativesNeeded")}:{" "}
        {event.num_representatives_needed}
      </Typography>
      <Typography variant="body2" paragraph>
        {t("eventDialog.location")}: {event.location}
      </Typography>
      <Typography variant="body2" paragraph>
        {t("eventDialog.status")}: {event.status}
      </Typography>
      <Typography variant="body2" paragraph>
        {t("eventDialog.contactPhoneNumber")}:{" "}
        {event.contact_phone_number || "N/A"}
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 2, gap: 2 }}
      >
        {user && ["admin", "super_admin"].includes(user.permissions) && (
          <>
            <Button
              variant="contained"
              onClick={handleClick}
              sx={{
                backgroundColor:
                  event.status === EventStatus.APPROVED
                    ? "custom.unassigned"
                    : "custom.approved",
              }}
            >
              {event.status === EventStatus.APPROVED
                ? t("eventDialog.unapprove")
                : t("eventDialog.approve")}
            </Button>
            <Button variant="contained" onClick={handleOpenRegistrationDialog}>
              {t("eventDialog.manageRegistrations")}
            </Button>
          </>
        )}
        <Button variant="contained" onClick={onClose}>
          {t("common.close")}
        </Button>
      </Box>
      {user && ["admin", "super_admin"].includes(user.permissions) && (
        <RegistrationDialog
          open={isRegistrationDialogOpen}
          eventId={event.id}
          onClose={handleCloseRegistrationDialog}
        />
      )}
    </Box>
  );
}

export default EventDialog;
