import { PieChart } from "@mui/x-charts/PieChart";
import { Stack, Box, Typography, Button } from "@mui/material";
import { Event } from "../types";
import { DateRangePicker } from "rsuite";
import { useState, useEffect } from "react";
import "rsuite/dist/rsuite.min.css";
import { useTranslation } from "react-i18next";

function StatisticsTab({ events }: { events: Event[] }) {
  const { t, i18n } = useTranslation();

  const [dateRange, setDateRange] = useState<Date[]>(() => {
    const today = new Date();
    return [today, today];
  });

  const [pieData, setPieData] = useState([
    { id: 0, value: 0, label: t("statistics.labels.approved"), color: "#86efac" },
    { id: 1, value: 0, label: t("statistics.labels.pending"), color: "#ffdf20" },
    { id: 2, value: 0, label: t("statistics.labels.unassigned"), color: "#f87171" },
  ]);

  const calculateStatistics = (start: Date, end: Date) => {
    // Normalize dates to cover full days
    const startDate = new Date(start);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);

    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate && eventDate <= endDate;
    });

    let approved = 0;
    let pending = 0;
    let unassigned = 0;

    filteredEvents.forEach((event) => {
      const count = event.assignedPeople.length;
      if (count === 0) unassigned++;
      else if (count === 1) approved++;
      else pending++;
    });

    return [
      { id: 0, value: approved, label: t("statistics.labels.approved"), color: "#86efac" },
      { id: 1, value: pending, label: t("statistics.labels.pending"), color: "#ffdf20" },
      { id: 2, value: unassigned, label: t("statistics.labels.unassigned"), color: "#f87171" },
    ];
  };

  const handleApply = () => {
    if (dateRange.length === 2) {
      const newData = calculateStatistics(dateRange[0], dateRange[1]);
      setPieData(newData);
    }
  };

  useEffect(() => {
    handleApply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className="bg-black p-4 rounded-lg">
      <Typography variant="h5" color="white" mb={3} textAlign="center">
        {t("statistics.title")}
      </Typography>
      <Stack spacing={4} alignItems="center" justifyContent="center">
        <Stack spacing={2} width="100%" maxWidth={300}>
          <DateRangePicker
            ranges={[]}
            onChange={(range) => setDateRange(range || dateRange)}
            locale={i18n.language === "he" ? "he_IL" : undefined}
            style={{ width: "100%" }}
          />
          <Button
            variant="contained"
            color="warning"
            onClick={handleApply}
            fullWidth
          >
            {t("statistics.apply")}
          </Button>
        </Stack>

        <Box className="mx-auto" sx={{ width: 300, height: 200 }}>
          {pieData.reduce((acc, item) => acc + item.value, 0) === 0 ? (
            <Typography variant="body2" color="white" textAlign="center">
              {t("statistics.noData")}
            </Typography>
          ) : (
            <PieChart
              series={[
                {
                  data: pieData,
                  innerRadius: 35,
                  outerRadius: 90,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  cx: 145,
                  arcLabel: () => "",
                },
              ]}
              slotProps={{ legend: { hidden: true } }}
              width={300}
              height={200}
            />
          )}
        </Box>

        {pieData.reduce((acc, item) => acc + item.value, 0) === 0 ? null : (
          <Stack spacing={1} alignItems="flex-start">
            {pieData.map((item) => (
              <Box key={item.id} display="flex" alignItems="center" gap={1}>
                <Box
                  width={16}
                  height={16}
                  borderRadius={4}
                  sx={{ backgroundColor: item.color }}
                />
                <Typography variant="body2" color="white">
                  {item.label}: {item.value}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

export default StatisticsTab;
