import { useEffect } from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { format, parseISO } from "date-fns";

import { serializePostDate, addReadingTime } from "../index";

import CodeBlock from "../../components/CodeBlock";
import Layout from "../../components/Layout";

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>;

  const date = format(parseISO(frontmatter.date), "PPP");

  useEffect(() => {
    var links = document.links;

    // set all external links to _blank
    for (var i = 0, linksLength = links.length; i < linksLength; i++) {
      if (links[i].hostname != window.location.hostname) {
        links[i].target = "_blank";
      }
    }
  }, []);

  return (
    <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
      <article className="post">
        <h1 className="post__title">{frontmatter.title}</h1>
        <h2 className="post__date">{date}</h2>
        <span className="post__length">{frontmatter.length.text}</span>
        <div className="post__content">
          <ReactMarkdown
            source={markdownBody}
            renderers={{ code: CodeBlock }}
          />
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params;

  const content = await import(`../../posts/${postname}.md`);
  const config = await import(`../../siteconfig.json`);
  let document = matter(content.default);

  const post = addReadingTime(
    serializePostDate({
      frontmatter: document.data,
      markdownBody: document.content,
    })
  );

  return {
    props: {
      siteTitle: config.title,
      ...post,
    },
  };
}

export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    const keys = context.keys();
    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, "").slice(0, -3);

      return slug;
    });
    return data;
  })(require.context("../../posts", true, /\.md$/));

  const paths = blogSlugs.map((slug) => `/post/${slug}`);

  return {
    paths,
    fallback: false,
  };
}
