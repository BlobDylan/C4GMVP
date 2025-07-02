import { useState, useEffect } from "react";
import {
  IconButton,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useEvents } from "../../hooks";
import { useTranslation } from "react-i18next";

// Define filter options structure
interface SelectedFilters {
  channels: string[];
  languages: string[];
  locations: string[];
}

function FilterBar() {
  const { t } = useTranslation();
  const { channels, languages, locations, filterEvents, resetFilters } =
    useEvents();
  const [currentDialog, setCurrentDialog] = useState<
    "channels" | "languages" | "locations" | null
  >(null);

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    channels: [],
    languages: [],
    locations: [],
  });

  const handleOpen = (type: "channels" | "languages" | "locations") => {
    setCurrentDialog(type);
  };

  const handleCancel = () => {
    setCurrentDialog(null);
  };

  const handleApply = () => {
    filterEvents(selectedFilters);
    setCurrentDialog(null);
  };

  const handleToggleFilter = (value: string) => {
    if (!currentDialog) return;

    setSelectedFilters((prev) => ({
      ...prev,
      [currentDialog]: prev[currentDialog].includes(value)
        ? prev[currentDialog].filter((v) => v !== value)
        : [...prev[currentDialog], value],
    }));
  };

  const getCurrentChoices = () => {
    switch (currentDialog) {
      case "channels":
        return channels;
      case "languages":
        return languages;
      case "locations":
        return locations;
      default:
        return [];
    }
  };

  useEffect(() => {
    return () => {
      resetFilters();
    };
  }, [resetFilters]);

  const getDialogTitle = () => {
    switch (currentDialog) {
      case "channels":
        return t("filters.channels");
      case "languages":
        return t("filters.languages");
      case "locations":
        return t("filters.locations");
      default:
        return "";
    }
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: "100%", justifyContent: "center" }}
      >
        <IconButton
          color="primary"
          aria-label={t("filters.filterByChannel")}
          size="large"
          onClick={() => handleOpen("channels")}
        >
          <FilterListIcon fontSize="inherit" />
          <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1 }}>
            {t("filters.channels")}
          </Typography>
        </IconButton>

        <IconButton
          color="primary"
          aria-label={t("filters.filterByLanguage")}
          size="large"
          onClick={() => handleOpen("languages")}
        >
          <FilterListIcon fontSize="inherit" />
          <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1 }}>
            {t("filters.languages")}
          </Typography>
        </IconButton>

        <IconButton
          color="primary"
          aria-label={t("filters.filterByLocation")}
          size="large"
          onClick={() => handleOpen("locations")}
        >
          <FilterListIcon fontSize="inherit" />
          <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1 }}>
            {t("filters.locations")}
          </Typography>
        </IconButton>
      </Stack>

      <Dialog open={!!currentDialog} onClose={handleCancel}>
        <Box sx={{ width: "100%", padding: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            {getDialogTitle()}
          </Typography>
          <Stack direction="column" spacing={2}>
            {getCurrentChoices().map((choice, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={
                      selectedFilters[currentDialog!]?.includes(choice) || false
                    }
                    onChange={() => handleToggleFilter(choice)}
                  />
                }
                label={
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {choice}
                  </Typography>
                }
              />
            ))}
          </Stack>
        </Box>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            {t("common.cancel")}
          </Button>
          <Button onClick={handleApply} color="primary">
            {t("filters.apply")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FilterBar;
