import { Box, Grid, Typography } from "@mui/material";
import {
  EventBoardCard,
  EventBoardCardSkeleton,
  FilterBar,
} from "../../components";
import { useEvents } from "../../hooks";
import { useTranslation } from "react-i18next";

function AvailableEvents() {
  const { t } = useTranslation();
  const { events, myEvents, isLoading, filteredEvents } = useEvents();
  const numCardsToLoad = 4;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "background.paper",
        padding: { xs: 2, sm: 4 },
        borderRadius: 2,
      }}
    >
      <Typography 
        variant="h3" 
        sx={{ 
          marginBottom: 2,
          fontSize: { xs: "1.75rem", sm: "2.125rem", md: "3rem" },
          textAlign: "center",
        }}
      >
        {t("availableEvents.title")}
      </Typography>
      <FilterBar />
      <Grid
        container
        columns={{ xs: 12 }}
        spacing={{ xs: 2, sm: 3 }}
        sx={{
          width: "100%",
          flexGrow: 1,
        }}
      >
        {isLoading
          ? Array.from({ length: numCardsToLoad }, (_, index) => (
              <Grid key={index} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                <EventBoardCardSkeleton />
              </Grid>
            ))
          : filteredEvents
              .filter(
                (event) =>
                  !myEvents.some(
                    (myEvent) =>
                      myEvent.id === event.id &&
                      myEvent.registrationStatus === "approved"
                  )
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
