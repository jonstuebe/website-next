import { Sun, Moon } from "./icons";

import { useTheme } from "../hooks/useTheme";

export default function ThemeSwitcher() {
  const { mode, setMode } = useTheme();
  return (
    <button
      className="scheme-switcher"
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
    >
      {mode === "light" ? <Sun /> : <Moon />}
    </button>
  );
}
