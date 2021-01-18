import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class AppDocument extends Document {
  render() {
    return (
      <Html className="overflow-y-scroll">
        <Head />
        <body className="m-0 antialiased font-sans bg-gray-100 text-black dark:bg-black dark:text-white scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-900 scrollbar-thumb-rounded-lg">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
