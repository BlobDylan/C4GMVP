import { ReactNode } from "react";
import { EventsProvider, AuthProvider } from "./";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <EventsProvider>{children}</EventsProvider>
    </AuthProvider>
  );
}
