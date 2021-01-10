import Head from "next/head";

import { getAllNotes } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";

import { Header } from "../../components/Header";
import { Note } from "../../components/Note";

export default function Notes({ notes }) {
  return (
    <>
      <Head>
        <title>Notes | Jon Stuebe</title>
      </Head>
      <Header />
      <main>
        <h1 className="text-8xl tracking-tight py-32 text-center motion-safe:animate-text-in-slow">
          Notes
        </h1>
        <section className="flex flex-col space-y-6">
          {notes.map((note, key) => (
            <Note key={key} date={note.date} content={note.content} />
          ))}
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const notesData = getAllNotes(["slug", "date", "content"]);

  const notesContent = await Promise.all(
    notesData.map((note) => markdownToHtml(note.content || ""))
  );

  return {
    props: {
      notes: notesData.map((note, index) => {
        note.content = notesContent[index];
        return note;
      }),
    },
  };
}
