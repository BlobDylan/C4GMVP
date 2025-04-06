import { useState } from "react";
import { Calendar } from "./components/Calendar";
import { EventForm } from "./components/EventForm";
import { PeopleTab } from "./components/PeopleTab";
import { Event } from "./types";
import { Calendar as CalendarIcon, Plus } from "lucide-react";

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handleAddEvent = (eventData: Omit<Event, "id">) => {
    if (editingEvent) {
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id ? { ...eventData, id: event.id } : event
        )
      );
      setEditingEvent(undefined);
    } else {
      const newEvent: Event = {
        ...eventData,
        id: crypto.randomUUID(),
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setSelectedDate(new Date(event.date));
    setIsFormOpen(true);
  };

  const handleDeleteEvent = (event: Event) => {
    setEvents(events.filter((e) => e.id !== event.id));
  };

  const handleAddNewEvent = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(undefined);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingEvent(undefined);
  };

  return (
    <div className="min-h-screen bg-neutral-800">
      <header className="bg-black shadow">
        <div className="max-w-8xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-8 w-8 text-yellow-300" />
              <h1 className="text-2xl font-bold text-white">
                Event Management
              </h1>
            </div>
            <button
              onClick={() => {
                setSelectedDate(new Date());
                setEditingEvent(undefined);
                setIsFormOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-300 text-black rounded-md hover:bg-yellow-400 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add Event
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-8xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-8 gap-4">
        <div className="bg-black rounded-lg shadow p-6 col-span-1 sm:col-span-2 shadow-lg">
          <PeopleTab events={events} />
        </div>
        <div className="bg-black rounded-lg shadow p-6 col-span-1 sm:col-span-6 shadow-lg">
          <Calendar
            events={events}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
            onAddEvent={handleAddNewEvent}
            currentDate={currentDate}
            onWeekChange={setCurrentDate}
          />
        </div>
      </main>

      <EventForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleAddEvent}
        selectedDate={selectedDate}
        editEvent={editingEvent}
      />
    </div>
  );
}

export default App;
