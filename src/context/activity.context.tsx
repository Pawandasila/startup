"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

// --- Types ---

export type Theme = "system" | "light" | "dark";

export interface UserPreferences {
  notifications: boolean;
  marketingEmails: boolean;
  [key: string]: boolean | string | number | undefined;
}

export interface ActivityState {
  theme: Theme;
  preferences: UserPreferences;
  location: string | null;
  coordinates: { lat: number; lng: number } | null;
  isLocationConfirmed: boolean;
  isInitialized: boolean;
}

export interface ActivityContextActions {
  setTheme: (theme: Theme) => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  setLocation: (
    location: string,
    coordinates?: { lat: number; lng: number },
  ) => void;
  confirmLocation: () => void;
}

export type ActivityContextType = ActivityState & ActivityContextActions;

// --- Constants ---

const ACTIVITY_STORAGE_KEY = "startup_loop_activity_state";

const DEFAULT_STATE: ActivityState = {
  theme: "system",
  preferences: {
    notifications: true,
    marketingEmails: false,
  },
  location: null,
  coordinates: null,
  isLocationConfirmed: false,
  isInitialized: false,
};

// --- Context & Provider ---

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined,
);

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ActivityState>(DEFAULT_STATE);

  // Load initial state from local storage on mount
  useEffect(() => {
    const hydrateState = () => {
      try {
        const stored = localStorage.getItem(ACTIVITY_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if ("isInitialized" in parsed) {
            delete parsed.isInitialized;
          }

          setState({
            ...DEFAULT_STATE,
            ...parsed,
            isInitialized: true,
          });
        } else {
          setState((prev) => ({ ...prev, isInitialized: true }));
        }
      } catch (e) {
        console.error("Failed to load activity state from local storage", e);
        setState((prev) => ({ ...prev, isInitialized: true }));
      }
    };

    setTimeout(hydrateState, 0);
  }, []);

  useEffect(() => {
    if (!state.isInitialized) return;

    try {
      const stateToSave = { ...state };
      if ("isInitialized" in stateToSave) {
        delete (stateToSave as Partial<ActivityState>).isInitialized;
      }
      localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed to save activity state to local storage", e);
    }
  }, [state]);

  // --- Actions ---

  const setTheme = useCallback((theme: Theme) => {
    setState((prev) => ({ ...prev, theme }));
  }, []);

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...updates },
    }));
  }, []);

  const setLocation = useCallback(
    (location: string, coordinates?: { lat: number; lng: number }) => {
      setState((prev) => ({
        ...prev,
        location,
        coordinates: coordinates || prev.coordinates,
      }));
    },
    [],
  );

  const confirmLocation = useCallback(() => {
    setState((prev) => ({ ...prev, isLocationConfirmed: true }));
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      setTheme,
      updatePreferences,
      setLocation,
      confirmLocation,
    }),
    [state, setTheme, updatePreferences, setLocation, confirmLocation],
  );

  return (
    <ActivityContext.Provider value={contextValue}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error("useActivity must be used within an ActivityProvider");
  }
  return context;
}
