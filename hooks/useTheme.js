import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ThemeContext = createContext({ mode: "dark", setMode: () => {} });
export const useTheme = () => {
  return useContext(ThemeContext);
};

export function ThemeProvider({ children }) {
  const [mode, setMode] = useLocalStorage(
    "mode",
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark"
  );

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          const newColorScheme = e.matches ? "dark" : "light";
          setMode(newColorScheme);
        });
    }
  }, []);

  useEffect(() => {
    let htmlElement = document.getElementsByTagName("html")[0];
    if (mode === "light") {
      htmlElement.classList.add("light");
    } else {
      htmlElement.classList.remove("light");
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
