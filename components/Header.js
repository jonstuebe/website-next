import Link from "next/link";

import { Sun, Moon } from "./icons";

export default function Header({ mode, setMode }) {
  return (
    <>
      <header className="site-header">
        <h1>
          <Link href="/">
            <a className="logotype">Jon Stuebe</a>
          </Link>
        </h1>
        <button
          className="scheme-switcher"
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
        >
          {mode === "light" ? <Sun /> : <Moon />}
        </button>
      </header>
    </>
  );
}
