import { Box } from "@mui/material";
import { UpcomingEvents, Calendar } from "../components";
import { useEvents } from "../hooks";
import { useSnackbar } from "notistack";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import ViewListIcon from "@mui/icons-material/ViewList";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useTranslation } from "react-i18next";

function AdminPage() {
  const { error } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [error, enqueueSnackbar]);

  if (!user) {
    return null;
  }

  const [view, setView] = useState<string>("list");
  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: string
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: { xs: 1, sm: 2 },
      }}
    >
      <ToggleButtonGroup
        value={view}
        dir="ltr"
        exclusive
        onChange={handleViewChange}
        aria-label={t("adminPage.viewMode")}
        size="small"
        sx={{
          mb: { xs: 2, sm: 3 },
          "& .MuiToggleButton-root": {
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            padding: { xs: "6px 12px", sm: "8px 16px" },
          },
        }}
      >
        <ToggleButton value="calendar" aria-label={t("adminPage.calendarView")}>
          <CalendarViewWeekIcon
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          />
        </ToggleButton>
        <ToggleButton value="list" aria-label={t("adminPage.listView")}>
          <ViewListIcon sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }} />
        </ToggleButton>
      </ToggleButtonGroup>

      {view === "calendar" ? <Calendar /> : <UpcomingEvents />}
    </Box>
  );
}

export default AdminPage;
