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

// Define filter options structure
interface SelectedFilters {
  channels: string[];
  languages: string[];
  locations: string[];
}

function FilterBar() {
  const { channels, languages, locations, filterEvents, resetFilters } =
    useEvents();
  const [currentDialog, setCurrentDialog] = useState<
    "channels" | "languages" | "locations" | null
  >(null);

  // Track selected filters for ALL categories
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
    // Apply all selected filters
    filterEvents(selectedFilters);
    setCurrentDialog(null);
  };

  const handleToggleFilter = (value: string) => {
    if (!currentDialog) return;

    // Update filters for the current category
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
    // Reset filters when component unmounts
    return () => {
      resetFilters();
    };
  }, [resetFilters]);

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: "100%", justifyContent: "center" }}
      >
        {/* Channel Filter Button */}
        <IconButton
          color="primary"
          aria-label="filter channel"
          size="large"
          onClick={() => handleOpen("channels")}
        >
          <FilterListIcon fontSize="inherit" />
          <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1 }}>
            Channel
          </Typography>
        </IconButton>

        {/* Language Filter Button */}
        <IconButton
          color="primary"
          aria-label="filter language"
          size="large"
          onClick={() => handleOpen("languages")}
        >
          <FilterListIcon fontSize="inherit" />
          <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1 }}>
            Language
          </Typography>
        </IconButton>

        {/* Location Filter Button */}
        <IconButton
          color="primary"
          aria-label="filter location"
          size="large"
          onClick={() => handleOpen("locations")}
        >
          <FilterListIcon fontSize="inherit" />
          <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1 }}>
            Location
          </Typography>
        </IconButton>
      </Stack>

      {/* Filter Dialog */}
      <Dialog open={!!currentDialog} onClose={handleCancel}>
        <Box sx={{ width: "100%", padding: 2 }}>
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
            Cancel
          </Button>
          <Button onClick={handleApply} color="primary">
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FilterBar;
