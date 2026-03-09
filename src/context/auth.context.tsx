"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { User, AuthResponse } from "@/module/auth/types";
import { axiosInstance } from "@/hooks/use-axios";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  setAuth: (data: AuthResponse) => void;
  clearAuth: () => void;
  logout: () => Promise<void>;
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
    let isMounted = true;

    const initializeAuth = async () => {
      const savedUser = localStorage.getItem("auth_user");
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          if (isMounted) setState({ user, isLoading: false });
        } catch (e) {
          console.error("Failed to parse saved user", e);
        }
      }

      try {
        const response = await axiosInstance.get("/user/profile");

        if (response.status === 200) {
          const freshUser = response.data.data;
          if (isMounted) {
            setState({ user: freshUser, isLoading: false });
            localStorage.setItem("auth_user", JSON.stringify(freshUser));
          }
        } else {
          if (isMounted && !savedUser)
            setState({ user: null, isLoading: false });
        }
      } catch (error) {
        console.error("Failed to rehydrate session:", error);
        if (isMounted) {
          setState({ user: null, isLoading: false });
          localStorage.removeItem("auth_user");
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const setAuth = useCallback((data: AuthResponse) => {
    setState({ user: data.user, isLoading: false });
    localStorage.setItem("auth_user", JSON.stringify(data.user));
  }, []);

  const clearAuth = useCallback(() => {
    setState({ user: null, isLoading: false });
    localStorage.removeItem("auth_user");
  }, []);

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  useEffect(() => {
    const handleLogout = () => {
      clearAuth();
    };
    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, [clearAuth]);

  return (
    <AuthContext.Provider value={{ ...state, setAuth, clearAuth, logout }}>
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
