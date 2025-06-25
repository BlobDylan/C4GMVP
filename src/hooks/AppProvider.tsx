import { ReactNode } from "react";
import { AuthProvider } from "./useAuth";
import { EventsProvider } from "./useEvents";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <EventsProvider>{children}</EventsProvider>
    </AuthProvider>
  );
}
