import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { THEME_COLOR } from "constants/config";

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="sr">
        <Head>
          <link rel="icon" href="/favicon.svg" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap"
            rel="stylesheet"
          />
          <meta name="theme-color" content={THEME_COLOR} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
