import {
  Box,
  Typography,
  Button,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Event } from "../../types";
import { useEvents } from "../../hooks";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

function EventBoardCard(event: Event) {
  const { t } = useTranslation();
  const { registerToEvent, isLoadingRegisterID, pendingRegistrations } =
    useEvents();
  const [isHovered, setIsHovered] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isPending = pendingRegistrations.some(
    (reg) => reg.eventId === event.id && reg.status === "pending"
  );

  const truncateDescription = (
    text: string,
    maxLength: number = isMobile ? 80 : 60
  ) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: isHovered && !isMobile ? "600px" : "200px",
        minHeight: isMobile ? "300px" : "200px",
        alignContent: "center",
        justifyContent: "space-between",
        padding: { xs: 1.5, sm: 2 },
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxSizing: "border-box",
        transition: isMobile
          ? "box-shadow 0.3s ease"
          : "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), max-height 0.8s cubic-bezier(0.25, 0.1, 0.25, 1.0)",
        boxShadow: isHovered ? "0 6px 12px rgba(0,0,0,0.15)" : "none",
        transform: isHovered && !isMobile ? "translateY(-8px)" : "none",
        overflow: "hidden",
        position: "relative",
        zIndex: isHovered ? 10 : 1,
        backgroundColor: "#fff",
        maxWidth: "100%",
        cursor: "default",
      }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={() => isMobile && setIsHovered(!isHovered)}
    >
      <Typography
        variant={isMobile ? "h6" : "h6"}
        sx={{
          fontWeight: "bold",
          transition: "margin 0.4s ease",
          fontSize: { xs: "1.1rem", sm: "1.25rem" },
          mb: 1,
        }}
      >
        {event.title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          marginBottom: 1,
          transition: "margin 0.4s ease",
          fontSize: { xs: "0.875rem", sm: "1rem" },
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
          marginBottom: isHovered || isMobile ? 2 : 0,
          transition: "all 0.5s ease",
          fontSize: { xs: "0.9rem", sm: "1rem" },
        }}
      >
        {isHovered || isMobile
          ? event.description
          : truncateDescription(event.description)}
      </Typography>

      <Box
        sx={{
          maxHeight: isHovered || isMobile ? "500px" : "0",
          opacity: isHovered || isMobile ? 1 : 0,
          overflow: "hidden",
          transition: "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0)",
        }}
      >
        <Typography
          variant="body2"
          sx={{ marginBottom: 1, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
        >
          {t("eventBoard.location")}: {event.location}
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: 1, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
        >
          {t("eventBoard.channel")}: {event.channel}
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: 1, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
        >
          {t("eventBoard.groupSize")}: {event.group_size}
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: 1, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
        >
          {t("eventBoard.language")}: {event.language}
        </Typography>
      </Box>

      {isPending ? (
        <Typography
          sx={{
            marginTop: isHovered || isMobile ? 2 : "auto",
            opacity: isHovered || isMobile ? 1 : 0,
            color: "orange",
            fontWeight: "bold",
            textAlign: "center",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            pointerEvents: isHovered || isMobile ? "auto" : "none",
            fontSize: { xs: "0.9rem", sm: "1rem" },
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
            marginTop: isHovered || isMobile ? 2 : "auto",
            opacity: isHovered || isMobile ? 1 : 0,
            transform:
              isHovered || isMobile ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            pointerEvents: isHovered || isMobile ? "auto" : "none",
            fontSize: { xs: "0.875rem", sm: "1rem" },
            padding: { xs: "8px 16px", sm: "10px 20px" },
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
