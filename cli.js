const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
const chalk = require("chalk");
const { isObject } = require("lodash");
const prompts = require("prompts");

function toFrontMatter(obj, fields = []) {
  const bookends = "---";
  const data = fields
    .map((field) => {
      if (isObject(field) && field.type === "multiline") {
        return `${field.name}: >-\n`;
      }

      if (obj[field]) {
        return `${field}: ${obj[field]}`;
      }

      return `${field}: `;
    })
    .join("\n");

  return bookends + "\n" + data + "\n" + bookends + "\n\n";
}

(async () => {
  const response = await prompts([
    {
      type: "select",
      name: "type",
      message: "What type of content?",
      choices: [
        { title: "Post", description: "", value: "post" },
        { title: "Note", description: "", value: "note" },
      ],
    },
    {
      type: (prev) => (prev === "post" ? "text" : null),
      name: "title",
      message: `What's the title?`,
      validate: (value) => value !== "",
    },
    {
      type: "date",
      name: "date",
      message: `What's the date?`,
    },
  ]);

  response.date = `"${response.date.toISOString()}"`;

  let filepath = "";
  let fields = [];

  if (response.type === "post") {
    response.image =
      "https://source.unsplash.com/<unsplash_id>/<width>x<height>";
    response.slug = slugify(response.title).toLowerCase();

    filepath = path.join(__dirname, "posts", `${response.slug}.md`);
    fields = ["title", { name: "summary", type: "multiline" }, "date", "image"];
  } else if (response.type === "note") {
    filepath = path.join(__dirname, "notes", `${response.slug}.md`);
    fields = ["date"];
  }

  fs.writeFileSync(filepath, toFrontMatter(response, fields), {
    encoding: "utf8",
  });

  console.log(chalk.greenBright(`created new ${response.type}: ${filepath}`));
})();
