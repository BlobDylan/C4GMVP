import { Box, Grid, Typography } from "@mui/material";
import { MyEventsCard, FilterBar, EventBoardCardSkeleton } from "../../components";
import { useEvents } from "../../hooks/useEvents";
import { useTranslation } from "react-i18next";

function MyEvents() {
  const { t } = useTranslation();
  const { myEvents, isLoading, filters } = useEvents();
  const numCardsToLoad = 4;

  const filteredMyEvents = myEvents.filter((event) => {
    const {
      channels: filterChannels,
      languages: filterLanguages,
      locations: filterLocations,
    } = filters;

    if (filterChannels?.length && !filterChannels.includes(event.channel))
      return false;
    if (filterLanguages?.length && !filterLanguages.includes(event.language))
      return false;
    if (filterLocations?.length && !filterLocations.includes(event.location))
      return false;

    return true;
  });

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
          {t("myEvents.title")}
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
          {isLoading ? (
            Array.from({ length: numCardsToLoad }, (_, index) => (
              <Grid key={index} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                <EventBoardCardSkeleton />
              </Grid>
            ))
          ) : filteredMyEvents.length === 0 ? (
            <Typography>{t("myEvents.noEventsRegistered")}</Typography>
          ) : (
            filteredMyEvents.map((event) => (
              <Grid key={event.id} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                <MyEventsCard {...event} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default MyEvents;
