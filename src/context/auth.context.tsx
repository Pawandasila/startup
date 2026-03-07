"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { User, AuthResponse } from "@/module/auth/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  setAuth: (data: AuthResponse) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const initializeAuth = () => {
      const savedUser = localStorage.getItem("auth_user");
      let user: User | null = null;

      if (savedUser) {
        try {
          user = JSON.parse(savedUser);
        } catch (e) {
          console.error("Failed to parse saved user", e);
        }
      }

      Promise.resolve().then(() => {
        setState({ user, isLoading: false });
      });
    };

    initializeAuth();
  }, []);

  const setAuth = useCallback((data: AuthResponse) => {
    setState({ user: data.user, isLoading: false });
    localStorage.setItem("auth_user", JSON.stringify(data.user));
    localStorage.setItem("access_token", data.accessToken);
    localStorage.setItem("refresh_token", data.refreshToken);
  }, []);

  const clearAuth = useCallback(() => {
    setState({ user: null, isLoading: false });
    localStorage.removeItem("auth_user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
