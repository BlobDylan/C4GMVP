import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { Event } from "../../types";
import { useEvents } from "../../hooks";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

function EventBoardCard(event: Event) {
  const { t } = useTranslation();
  const { registerToEvent, isLoadingRegisterID, pendingRegistrations } = useEvents();
  const [isHovered, setIsHovered] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const isPending = pendingRegistrations.some(
    (reg) => reg.eventId === event.id && reg.status === "pending"
  );

  const truncateDescription = (text: string, maxLength: number = 60) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: isHovered ? "600px" : "200px",
        minHeight: "200px",
        alignContent: "center",
        justifyContent: "space-between",
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxSizing: "border-box",
        transition:
          "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), max-height 0.8s cubic-bezier(0.25, 0.1, 0.25, 1.0)",
        boxShadow: isHovered ? "0 6px 12px rgba(0,0,0,0.15)" : "none",
        transform: isHovered ? "translateY(-8px)" : "none",
        overflow: "hidden",
        position: "relative",
        zIndex: isHovered ? 10 : 1,
        backgroundColor: "#fff",
        maxWidth: "100%",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          transition: "margin 0.4s ease",
        }}
      >
        {event.title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          marginBottom: 1,
          transition: "margin 0.4s ease",
        }}
      >
        {event.date.toLocaleDateString()}
        {", "}
        {event.date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          marginBottom: isHovered ? 2 : 0,
          transition: "all 0.5s ease",
        }}
      >
        {isHovered ? event.description : truncateDescription(event.description)}
      </Typography>

      <Box
        sx={{
          maxHeight: isHovered ? "500px" : "0",
          opacity: isHovered ? 1 : 0,
          overflow: "hidden",
          transition: "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0)",
        }}
      >
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          {t("eventBoard.location")}: {event.location}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          {t("eventBoard.channel")}: {event.channel}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          {t("eventBoard.groupSize")}: {event.group_size}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          {t("eventBoard.language")}: {event.language}
        </Typography>
      </Box>

      {isPending ? (
        <Typography
          sx={{
            marginTop: isHovered ? 2 : "auto",
            opacity: isHovered ? 1 : 0,
            color: "orange",
            fontWeight: "bold",
            textAlign: "center",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            pointerEvents: isHovered ? "auto" : "none",
          }}
        >
          {t("eventBoard.pending")}
        </Typography>
      ) : (
        <Button
          variant="contained"
          disabled={isLoadingRegisterID === event.id}
          onClick={async () => {
            try {
              const status = await registerToEvent(event.id);
              enqueueSnackbar(
                status === "pending"
                  ? t("eventBoard.notifications.pendingApproval")
                  : t("eventBoard.notifications.registeredSuccess"),
                { variant: "success" }
              );
            } catch (err: unknown) {
              enqueueSnackbar(
                err instanceof Error
                  ? err.message
                  : t("eventBoard.notifications.registerFailed"),
                { variant: "error" }
              );
            }
          }}
          sx={{
            marginTop: isHovered ? 2 : "auto",
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            pointerEvents: isHovered ? "auto" : "none",
          }}
        >
          {isLoadingRegisterID === event.id ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            t("eventBoard.register")
          )}
        </Button>
      )}
    </Box>
  );
}

export default EventBoardCard;
