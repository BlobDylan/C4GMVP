import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { Event, CreateEventRequest } from "../types"; // Assuming CreateEventRequest is similar to Omit<Event, "id">
import { useAuth } from "../hooks";
import { set } from "date-fns";
import { fi } from "date-fns/locale";

export interface FilterOptions {
  channels?: string[];
  languages?: string[];
  locations?: string[];
}

interface EventsContextType {
  events: Event[];
  myEvents: Event[];
  isLoading: boolean;
  isLoadingRegisterID: String | null;
  isLoadingUnregisterID: String | null;
  error: string | null;
  channels: string[];
  languages: string[];
  locations: string[];
  filteredEvents: Event[];
  filters: FilterOptions;
  createEvent: (eventData: CreateEventRequest) => Promise<void>;
  updateEvent: (eventId: string, eventData: Partial<Event>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  approveEvent: (eventId: string) => Promise<void>;
  unapproveEvent: (eventId: string) => Promise<void>;
  registerToEvent: (eventId: string) => Promise<void>;
  unregisterFromEvent: (eventId: string) => Promise<void>;
  refetchEvents: () => Promise<void>;
  refetchMyEvents: () => Promise<void>;
  filterEvents: (filters: FilterOptions) => void;
  resetFilters: () => void;
}

const EventsContext = createContext<EventsContextType>({
  events: [],
  myEvents: [],
  isLoading: true,
  isLoadingRegisterID: null,
  isLoadingUnregisterID: null,
  error: null,
  channels: [],
  languages: [],
  locations: [],
  filteredEvents: [],
  filters: {},
  createEvent: async () => {},
  updateEvent: async () => {},
  deleteEvent: async () => {},
  approveEvent: async () => {},
  unapproveEvent: async () => {},
  registerToEvent: async () => {},
  unregisterFromEvent: async () => {},
  refetchEvents: async () => {},
  refetchMyEvents: async () => {},
  filterEvents: (events) => events,
  resetFilters: () => {},
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
  const [filters, setFilters] = useState<FilterOptions>({});

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log("Fetching all events...");
      const response = await fetch("http://localhost:5000/events");
      const data = await response.json();
      console.log("Fetch events response:", {
        status: response.status,
        ok: response.ok,
        data: data,
      });

      if (!response.ok) {
        console.error("Failed to fetch events:", response.status, data);
        throw new Error(data.message || "Failed to fetch events");
      }

      const mappedEvents = data.events.map((event: any) => ({
        ...event,
        date: new Date(event.date),
        id: event.id.toString(),
      }));
      console.log("Mapped events:", mappedEvents);

      setEvents(mappedEvents);
      setError(null);
    } catch (err) {
      console.error("Error in fetchEvents:", err);
      setError(err instanceof Error ? err.message : "Failed to load events");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMyEvents = useCallback(async () => {
    console.log("Fetching my events...");
    if (!user) {
      console.log("No user found, clearing my events");
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
      console.log("Received my events data:", data);
      setMyEvents(
        data.events.map((event: any) => ({
          ...event,
          date: new Date(event.date),
          id: event.id.toString(),
        }))
      );
      setError(null);
    } catch (err) {
      console.error("Error in fetchMyEvents:", err);
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
        console.log("Creating event with data:", eventData);
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

        const responseData = await response.json();
        console.log("Create event response:", {
          status: response.status,
          ok: response.ok,
          data: responseData,
        });

        if (!response.ok) {
          console.error(
            "Failed to create event:",
            response.status,
            responseData
          );
          throw new Error(responseData.message || "Failed to create event");
        }

        console.log("Event created successfully, fetching updated events...");
        await Promise.all([
          fetchEvents(),
          user ? fetchMyEvents() : Promise.resolve(),
        ]);
        console.log("Events updated successfully");
      } catch (err) {
        console.error("Error in createEvent:", err);
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

  const channelOptions = [
    { label: "Hostages Square", value: "Hostages Square" },
    { label: "Business Sector", value: "Business Sector" },
    { label: "Donations", value: "Donations" },
    { label: "Religious Zionism", value: "Religious Zionism" },
    { label: "Virtual", value: "Virtual" },
  ];

  const languageOptions = [
    { label: "Hebrew", value: "Hebrew" },
    { label: "English", value: "English" },
    { label: "Arabic", value: "Arabic" },
    { label: "Russian", value: "Russian" },
    { label: "French", value: "French" },
    { label: "Spanish", value: "Spanish" },
    { label: "Other", value: "Other" },
  ];

  const locationOptions = [
    { label: "Hostages Square", value: "Hostages Square" },
    { label: "Zoom", value: "Zoom" },
    { label: "North", value: "North" },
    { label: "South", value: "South" },
    { label: "Offices", value: "Offices" },
    { label: "Jerusalem", value: "Jerusalem" },
    { label: "Center", value: "Center" },
    { label: "Shfela", value: "Shfela" },
    { label: "Across the green line", value: "Across the green line" },
  ];

  const channels = channelOptions.map((opt) => opt.value);
  const languages = languageOptions.map((opt) => opt.value);
  const locations = locationOptions.map((opt) => opt.value);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const {
        channels: filterChannels,
        languages: filterLanguages,
        locations: filterLocations,
      } = filters;

      if (filterChannels?.length && !filterChannels.includes(event.channel))
        return false;
      if (filterLanguages?.length && !filterLanguages.includes(event.language))
        return false;
      if (filterLocations?.length && !filterLocations.includes(event.location))
        return false;

      return true;
    });
  }, [events, filters]); // Recompute when events or filters change

  // Update filter function to set filters
  const filterEvents = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  return (
    <EventsContext.Provider
      value={{
        events,
        myEvents,
        isLoading,
        isLoadingRegisterID,
        isLoadingUnregisterID,
        error,
        channels,
        languages,
        locations,
        filteredEvents,
        filters,
        createEvent,
        updateEvent,
        deleteEvent,
        approveEvent,
        unapproveEvent,
        registerToEvent,
        unregisterFromEvent,
        refetchEvents: fetchEvents,
        refetchMyEvents: fetchMyEvents,
        filterEvents: filterEvents,
        resetFilters,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
