import remark from "remark";
import html from "remark-html";
import externalLinks from "remark-external-links";
import prism from "remark-prism";
import slug from "remark-slug";
import headings from "remark-autolink-headings";

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(slug)
    .use(headings, {
      behavior: "append",
    })
    .use(externalLinks)
    .use(html)
    .use(prism, {
      transformInlineCode: true,
    })
    .process(markdown);
  return result.toString();
}
