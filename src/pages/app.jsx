import { BackTop } from "antd";
import Head from "next/head";
import React, { useRef, useState } from "react";
import { ApartmentList } from "components/ApartmentList";
import CommonHead from "components/CommonHead";
import { FiltersForm } from "components/FiltersForm";
import {
  APP_TITLE,
  DOMAIN_URL,
  HOMEPAGE_META_DESCRIPTION,
} from "constants/config";

const AppPage = () => {
  const [apartmentList, setApartmentList] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoadingApartmentList, setIsLoadingApartmentList] = useState(false);
  const [isInitialSearchDone, setIsInitialSearchDone] = useState(false);
  const listRef = useRef();

  return (
    <div className="px-2 mt-2">
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

        <meta property="og:title" content={APP_TITLE} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={DOMAIN_URL} />

        <link rel="canonical" href={DOMAIN_URL} />
        <title>{APP_TITLE}</title>
      </Head>
      <FiltersForm
        setApartmentList={setApartmentList}
        setFilters={setFilters}
        setIsLoadingApartmentList={setIsLoadingApartmentList}
        setIsInitialSearchDone={setIsInitialSearchDone}
        isInitialSearchDone={isInitialSearchDone}
        listRef={listRef}
      />
      <ApartmentList
        apartmentList={apartmentList}
        setApartmentList={setApartmentList}
        isLoadingApartmentList={isLoadingApartmentList}
        setIsLoadingApartmentList={setIsLoadingApartmentList}
        filters={filters}
        listRef={listRef}
        isInitialSearchDone={isInitialSearchDone}
      />
      {!isLoadingApartmentList && <BackTop />}
    </div>
  );
};

export default AppPage;
