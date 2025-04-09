import { Stack, Box, Typography } from "@mui/material";
import { Event } from "../types";
import "rsuite/dist/rsuite.min.css";

export function MyEvents({ events }: { events: Event[] }) {
  const userName = "John Doe"; // Replace with actual user name logic
  const userEvents = events.filter((event) =>
    event.assignedPeople.includes(userName)
  );

  return (
    <div className="bg-black p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-white mb-4">My Events</h2>
      <Stack>
        {userEvents.map((event) => (
          <Box
            key={event.id}
            sx={{
              backgroundColor:
                event.assignedPeople.length > 1 ? "#ffdf20" : "#86efac",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "8px",
              transition: "all 0.9s ease",
              "&:hover .description": {
                opacity: 1,
                maxHeight: "200px",
              },
            }}
          >
            <Typography variant="h6" color="black">
              {event.title}
            </Typography>
            <Typography variant="body2" color="black">
              {event.date.toLocaleTimeString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Typography>
            <Typography
              variant="body2"
              color="black"
              sx={{
                opacity: 0,
                maxHeight: 0,
                overflow: "hidden",
                transition: "all 0.3s ease",
                mt: 1,
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
              }}
              className="description"
            >
              {event.description}
            </Typography>
          </Box>
        ))}
        {userEvents.length === 0 && (
          <Box
            sx={{
              backgroundColor: "#1f2937",
              padding: "16px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="white">
              No events available.
            </Typography>
          </Box>
        )}
      </Stack>
    </div>
  );
}
