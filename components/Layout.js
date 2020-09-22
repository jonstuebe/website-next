import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, pageTitle, ...props }) {
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
        <Header />
        <div className="content">{children}</div>
        <Footer />
      </section>
    </>
  );
}
