import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addWeeks,
  subWeeks,
  isSameDay,
  isToday,
} from "date-fns";
import { Event } from "../types";
import { ChevronLeft, ChevronRight, Edit, Trash } from "lucide-react";

interface CalendarProps {
  events: Event[];
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (event: Event) => void;
  onAddEvent: (date: Date) => void;
  currentDate: Date;
  onWeekChange: (date: Date) => void;
}

export function Calendar({
  events,
  onEditEvent,
  onDeleteEvent,
  onAddEvent,
  currentDate,
  onWeekChange,
}: CalendarProps) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const handlePreviousWeek = () => {
    onWeekChange(subWeeks(currentDate, 1));
  };

  const handleNextWeek = () => {
    onWeekChange(addWeeks(currentDate, 1));
  };

  return (
    <div className="space-y-4 bg-black p-4 rounded-lg ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">
          {format(weekStart, "MMMM d")} - {format(weekEnd, "MMMM d, yyyy")}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePreviousWeek}
            className="p-2 hover:bg-neutral-800 text-white rounded-md"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => onWeekChange(new Date())}
            className="px-3 py-1 text-sm bg-yellow-300 text-black rounded-md hover:bg-yellow-400"
          >
            Today
          </button>
          <button
            onClick={handleNextWeek}
            className="p-2 hover:bg-neutral-800 text-white rounded-md"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-2 text-center font-semibold text-white bg-neutral-800 "
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = events.filter((event) =>
            isSameDay(new Date(event.date), day)
          );

          return (
            <div
              key={day.toISOString()}
              onClick={() => onAddEvent(day)}
              className={`min-h-[50vh] p-2 cursor-pointer transition-colors hover:bg-neutral-800 ${
                isToday(day) ? "bg-neutral-600" : "bg-neutral-700"
              }`}
            >
              <div className="font-medium text-sm text-white">
                {format(day, "d")}
              </div>
              <div className="space-y-1 mt-1">
                {dayEvents
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((event) => (
                    <div
                      key={event.id}
                      className={`group relative text-xs p-2 rounded ${
                        event.assignedPeople.length === 0
                          ? "bg-red-400 hover:bg-red-500 "
                          : event.assignedPeople.length === 1
                          ? "bg-green-300 hover:bg-green-400"
                          : "bg-yellow-300 hover:bg-yellow-400"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <div className="font-bold">
                            {format(new Date(event.date), "HH:mm")}
                          </div>
                          <div className="mt-1 font-medium">{event.title}</div>
                          {event.assignedPeople.length > 0 && (
                            <div className="mt-1 text-black">
                              {event.assignedPeople.join(", ")}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onEditEvent(event)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-yellow-300 rounded"
                          >
                            <Edit className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => onDeleteEvent(event)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-300 rounded"
                          >
                            <Trash className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
