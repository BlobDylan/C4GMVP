import { Box, Typography, Stack } from "@mui/material";
import { MyEventCardType, EventStatus } from "../../types";
import { MyEventsCard } from "../../components";

const myEventsSeed: MyEventCardType[] = [
  {
    id: "0",
    title: "Awareness Booth at Tel Aviv University",
    description:
      "Setting up a booth to distribute flyers, answer questions, and engage with students about the hostages' situation.",
    date: new Date("2025-04-25T11:00:00"),
    location: "Tel Aviv University Campus",
    status: EventStatus.APPROVED,
  },
  {
    id: "1",
    title: "Volunteer Visit to Hostage Families",
    description:
      "A small group of volunteers will visit families of the hostages to offer emotional support and assistance with errands or logistics.",
    date: new Date("2025-04-27T16:00:00"),
    location: "Various locations (to be assigned)",
    status: EventStatus.PENDING,
  },
];

function MyEvents() {
  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "background.paper",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: 2 }}>
          My Events
        </Typography>
        <Stack
          spacing={3}
          sx={{
            justifyContent: "center",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {myEventsSeed.map((event) => (
            <MyEventsCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              date={event.date}
              location={event.location}
              status={event.status}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default MyEvents;
