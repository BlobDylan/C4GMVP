import { Box, Grid, Typography } from "@mui/material";
import {
  EventBoardCard,
  EventBoardCardSkeleton,
  FilterBar,
} from "../../components";
import { useEvents } from "../../hooks";

function AvailableEvents() {
  const { events, myEvents, isLoading, filteredEvents } = useEvents();
  const numCardsToLoad = 4;

  return (
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
        אירועים זמינים
      </Typography>
      <FilterBar />
      <Grid
        container
        columns={{ xs: 12 }}
        spacing={2}
        sx={{
          width: "100%",
          flexGrow: 1,
        }}
      >
        {isLoading
          ? Array.from({ length: numCardsToLoad }, (_, index) => (
              <Grid key={index}>
                <EventBoardCardSkeleton />
              </Grid>
            ))
          : filteredEvents
              .filter(
                (event) => !myEvents.some((myEvent) => myEvent.id === event.id)
              )
              .map((event) => (
                <Grid key={event.id} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                  <EventBoardCard {...event} />
                </Grid>
              ))}
      </Grid>
    </Box>
  );
}

export default AvailableEvents;
