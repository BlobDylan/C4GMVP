import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Event, EventStatus } from "../types";

interface EventsContextType {
  events: Event[];
  isLoading: boolean;
  error: string | null;
}

const EventsContext = createContext<EventsContextType>({
  events: [],
  isLoading: true,
  error: null,
});

const mockEvents: Event[] = [
  {
    id: "0",
    title: "Awareness Booth at Tel Aviv University",
    description:
      "Setting up a booth to distribute flyers, answer questions, and engage with students about the hostages' situation.",
    date: new Date("2025-04-25T11:00:00"),
    location: "Tel Aviv University Campus",
    status: EventStatus.PENDING,
    spotsAvailable: 10,
  },
  {
    id: "1",
    title: "Volunteer Visit to Hostage Families",
    description:
      "A small group of volunteers will visit families of the hostages to offer emotional support and assistance with errands or logistics.",
    date: new Date("2025-04-27T16:00:00"),
    location: "Various locations (to be assigned)",
    status: EventStatus.PENDING,
    spotsAvailable: 5,
  },
  {
    id: "2",
    title: "Evening Rally and Candlelight Vigil in Jerusalem",
    description:
      "Participate in an organized rally and vigil to show solidarity and raise public awareness. Volunteers will help with setup, crowd guidance, and cleanup.",
    date: new Date("2025-04-30T19:30:00"),
    location: "Jerusalem City Center",
    status: EventStatus.APPROVED,
    spotsAvailable: 20,
  },
];

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMockData = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setEvents(mockEvents);
        setError(null);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setIsLoading(false);
      }
    };

    loadMockData();
  }, []);

  return (
    <EventsContext.Provider value={{ events, isLoading, error }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
