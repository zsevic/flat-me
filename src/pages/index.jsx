import { BackTop } from "antd";
import Head from "next/head";
import React, { useRef, useState } from "react";
import { ApartmentList } from "components/ApartmentList";
import CommonHead from "components/CommonHead";
import { FiltersForm } from "components/FiltersForm";
import { Header } from "components/Header";
import {
  DOMAIN_URL,
  HOMEPAGE_META_DESCRIPTION,
  HOMEPAGE_TITLE,
} from "constants/config";

const IndexPage = () => {
  const [apartmentList, setApartmentList] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoadingApartmentList, setIsLoadingApartmentList] = useState(false);
  const [total, setTotal] = useState(null);
  const listRef = useRef();

  return (
    <div>
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
      <Header />
      <FiltersForm
        setApartmentList={setApartmentList}
        setIsLoadingApartmentList={setIsLoadingApartmentList}
        setFilters={setFilters}
        setTotal={setTotal}
        total={total}
        listRef={listRef}
      />
      {total !== null && (
        <ApartmentList
          apartmentList={apartmentList}
          setApartmentList={setApartmentList}
          isLoadingApartmentList={isLoadingApartmentList}
          setIsLoadingApartmentList={setIsLoadingApartmentList}
          filters={filters}
          listRef={listRef}
          total={total}
        />
      )}
      <BackTop />
    </div>
  );
};

export default IndexPage;
