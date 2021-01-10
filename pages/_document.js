import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="antialiased font-sans bg-gray-100 text-black dark:bg-black dark:text-white lg:max-w-5xl lg:px-0 px-6 mx-auto">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
