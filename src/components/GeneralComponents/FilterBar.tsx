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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  // Determine if "All" should be checked or indeterminate
  const getAllCheckboxState = () => {
    if (!currentDialog) return { checked: false, indeterminate: false };

    const currentChoices = getCurrentChoices();
    const selectedCount = selectedFilters[currentDialog].length;
    const totalCount = currentChoices.length;

    return {
      checked: selectedCount === totalCount && totalCount > 0,
      indeterminate: selectedCount > 0 && selectedCount < totalCount,
    };
  };

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

  const handleReset = () => {
    resetFilters();
    setSelectedFilters({
      channels: [],
      languages: [],
      locations: [],
    });
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

  // Toggle all filters in the current category
  const handleToggleAll = () => {
    if (!currentDialog) return;

    const currentChoices = getCurrentChoices();
    const { checked } = getAllCheckboxState();

    setSelectedFilters((prev) => ({
      ...prev,
      [currentDialog]: checked ? [] : [...currentChoices],
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
        direction={{ xs: "row", sm: "row" }}
        spacing={{ xs: 1, sm: 2 }}
        sx={{
          width: "100%",
          justifyContent: "center",
          mb: { xs: 2, sm: 3 },
        }}
      >
        <IconButton
          color="primary"
          aria-label={t("filters.filterByChannel")}
          size={isMobile ? "medium" : "large"}
          onClick={() => handleOpen("channels")}
        >
          <FilterListIcon fontSize={isMobile ? "small" : "medium"} />
          <Typography
            variant={isMobile ? "body1" : "h6"}
            sx={{
              fontWeight: "bold",
              ml: 1,
              fontSize: { xs: "0.800rem", sm: "1.15rem" },
            }}
          >
            {t("filters.channels")}
          </Typography>
        </IconButton>

        <IconButton
          color="primary"
          aria-label={t("filters.filterByLanguage")}
          size={isMobile ? "medium" : "large"}
          onClick={() => handleOpen("languages")}
        >
          <FilterListIcon fontSize={isMobile ? "small" : "medium"} />
          <Typography
            variant={isMobile ? "body1" : "h6"}
            sx={{
              fontWeight: "bold",
              ml: 1,
              fontSize: { xs: "0.800rem", sm: "1.15rem" },
            }}
          >
            {t("filters.languages")}
          </Typography>
        </IconButton>

        <IconButton
          color="primary"
          aria-label={t("filters.filterByLocation")}
          size={isMobile ? "medium" : "large"}
          onClick={() => handleOpen("locations")}
        >
          <FilterListIcon fontSize={isMobile ? "small" : "medium"} />
          <Typography
            variant={isMobile ? "body1" : "h6"}
            sx={{
              fontWeight: "bold",
              ml: 1,
              fontSize: { xs: "0.800rem", sm: "1.15rem" },
            }}
          >
            {t("filters.locations")}
          </Typography>
        </IconButton>
        <IconButton
          color="primary"
          aria-label={t("filters.resetFilters")}
          size={isMobile ? "medium" : "large"}
          onClick={handleReset}
        >
          <RestartAltIcon fontSize={isMobile ? "small" : "medium"} />
          <Typography
            variant={isMobile ? "body1" : "h6"}
            sx={{
              fontWeight: "bold",
              ml: 1,
              fontSize: { xs: "0.800rem", sm: "1.15rem" },
            }}
          >
            {t("filters.reset")}
          </Typography>
        </IconButton>
      </Stack>

      <Dialog
        open={!!currentDialog}
        onClose={handleCancel}
        fullScreen={isMobile}
        maxWidth="sm"
        fullWidth
      >
        <Box
          sx={{
            width: "100%",
            padding: { xs: 2, sm: 3 },
            maxHeight: isMobile ? "100vh" : "70vh",
            overflow: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "bold",
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
          >
            {getDialogTitle()}
          </Typography>
          <Stack direction="column" spacing={1}>
            {/* "All" option */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={getAllCheckboxState().checked}
                  indeterminate={getAllCheckboxState().indeterminate}
                  onChange={handleToggleAll}
                  size={isMobile ? "small" : "medium"}
                />
              }
              label={
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}
                >
                  {t("filters.all")}
                </Typography>
              }
            />

            {/* Individual options */}
            {getCurrentChoices().map((choice, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={
                      selectedFilters[currentDialog!]?.includes(choice) || false
                    }
                    onChange={() => handleToggleFilter(choice)}
                    size={isMobile ? "small" : "medium"}
                  />
                }
                label={
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    }}
                  >
                    {choice}
                  </Typography>
                }
              />
            ))}
          </Stack>
        </Box>
        <DialogActions
          sx={{ padding: { xs: 2, sm: 3 }, justifyContent: "space-between" }}
        >
          <Button
            onClick={handleCancel}
            color="secondary"
            size={isMobile ? "small" : "medium"}
          >
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleApply}
            color="primary"
            size={isMobile ? "small" : "medium"}
          >
            {t("filters.apply")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FilterBar;
