/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "dashboard.auth";

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = safeParse(localStorage.getItem(STORAGE_KEY));
    if (stored?.user) setUser(stored.user);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user }));
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: (nextUser) => setUser(nextUser),
      logout: () => setUser(null),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
