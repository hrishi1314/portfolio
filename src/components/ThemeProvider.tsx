"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always initialize to "light" to match the server-rendered HTML default
  // (set via data-theme="light" on <html> in layout.tsx).
  // The useEffect below immediately resolves the real theme from
  // localStorage after hydration completes.
  // This guarantees server HTML === first client render === no hydration mismatch.
  const [theme, setTheme] = useState<Theme>("light");

  // On mount: sync to localStorage (source of truth); default to "light"
  useEffect(() => {
    const stored = localStorage.getItem("portfolio_theme") as Theme | null;
    const resolved: Theme = stored === "dark" ? "dark" : "light";

    setTheme(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
    if (!stored) localStorage.setItem("portfolio_theme", resolved);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("portfolio_theme", next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
