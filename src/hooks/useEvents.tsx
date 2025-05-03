import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Event, CreateEventRequest } from "../types";
import { useAuth } from "../hooks";

interface EventsContextType {
  events: Event[];
  myEvents: Event[];
  isLoading: boolean;
  error: string | null;
  createEvent: (eventData: Omit<Event, "id">) => Promise<void>;
  updateEvent: (eventId: string, eventData: Partial<Event>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  approveEvent: (eventId: string) => Promise<void>;
  unapproveEvent: (eventId: string) => Promise<void>;
  registerToEvent: (eventId: string) => Promise<void>;
  unregisterFromEvent: (eventId: string) => Promise<void>;
}

const EventsContext = createContext<EventsContextType>({
  events: [],
  myEvents: [],
  isLoading: true,
  error: null,
  createEvent: async () => {},
  updateEvent: async () => {},
  deleteEvent: async () => {},
  approveEvent: async () => {},
  unapproveEvent: async () => {},
  registerToEvent: async () => {},
  unregisterFromEvent: async () => {},
});

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/events");
      if (!response.ok) throw new Error("Failed to fetch events");

      const data = await response.json();
      setEvents(
        data.events.map((event: any) => ({
          ...event,
          date: new Date(event.date),
          id: event.id.toString(),
        }))
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMyEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No token found");
      const response = await fetch("http://localhost:5000/me/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch my events");

      const data = await response.json();
      setMyEvents(
        data.events.map((event: any) => ({
          ...event,
          date: new Date(event.date),
          id: event.id.toString(),
        }))
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load my events");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchEvents();
    fetchMyEvents();
  }, [user, fetchEvents, fetchMyEvents]);

  const createEvent = useCallback(
    async (eventData: CreateEventRequest) => {
      console.log("Creating event: ", {
        ...eventData,
        date: eventData.date.toISOString(),
      });
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch("http://localhost:5000/admin/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...eventData,
            date: eventData.date.toISOString(),
          }),
        });

        if (!response.ok) throw new Error("Failed to create event");
        await Promise.all([fetchEvents(), fetchMyEvents()]);
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to create event");
      }
    },
    [fetchEvents, fetchMyEvents]
  );

  const updateEvent = useCallback(
    async (eventId: string, eventData: Partial<Event>) => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          `http://localhost:5000/admin/edit/${eventId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ...eventData,
              date: eventData.date?.toISOString(),
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to update event");
        await fetchEvents();
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to update event");
      }
    },
    [fetchEvents]
  );

  const approveEvent = useCallback(
    async (eventId: string) => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          `http://localhost:5000/admin/approve/${eventId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to approve event");
        await fetchEvents();
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to approve event");
      }
    },
    [fetchEvents]
  );

  const unapproveEvent = useCallback(
    async (eventId: string) => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          `http://localhost:5000/admin/unapprove/${eventId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to unapprove event");
        await fetchEvents();
      } catch (err) {
        throw err instanceof Error
          ? err
          : new Error("Failed to unapprove event");
      }
    },
    [fetchEvents]
  );

  const deleteEvent = useCallback(
    async (eventId: string) => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          `http://localhost:5000/admin/delete/${eventId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to delete event");
        await fetchEvents();
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to delete event");
      } finally {
        setIsLoading(false);
      }
    },
    [fetchEvents]
  );

  const registerToEvent = useCallback(
    async (eventId: string) => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          `http://localhost:5000/events/${eventId}/register`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to register to event");
        await Promise.all([fetchEvents(), fetchMyEvents()]);
      } catch (err) {
        throw err instanceof Error
          ? err
          : new Error("Failed to register to event");
      }
    },
    [fetchMyEvents, fetchEvents]
  );

  const unregisterFromEvent = useCallback(
    async (eventId: string) => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          `http://localhost:5000/events/${eventId}/unregister`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to unregister from event");
        await Promise.all([fetchEvents(), fetchMyEvents()]);
      } catch (err) {
        throw err instanceof Error
          ? err
          : new Error("Failed to unregister from event");
      }
    },
    [fetchMyEvents, fetchEvents]
  );

  return (
    <EventsContext.Provider
      value={{
        events,
        myEvents,
        isLoading,
        error,
        createEvent,
        updateEvent,
        deleteEvent,
        approveEvent,
        unapproveEvent,
        registerToEvent,
        unregisterFromEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
