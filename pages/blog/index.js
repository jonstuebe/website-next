import Head from "next/head";
import Link from "next/link";

import Layout from "../../components/Layout";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";

import { getAllPosts } from "../../lib/api";

export default function Posts({ posts }) {
  return (
    <>
      <Head>
        <title>Blog | Jon Stuebe</title>
      </Head>
      <Layout>
        <Header />
        <main>
          <h1 className="text-5xl lg:text-8xl tracking-tight lg:py-32 py-24 text-center motion-safe:animate-text-in-slow select-none">
            Blog
          </h1>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, key) => {
              return (
                <Link passHref href={`/blog/${post.slug}`} key={key}>
                  <a className="no-underline">
                    <Card
                      image={post.image}
                      title={post.title}
                      className="motion-safe:animate-fade-in"
                    >
                      <h3 className="absolute m-0 p-0 text-white opacity-80 text-base bottom-4 left-4">
                        {post.date}
                      </h3>
                    </Card>
                  </a>
                </Link>
              );
            })}
          </section>
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts(["slug", "title", "date", "image"]);

  return {
    props: {
      posts,
    },
  };
}
