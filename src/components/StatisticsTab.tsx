import { PieChart } from "@mui/x-charts/PieChart";
import { Stack, Box, Typography } from "@mui/material";
import { Event } from "../types";
import { DateRangePicker } from "rsuite";
import { useState, useEffect } from "react";
import "rsuite/dist/rsuite.min.css";

export function StatisticsTab({ events }: { events: Event[] }) {
  const [dateRange, setDateRange] = useState<Date[]>(() => {
    const today = new Date();
    return [today, today];
  });

  const [pieData, setPieData] = useState([
    { id: 0, value: 0, label: "Approved", color: "#86efac" },
    { id: 1, value: 0, label: "Pending", color: "#ffdf20" },
    { id: 2, value: 0, label: "Unassigned", color: "#f87171" },
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
      { id: 0, value: approved, label: "Approved", color: "#86efac" },
      { id: 1, value: pending, label: "Pending", color: "#ffdf20" },
      { id: 2, value: unassigned, label: "Unassigned", color: "#f87171" },
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
  }, []);

  return (
    <div className="bg-black p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-white mb-4">Statistics</h2>
      <Stack spacing={4} alignItems="center" justifyContent="center">
        <Stack spacing={2} width="100%" maxWidth={300}>
          <DateRangePicker
            ranges={[]}
            onChange={(range) => setDateRange(range || dateRange)}
          />
          <button
            className="bg-yellow-300 text-black p-2 rounded hover:bg-yellow-400 w-full"
            onClick={handleApply}
          >
            Apply
          </button>
        </Stack>

        <div className="mx-auto w-[300px]">
          {Array.from(pieData.values()).reduce(
            (acc, item) => acc + item.value,
            0
          ) === 0 ? (
            <Typography variant="body2" color="white" textAlign="center">
              No data available for the selected date range.
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
        </div>

        {Array.from(pieData.values()).reduce(
          (acc, item) => acc + item.value,
          0
        ) === 0 ? (
          <></>
        ) : (
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
    </div>
  );
}
