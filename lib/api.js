import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { format, parseISO } from "date-fns";
import readingTime from "reading-time";

const postsDirectory = join(process.cwd(), "posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return fields.reduce((items, field) => {
    if (field === "slug") {
      items[field] = realSlug;
      return items;
    }
    if (field === "content") {
      items[field] = content;
      return items;
    }

    if (field === "readingTime") {
      items[field] = readingTime(content).text;
      return items;
    }

    if (field === "date") {
      items.dateObj = data[field];
      items[field] = format(parseISO(data[field]), "PPP");
      return items;
    }

    if (data[field]) {
      items[field] = data[field];
      return items;
    }

    return items;
  }, {});
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.dateObj > post2.dateObj ? "-1" : "1"));
  return posts;
}

const notesDirectory = join(process.cwd(), "notes");

export function getNoteSlugs() {
  return fs.readdirSync(notesDirectory);
}

export function getNoteBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(notesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return fields.reduce((items, field) => {
    if (field === "slug") {
      items[field] = realSlug;
      return items;
    }
    if (field === "content") {
      items[field] = content;
      return items;
    }

    if (field === "date") {
      items.dateObj = data[field];
      items[field] = format(parseISO(data[field]), "PPP");
      return items;
    }

    if (data[field]) {
      items[field] = data[field];
      return items;
    }

    return items;
  }, {});
}

export function getAllNotes(fields = []) {
  const slugs = getNoteSlugs();
  const notes = slugs
    .map((slug) => getNoteBySlug(slug, fields))
    // sort notes by date in descending order
    .sort((note1, note2) => (note1.dateObj > note2.dateObj ? "-1" : "1"));
  return notes;
}
