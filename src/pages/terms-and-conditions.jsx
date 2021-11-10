import Head from "next/head";
import React from "react";
import CommonHead from "components/CommonHead";
import { Header } from "components/Header";
import {
  DOMAIN_URL,
  HOMEPAGE_META_DESCRIPTION,
  TERMS_AND_CONDITIONS_PAGE_TITLE,
} from "constants/config";

const TermsAndConditionsPage = () => (
  <div className="text-center">
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

      <meta property="og:title" content={TERMS_AND_CONDITIONS_PAGE_TITLE} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN_URL}/terms-and-conditions`} />

      <link rel="canonical" href={`${DOMAIN_URL}/terms-and-conditions`} />
      <title>{TERMS_AND_CONDITIONS_PAGE_TITLE}</title>
    </Head>
    <Header />U pripremi...
  </div>
);

export default TermsAndConditionsPage;
