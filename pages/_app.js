import Head from "next/head";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
