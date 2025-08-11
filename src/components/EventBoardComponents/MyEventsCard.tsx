import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { EventStatus, Event } from "../../types";
import { useEvents, useAuth } from "../../hooks";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

function MyEventsCard({
  id,
  title,
  description,
  date,
  location,
  channel,
  group_size,
  language,
  num_instructors_needed,
  num_representatives_needed,
  status,
  registrationStatus,
}: Event) {
  const { unregisterFromEvent, isLoadingUnregisterID } = useEvents();
  const { enqueueSnackbar } = useSnackbar();

  const { t } = useTranslation();

  const { user } = useAuth();
  const isGuide = user?.role === "Guide";
  const isPending = isGuide && registrationStatus === "pending";

  const handleUnregisterButton = async () => {
    try {
      await unregisterFromEvent(id);
      enqueueSnackbar(t("myEventsCard.notifications.unregisteredSuccess"), {
        variant: "success",
      });
    } catch (err: unknown) {
      enqueueSnackbar(
        err instanceof Error
          ? err.message
          : t("myEventsCard.notifications.unregisterFailed"),
        { variant: "error" }
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        alignContent: "center",
        justifyContent: "space-between",
        padding: 3,
        border: "1px solid white",
        borderRadius: "8px",
        backgroundColor: "background.default",
        boxShadow: 3,
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        {description}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        {t("myEventsCard.date")}: {date.toLocaleDateString()}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        {t("myEventsCard.time")}:{" "}
        {date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        {t("myEventsCard.location")}: {location}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        {t("myEventsCard.channel")}: {channel}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        {t("myEventsCard.groupSize")}: {group_size}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        {t("myEventsCard.language")}: {language}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        {t("myEventsCard.instructorsNeeded")}: {num_instructors_needed}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        {t("myEventsCard.representativesNeeded")}: {num_representatives_needed}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        {t("myEventsCard.eventStatus")}:{" "}
        {status === EventStatus.APPROVED
          ? t("common.approved")
          : t("common.pending")}
      </Typography>
      {isGuide && (
        <Typography
          variant="body2"
          sx={{
            marginBottom: 2,
            color: isPending ? "orange" : "green",
            fontWeight: "bold",
          }}
        >
          {t("myEventsCard.myRegistrationStatus")}:{" "}
          {isPending ? t("myEventsCard.pendingApproval") : t("common.approved")}
        </Typography>
      )}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "custom.neutral",
        }}
        disabled={isLoadingUnregisterID === id}
        onClick={handleUnregisterButton}
      >
        {isLoadingUnregisterID === id ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          t("myEventsCard.unregister")
        )}
      </Button>
    </Box>
  );
}

export default MyEventsCard;
