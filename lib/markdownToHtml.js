import remark from "remark";
import html from "remark-html";
import externalLinks from "remark-external-links";
import prism from "remark-prism";

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(externalLinks)
    .use(html)
    .use(prism, {
      transformInlineCode: true,
    })
    .process(markdown);
  return result.toString();
}
