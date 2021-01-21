import Head from "next/head";

import Layout from "../components/Layout";
import { Header } from "../components/Header";
// import { PostImage } from "../components/PostImage";

import markdownToHtml from "../lib/markdownToHtml";
import { getContentBySlug } from "../lib/api";

export default function Uses({ date, content }) {
  return (
    <>
      <Head>
        <title>Uses | Jon Stuebe</title>
        <meta
          name="description"
          content="A list of different things that I use"
        />
      </Head>
      <div className="w-full relative">
        <Layout>
          <Header />
          <main>
            <h2 className="text-4xl font-extrabold tracking-tight text-center mt-32 mb-2 motion-safe:animate-text-in-slow">
              Uses
            </h2>
            <h3 className="text-xl lg:text-2xl text-center font-normal dark:font-light text-gray-600 dark:text-gray-300 mt-0 mb-24 motion-safe:animate-text-in-slow">
              Last Updated: {date}
            </h3>

            <div
              className="prose dark:prose-dark lg:prose-xl dark:lg:prose-xl w-full lg:max-w-4xl m-auto mb-32 motion-safe:animate-fade-in-slow"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </main>
        </Layout>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const data = getContentBySlug("uses", ["date", "content"]);
  const content = await markdownToHtml(data.content);

  return {
    props: {
      ...data,
      content,
    },
  };
}
