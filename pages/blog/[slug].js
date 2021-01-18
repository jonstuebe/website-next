import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "../../components/Layout";
import { Header } from "../../components/Header";
import { PostImage } from "../../components/PostImage";

import { getPostBySlug, getAllPosts } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";

export default function Post({ post, morePosts, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{post.title} | Jon Stuebe</title>
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:image" content={post.image} />

        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.summary} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={post.image} />
      </Head>
      <div className="w-full relative">
        <PostImage image={post.image} />
        <Layout className="relative z-10">
          <Header />
          <main>
            <h2 className="text-4xl font-extrabold tracking-tight text-center mt-32 mb-2 motion-safe:animate-text-in-slow">
              {post.title}
            </h2>
            <h3 className="text-xl lg:text-2xl text-center font-normal dark:font-light text-gray-600 dark:text-white mt-0 mb-24 motion-safe:animate-text-in-slow">
              {post.date}
            </h3>
            <article
              className="prose dark:prose-dark lg:prose-xl dark:lg:prose-xl w-full lg:max-w-4xl m-auto mb-32 motion-safe:animate-fade-in-slow"
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            ></article>
          </main>
        </Layout>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content",
    "summary",
    "image",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
