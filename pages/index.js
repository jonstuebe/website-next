import matter from "gray-matter";
import { isAfter } from "date-fns";

import Layout from "../components/Layout";
import PostList from "../components/PostList";

const Index = ({ posts, title, description, ...props }) => {
  return (
    <Layout pageTitle={title}>
      <main>
        <PostList posts={posts} />
      </main>
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`);

  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    return keys
      .map((key, index) => {
        let slug = key.replace(/^.*[\\\/]/, "").slice(0, -3);
        const value = values[index];
        let document = matter(value.default);

        return {
          frontmatter: document.data,
          markdownBody: document.content,
          slug,
        };
      })
      .sort((firstPost, secondPost) => {
        if (isAfter(firstPost.frontmatter.date, secondPost.frontmatter.date)) {
          return -1;
        } else {
          return 1;
        }
      })
      .map((post) => {
        if (post.frontmatter.date && post.frontmatter.date.toISOString) {
          post.frontmatter.date = post.frontmatter.date.toISOString();
        }
        return post;
      });
  })(require.context("../posts", true, /\.md$/));

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  };
}
