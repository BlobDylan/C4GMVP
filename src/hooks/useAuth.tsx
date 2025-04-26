import { createContext, useContext, useState, ReactNode } from "react";
import { User, SignupData } from "../types";

interface AuthContextType {
  user: User | null;
  registeredEventIds: string[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (data: SignupData) => Promise<void>;
  registerForEvent: (eventId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const mockUsers: User[] = [
  { id: "1", email: "test@test.com", name: "Test User" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<
    { userId: string; eventId: string }[]
  >([]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation
      const foundUser = mockUsers.find((u) => u.email === email);
      if (!foundUser || password !== "password") {
        throw new Error("Invalid credentials");
      }

      setUser(foundUser);
      // Load user's registrations
      const userRegistrations = registrations.filter(
        (r) => r.userId === foundUser.id
      );
      setRegisteredEventIds(userRegistrations.map((r) => r.eventId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (mockUsers.some((u) => u.email === data.email)) {
        throw new Error("Email already exists");
      }

      const newUser: User = {
        id: String(mockUsers.length + 1),
        email: data.email,
        name: data.firstName,
      };

      mockUsers.push(newUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const registerForEvent = async (eventId: string) => {
    if (!user) throw new Error("Not authenticated");
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (registeredEventIds.includes(eventId)) {
        throw new Error("Already registered for this event");
      }

      setRegistrations((prev) => [...prev, { userId: user.id, eventId }]);
      setRegisteredEventIds((prev) => [...prev, eventId]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setRegisteredEventIds([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        registeredEventIds,
        login,
        logout,
        signup,
        registerForEvent,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
