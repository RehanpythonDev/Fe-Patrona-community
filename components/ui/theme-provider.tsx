// Lightweight ThemeProvider without external deps.
"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  attribute?: "class";
  defaultTheme?: Theme;
  enableSystem?: boolean;
  storageKey?: string;
  disableTransitionOnChange?: boolean;
};

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  storageKey = "patrona-theme",
  disableTransitionOnChange = true,
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(
    defaultTheme === "dark" ? "dark" : "light",
  );

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey) as Theme | null;
      if (stored === "light" || stored === "dark" || stored === "system") {
        setTheme(stored);
      } else {
        setTheme(defaultTheme);
      }
    } catch {
      setTheme(defaultTheme);
    }
  }, [defaultTheme, storageKey]);

  React.useEffect(() => {
    if (!enableSystem && theme === "system") {
      setResolvedTheme("light");
      return;
    }

    const updateResolved = () => {
      const next = theme === "system" ? getSystemTheme() : theme;
      setResolvedTheme(next);
    };

    updateResolved();
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => updateResolved();
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, [theme, enableSystem]);

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    if (disableTransitionOnChange) {
      root.classList.add("[&_*]:!transition-none");
      window.setTimeout(() => root.classList.remove("[&_*]:!transition-none"), 0);
    }

    if (attribute === "class") {
      if (resolvedTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }

    try {
      window.localStorage.setItem(storageKey, theme);
    } catch {}
  }, [attribute, resolvedTheme, storageKey, theme, disableTransitionOnChange]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme: () =>
        setTheme((prev) => {
          const nextResolved = prev === "system" ? resolvedTheme : prev;
          return nextResolved === "dark" ? "light" : "dark";
        }),
    }),
    [theme, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
