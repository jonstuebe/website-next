import { useEffect } from "react";
import Head from "next/head";

import useLocalStorage from "../hooks/useLocalStorage";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, pageTitle, ...props }) {
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
    if (mode === "light") {
      document.getElementsByTagName("html")[0].classList.add("light");
    } else {
      document.getElementsByTagName("html")[0].classList.remove("light");
    }
  }, [mode]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <title>{pageTitle}</title>
      </Head>
      <section className="layout">
        <Header mode={mode} setMode={setMode} />
        <div className="content">{children}</div>
        <Footer />
      </section>
    </>
  );
}
