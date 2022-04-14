import { BackTop, Tabs } from "antd";
import Head from "next/head";
import React, { useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { StickyContainer, Sticky } from "react-sticky";
import { ApartmentList } from "components/ApartmentList";
import CommonHead from "components/CommonHead";
import { FiltersForm } from "components/FiltersForm";
import {
  APP_TITLE,
  DOMAIN_URL,
  HOMEPAGE_META_DESCRIPTION,
} from "constants/config";
import { trackEvent } from "utils/analytics";

const { TabPane } = Tabs;

const AppPage = () => {
  const [apartmentList, setApartmentList] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoadingApartmentList, setIsLoadingApartmentList] = useState(false);
  const [isInitialSearchDone, setIsInitialSearchDone] = useState(false);
  const listRef = useRef();

  const onTabChange = (key) => {
    // eslint-disable-next-line
    if (key == 2) {
      trackEvent("notifications-tab", "notifications-tab-not-ready");
    }
  };

  const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
      {({ style }) => (
        <DefaultTabBar
          {...props}
          className="site-custom-tab-bar"
          style={{ ...style }}
        />
      )}
    </Sticky>
  );

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
      <StickyContainer>
        <Tabs
          onChange={onTabChange}
          defaultActiveKey="1"
          centered
          size="large"
          type="card"
          renderTabBar={renderTabBar}
        >
          <TabPane
            tab={
              <span>
                <HiSearch className="mr-1 mb-1 inline" />
                Pretraga
              </span>
            }
            key="1"
          >
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
          </TabPane>
          <TabPane
            tab={
              <span>
                <IoMdNotificationsOutline className="mr-1 mb-1 inline" />
                Pronađeni stanovi
              </span>
            }
            key="2"
          >
            <p className="text-center mx-10">
              Drago nam je što možemo da Vas obavestimo da ćete uskoro moći da
              koristite novu funkcionalnost u okviru FlatMe veb aplikacije.
              Aktiviranjem obaveštenja u okviru aplikacije, nezavisno od
              trenutnih email obaveštenja, ćete na ovoj stranici moći da vidite
              sve stanove koje je FlatMe aplikacija pronašla za Vas.
            </p>
          </TabPane>
        </Tabs>
      </StickyContainer>
    </div>
  );
};

export default AppPage;
