import Link from "next/link";
import { format, parseISO } from "date-fns";

export default function PostList({ posts }) {
  if (posts === "undefined") return null;

  return (
    <div>
      {posts ? (
        <ul className="posts-list">
          {posts.map((post, index) => {
            const date = format(parseISO(post.frontmatter.date), "PPP");
            return (
              <li className="posts-list__item" key={post.slug}>
                <article className="post">
                  <Link href={{ pathname: `/post/${post.slug}` }}>
                    <a className="post__title">{post.frontmatter.title}</a>
                  </Link>
                  <h2 className="post__date">{date}</h2>
                  <span className="post__length">
                    {post.frontmatter.length.text}
                  </span>
                  <div className="post__content">
                    <p>{post.frontmatter.summary}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>No posts!</div>
      )}
    </div>
  );
}
