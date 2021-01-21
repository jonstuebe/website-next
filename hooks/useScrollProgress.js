import { useEffect, useState } from "react";

function calcScrollProgress() {
  if (typeof window !== "undefined") {
    const body = document.body,
      html = document.documentElement;

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    return window.scrollY / (height - window.innerHeight);
  }
  return 0;
}

export default function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(
    () => calcScrollProgress
  );

  useEffect(() => {
    const onScroll = () => {
      setScrollProgress(calcScrollProgress());
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scrollProgress;
}
