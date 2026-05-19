// src/lib/store/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { User, AuthTokens, LoginCredentials, RegisterData } from "@/types";
import { loginUser, registerUser, getUserProfile } from "@/lib/api/auth";

interface AuthState {
  user:        User | null;
  tokens:      AuthTokens | null;
  isLoading:   boolean;
  isLoggedIn:  boolean;
}

interface AuthContextValue extends AuthState {
  login:    (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData)            => Promise<void>;
  logout:   ()                              => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "kenakata_tokens";
const USER_KEY  = "kenakata_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user:       null,
    tokens:     null,
    isLoading:  true,
    isLoggedIn: false,
  });

  // Mount e localStorage theke restore koro
  useEffect(() => {
    const restoreSession = () => {
      try {
        const rawTokens = localStorage.getItem(TOKEN_KEY);
        const rawUser   = localStorage.getItem(USER_KEY);

        if (rawTokens && rawUser) {
          const tokens: AuthTokens = JSON.parse(rawTokens);
          const user:   User       = JSON.parse(rawUser);

          setState({
            user,
            tokens,
            isLoading:  false,
            isLoggedIn: true,
          });

          // Cookie o set koro middleware er jonno
          document.cookie = `access_token=${tokens.access_token}; path=/; max-age=${60 * 60 * 24 * 7}`;
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    restoreSession();
  }, []);

  // Login
  const login = useCallback(async (credentials: LoginCredentials) => {
    const tokens = await loginUser(credentials);

    // Token diye profile fetch koro
    const user = await getUserProfile(tokens.access_token);

    // State update
    setState({
      user,
      tokens,
      isLoading:  false,
      isLoggedIn: true,
    });

    // Persist koro
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
    localStorage.setItem(USER_KEY,   JSON.stringify(user));

    // Cookie set — middleware check korbe
    document.cookie = `access_token=${tokens.access_token}; path=/; max-age=${60 * 60 * 24 * 7}`;
  }, []);

  // Register
  const register = useCallback(async (data: RegisterData) => {
    // User create koro
    await registerUser(data);

    // Auto login after register
    await login({ email: data.email, password: data.password });
  }, [login]);

  // Logout
  const logout = useCallback(() => {
    setState({
      user:       null,
      tokens:     null,
      isLoading:  false,
      isLoggedIn: false,
    });

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    // Cookie clear
    document.cookie = "access_token=; path=/; max-age=0";

    window.location.href = "/";
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}