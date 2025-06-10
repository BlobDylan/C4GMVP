import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { Event } from "../../types";
import { useEvents } from "../../hooks";
import { useState } from "react";

function EventBoardCard(event: Event) {
  const { registerToEvent, isLoadingRegisterID } = useEvents();
  const [isHovered, setIsHovered] = useState(false);

  const truncateDescription = (text: string, maxLength: number = 60) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
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
          Location: {event.location}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          Channel: {event.channel}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          Group Size: {event.group_size}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          Language: {event.language}
        </Typography>
      </Box>

      <Button
        variant="contained"
        disabled={isLoadingRegisterID === event.id}
        onClick={() => registerToEvent(event.id)}
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
          "Register"
        )}
      </Button>
    </Box>
  );
}

export default EventBoardCard;
