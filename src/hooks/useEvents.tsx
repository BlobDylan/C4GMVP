import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Event, CreateEventRequest } from "../types"; // Assuming CreateEventRequest is similar to Omit<Event, "id">
import { useAuth } from "../hooks";
import { set } from "date-fns";
import { fi } from "date-fns/locale";

interface EventsContextType {
  events: Event[];
  myEvents: Event[];
  isLoading: boolean;
  isLoadingRegisterID: String | null;
  isLoadingUnregisterID: String | null;
  error: string | null;
  createEvent: (eventData: Omit<Event, "id">) => Promise<void>;
  updateEvent: (eventId: string, eventData: Partial<Event>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  approveEvent: (eventId: string) => Promise<void>;
  unapproveEvent: (eventId: string) => Promise<void>;
  registerToEvent: (eventId: string) => Promise<void>;
  unregisterFromEvent: (eventId: string) => Promise<void>;
  refetchEvents: () => Promise<void>;
  refetchMyEvents: () => Promise<void>;
}

const EventsContext = createContext<EventsContextType>({
  events: [],
  myEvents: [],
  isLoading: true,
  isLoadingRegisterID: null,
  isLoadingUnregisterID: null,
  error: null,
  createEvent: async () => {},
  updateEvent: async () => {},
  deleteEvent: async () => {},
  approveEvent: async () => {},
  unapproveEvent: async () => {},
  registerToEvent: async () => {},
  unregisterFromEvent: async () => {},
  refetchEvents: async () => {},
  refetchMyEvents: async () => {},
});

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading: authIsLoading } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRegisterID, setIsLoadingRegisterID] = useState<String | null>(
    null
  );
  const [isLoadingUnregisterID, setIsLoadingUnregisterID] =
    useState<String | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/events");
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch events");
      }
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
    console.log("Fetching my events...");
    if (!user) {
      setMyEvents([]);
      return;
    }
    setIsLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No token found for fetching user-specific events.");
      }
      const response = await fetch("http://localhost:5000/me/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to fetch my events:", response.status, errorData);
        throw new Error(errorData.message || "Failed to fetch my events");
      }
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
  }, [fetchEvents]);

  useEffect(() => {
    if (!authIsLoading) {
      if (user) {
        fetchMyEvents();
      } else {
        setMyEvents([]);
      }
    } else {
    }
  }, [user, authIsLoading, fetchMyEvents]);

  const createEvent = useCallback(
    async (eventData: CreateEventRequest) => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Authentication token not found.");
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

        if (!response.ok) {
          const errorBody = await response
            .json()
            .catch(() => ({ message: "Failed to create event" }));
          throw new Error(errorBody.message);
        }

        await Promise.all([
          fetchEvents(),
          user ? fetchMyEvents() : Promise.resolve(),
        ]);
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to create event");
      } finally {
        setIsLoading(false);
      }
    },
    [fetchEvents, fetchMyEvents, user]
  );

  const updateEvent = useCallback(
    async (eventId: string, eventData: Partial<Event>) => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Authentication token not found.");
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

        if (!response.ok) {
          const errorBody = await response
            .json()
            .catch(() => ({ message: "Failed to update event" }));
          throw new Error(errorBody.message);
        }
        await Promise.all([
          fetchEvents(),
          user ? fetchMyEvents() : Promise.resolve(),
        ]);
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to update event");
      }
    },
    [fetchEvents, fetchMyEvents, user]
  );

  const deleteEvent = useCallback(
    async (eventId: string) => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Authentication token not found.");
        const response = await fetch(
          `http://localhost:5000/admin/delete/${eventId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          const errorBody = await response
            .json()
            .catch(() => ({ message: "Failed to delete event" }));
          throw new Error(errorBody.message);
        }
        await Promise.all([
          fetchEvents(),
          user ? fetchMyEvents() : Promise.resolve(),
        ]);
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to delete event");
      } finally {
        setIsLoading(false);
      }
    },
    [fetchEvents, fetchMyEvents, user]
  );

  const approveEvent = useCallback(
    async (eventId: string) => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Authentication token not found.");
        const response = await fetch(
          `http://localhost:5000/admin/approve/${eventId}`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          const errorBody = await response
            .json()
            .catch(() => ({ message: "Failed to approve event" }));
          throw new Error(errorBody.message);
        }
        await Promise.all([
          fetchEvents(),
          user ? fetchMyEvents() : Promise.resolve(),
        ]);
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to approve event");
      }
    },
    [fetchEvents, fetchMyEvents, user]
  );

  const unapproveEvent = useCallback(
    async (eventId: string) => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Authentication token not found.");
        const response = await fetch(
          `http://localhost:5000/admin/unapprove/${eventId}`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          const errorBody = await response
            .json()
            .catch(() => ({ message: "Failed to unapprove event" }));
          throw new Error(errorBody.message);
        }
        await Promise.all([
          fetchEvents(),
          user ? fetchMyEvents() : Promise.resolve(),
        ]);
      } catch (err) {
        throw err instanceof Error
          ? err
          : new Error("Failed to unapprove event");
      }
    },
    [fetchEvents, fetchMyEvents, user]
  );

  const registerToEvent = useCallback(
    async (eventId: string) => {
      setIsLoadingRegisterID(eventId);
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Authentication token not found.");
        const response = await fetch(
          `http://localhost:5000/events/${eventId}/register`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          const errorBody = await response
            .json()
            .catch(() => ({ message: "Failed to register to event" }));
          throw new Error(errorBody.message);
        }
        await Promise.all([fetchMyEvents()]);
      } catch (err) {
        throw err instanceof Error
          ? err
          : new Error("Failed to register to event");
      } finally {
        setIsLoadingRegisterID(null);
      }
    },
    [fetchMyEvents]
  );

  const unregisterFromEvent = useCallback(
    async (eventId: string) => {
      setIsLoadingUnregisterID(eventId);
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Authentication token not found.");
        const response = await fetch(
          `http://localhost:5000/events/${eventId}/unregister`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          const errorBody = await response
            .json()
            .catch(() => ({ message: "Failed to unregister from event" }));
          throw new Error(errorBody.message);
        }
        await Promise.all([fetchEvents(), fetchMyEvents()]);
      } catch (err) {
        throw err instanceof Error
          ? err
          : new Error("Failed to unregister from event");
      } finally {
        setIsLoadingUnregisterID(null);
      }
    },
    [fetchEvents, fetchMyEvents]
  );

  return (
    <EventsContext.Provider
      value={{
        events,
        myEvents,
        isLoading,
        isLoadingRegisterID,
        isLoadingUnregisterID,
        error,
        createEvent,
        updateEvent,
        deleteEvent,
        approveEvent,
        unapproveEvent,
        registerToEvent,
        unregisterFromEvent,
        refetchEvents: fetchEvents,
        refetchMyEvents: fetchMyEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
