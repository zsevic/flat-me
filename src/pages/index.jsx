import Head from "next/head";
import React from "react";
import { ThemeProvider } from "theme-ui";
import CommonHead from "components/CommonHead";
import {
  DOMAIN_URL,
  HOMEPAGE_META_DESCRIPTION,
  HOMEPAGE_TITLE,
} from "constants/config";
import { theme } from "landing/theme";
import { Layout } from "landing/components/layout";
import { Banner } from "landing/sections/banner";
import { ShareSection } from "landing/sections/share";
import { UltimateFeatures } from "landing/sections/ultimate-features";
import { Features } from "landing/sections/features";
import { UsefulFeatures } from "landing/sections/useful-features";
import { Widgets } from "landing/sections/widgets";
import { Subscription } from "landing/sections/subscription";

export default function LandingPage() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <CommonHead />
        <Head>
          <meta name="description" content={HOMEPAGE_META_DESCRIPTION} />

          <meta property="og:description" content={HOMEPAGE_META_DESCRIPTION} />
          <meta
            property="og:image"
            content={`${DOMAIN_URL}/assets/logo-main.png`}
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          <meta
            property="og:image"
            content={`${DOMAIN_URL}/assets/logo-whatsapp.png`}
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="400" />

          <meta property="og:title" content={HOMEPAGE_TITLE} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={DOMAIN_URL} />

          <link rel="canonical" href={DOMAIN_URL} />
          <title>{HOMEPAGE_TITLE}</title>
        </Head>
        <Banner />
        <ShareSection />
        <UltimateFeatures />
        <Features />
        <UsefulFeatures />
        <Widgets />
        <Subscription />
      </Layout>
    </ThemeProvider>
  );
}
