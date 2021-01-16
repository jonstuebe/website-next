import { useRouter } from "next/router";
import Head from "next/head";
import { Header } from "../../components/Header";

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
        <meta property="og:image" content={post.image} />
      </Head>
      <Header />
      <main>
        <h2 className="text-4xl font-extrabold tracking-tight text-center mt-32 mb-2">
          {post.title}
        </h2>
        <h3 className="text-xl lg:text-2xl text-center font-light mt-0 mb-24">
          {post.date}
        </h3>
        <article
          className="prose dark:prose-dark lg:prose-xl dark:lg:prose-xl w-full lg:max-w-4xl m-auto mb-32"
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        ></article>
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, ["title", "date", "slug", "content"]);
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
