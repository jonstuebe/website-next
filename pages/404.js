import Head from "next/head";
import Link from "next/link";

import Layout from "../components/Layout";
import { Header } from "../components/Header";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Home | Jon Stuebe</title>
      </Head>
      <Layout>
        <Header />
        <main>
          <div className="flex flex-row items-center justify-center py-40">
            <h1 className="text-6xl tracking-tight motion-safe:animate-text-in-slow select-none">
              404
            </h1>
            <div className="h-32 mx-8 w-1 bg-gray-300 dark:bg-white" />
            <h2 className="text-6xl tracking-tight motion-safe:animate-text-in-slow select-none">
              Page Not Found
            </h2>
          </div>
        </main>
      </Layout>
    </>
  );
}
