import { BackTop, Badge, Tabs } from "antd";
import { isSupported } from "firebase/messaging";
import Head from "next/head";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { StickyContainer, Sticky } from "react-sticky";
import { ApartmentList } from "components/ApartmentList";
import CommonHead from "components/CommonHead";
import { FiltersForm } from "components/FiltersForm";
import { FoundApartmentList } from "components/FoundApartmentList";
import {
  APP_TITLE,
  DOMAIN_URL,
  HOMEPAGE_META_DESCRIPTION,
} from "constants/config";
import { trackEvent } from "utils/analytics";
import { getTokenForPushNotifications } from "utils/push-notifications";
import { getFoundApartmentList } from "services/apartments";

const { TabPane } = Tabs;
const SEARCH_TAB = "1";
const APARTMENT_LIST_TAB = "2";
const INITIAL_FOUND_COUNTER = 0;

const AppPage = ({ query }) => {
  const [apartmentList, setApartmentList] = useState([]);
  const [foundApartmentList, setFoundApartmentList] = useState([]);
  const [tabKey, setTabKey] = useState(SEARCH_TAB);
  const [foundApartmentsCounter, setFoundApartmentsCounter] = useState(
    INITIAL_FOUND_COUNTER
  );
  const [filters, setFilters] = useState({});
  const [isLoadingApartmentList, setIsLoadingApartmentList] = useState(false);
  const [isLoadingFoundApartmentList, setIsLoadingFoundApartmentList] =
    useState(false);
  const [isInitialSearchDone, setIsInitialSearchDone] = useState(false);
  const listRef = useRef();

  useEffect(() => {
    if (query.tab === APARTMENT_LIST_TAB) {
      setTabKey(query.tab);
    }

    const { foundCounter } = query;
    if (
      foundCounter &&
      !Number.isNaN(Number(foundCounter)) &&
      Number.isInteger(Number(foundCounter))
    ) {
      setFoundApartmentsCounter(foundCounter);
    }
  }, []);

  const onTabChange = async (key) => {
    setTabKey(key);
    // eslint-disable-next-line
    if (key === APARTMENT_LIST_TAB) {
      const token = await getTokenForPushNotifications();
      const list = await getFoundApartmentList(token);
      setIsLoadingFoundApartmentList(false);
      console.log("list", list);
      setFoundApartmentList(list.data);
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

  const searchTab = () => (
    <>
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
    </>
  );

  const tabs = () => (
    <StickyContainer>
      <Tabs
        onChange={onTabChange}
        defaultActiveKey={SEARCH_TAB}
        activeKey={tabKey}
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
          key={SEARCH_TAB}
        >
          {searchTab()}
        </TabPane>
        <TabPane
          tab={
            <Badge count={foundApartmentsCounter}>
              <span>
                <IoMdNotificationsOutline className="mr-1 mb-1 inline" />
                Pronađeni stanovi
              </span>
            </Badge>
          }
          key={APARTMENT_LIST_TAB}
        >
          <p className="text-center pt-20 mx-10">
            Drago nam je što možemo da Vas obavestimo da ćete uskoro moći da
            koristite novu funkcionalnost u okviru FlatMe veb aplikacije.
            Aktiviranjem obaveštenja u okviru aplikacije, nezavisno od trenutnih
            email obaveštenja, ćete na ovoj stranici moći da vidite sve stanove
            koje je FlatMe pronašao za Vas.
          </p>
          <FoundApartmentList
            apartmentList={foundApartmentList}
            isLoadingFoundApartmentList={isLoadingFoundApartmentList}
          />
        </TabPane>
      </Tabs>
    </StickyContainer>
  );

  const appPage = () => (isSupported() ? tabs() : searchTab());

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
      {appPage()}
    </div>
  );
};

AppPage.getInitialProps = ({ query }) => ({ query });

AppPage.propTypes = {
  query: PropTypes.shape({
    tab: PropTypes.string,
    foundCounter: PropTypes.number,
  }),
};

AppPage.defaultProps = {
  query: {
    tabs: SEARCH_TAB,
    foundCounter: INITIAL_FOUND_COUNTER,
  },
};

export default AppPage;
