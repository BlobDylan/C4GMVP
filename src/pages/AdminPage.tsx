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

  const [view, setView] = useState<string>("calendar");
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
        padding: 2,
      }}
    >
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleViewChange}
        aria-label={t("adminPage.viewMode")}
      >
        <ToggleButton value="calendar" aria-label={t("adminPage.calendarView")}>
          <CalendarViewWeekIcon />
        </ToggleButton>
        <ToggleButton value="list" aria-label={t("adminPage.listView")}>
          <ViewListIcon />
        </ToggleButton>
      </ToggleButtonGroup>

      {view === "calendar" ? <Calendar /> : <UpcomingEvents />}
    </Box>
  );
}

export default AdminPage;
