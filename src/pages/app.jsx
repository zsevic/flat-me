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
  APARTMENT_LIST_TAB,
  APP_TITLE,
  DOMAIN_URL,
  HOMEPAGE_META_DESCRIPTION,
  PAGE_SIZE,
  SEARCH_TAB,
} from "constants/config";
import { trackEvent } from "utils/analytics";
import { getTokenForPushNotifications } from "utils/push-notifications";
import { getFoundApartmentList } from "services/apartments";
import { getItem, TOKEN_KEY } from "utils/local-storage";
import eventBus from "utils/event-bus";
import { scroll } from "utils/scrolling";

const { TabPane } = Tabs;
const INITIAL_FOUND_COUNTER = 0;

const AppPage = ({ query }) => {
  const [apartmentList, setApartmentList] = useState([]);
  const [foundApartmentList, setFoundApartmentList] = useState([]);
  const [clickedFoundApartments, setClickedFoundApartments] = useState([]);
  const [tabKey, setTabKey] = useState(SEARCH_TAB);
  const [foundApartmentsCounter, setFoundApartmentsCounter] = useState(
    INITIAL_FOUND_COUNTER
  );
  const [
    showDefaultTextForFoundApartmentsTab,
    setShowDefaultTextForFoundApartmentsTab,
  ] = useState(true);
  const [filters, setFilters] = useState({});
  const [token, setToken] = useState(null);
  const [isLoadingApartmentList, setIsLoadingApartmentList] = useState(false);
  const [isLoadingFoundApartmentList, setIsLoadingFoundApartmentList] =
    useState(true);
  const [isInitialSearchDone, setIsInitialSearchDone] = useState(false);
  const [isInitialFoundSearchDone, setIsInitialFoundSearchDone] =
    useState(false);
  const listRef = useRef();
  const headerRef = useRef();

  const handleFoundApartmentsTab = async () => {
    const storedToken = getItem(TOKEN_KEY);
    if (!storedToken) {
      setIsLoadingFoundApartmentList(false);
      setShowDefaultTextForFoundApartmentsTab(true);
      return;
    }
    setShowDefaultTextForFoundApartmentsTab(false);
    if (isInitialFoundSearchDone) return;
    setIsLoadingFoundApartmentList(true);
    const accessToken = await getTokenForPushNotifications();
    setToken(accessToken);
    const { data, pageInfo } = await getFoundApartmentList({
      token: accessToken,
      limitPerPage: PAGE_SIZE,
    });
    eventBus.dispatch("found-apartment-list-page-changed", {
      hasNextPage: pageInfo.hasNextPage,
      endCursor: pageInfo.endCursor,
    });
    setIsLoadingFoundApartmentList(false);
    setFoundApartmentList(data);
    setIsInitialFoundSearchDone(true);
    scroll(headerRef);
  };

  useEffect(() => {
    const { foundCounter, clicked } = query;
    if (
      !Number.isNaN(clicked) ||
      (Array.isArray(clicked) &&
        clicked.filter((index) => Number.isInteger(Number(index))).length > 0)
    ) {
      const clickedArray = !Array.isArray(clicked) ? [clicked] : clicked;
      setClickedFoundApartments(
        clickedArray.map((clickedIndex) => Number(clickedIndex))
      );
    }

    if (
      foundCounter &&
      !Number.isNaN(Number(foundCounter)) &&
      Number.isInteger(Number(foundCounter))
    ) {
      setFoundApartmentsCounter(foundCounter);
    }

    if (query.tab === APARTMENT_LIST_TAB) {
      setTabKey(query.tab);
      handleFoundApartmentsTab().catch(console.error);
    }
  }, []);

  const onTabChange = async (key) => {
    setTabKey(key);
    // eslint-disable-next-line
    if (key === APARTMENT_LIST_TAB) {
      await handleFoundApartmentsTab();
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
        token={token}
        setToken={setToken}
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
          {showDefaultTextForFoundApartmentsTab ? (
            <p className="text-center pt-20 mx-10">
              Obaveštenja nisu uključena.
            </p>
          ) : (
            <>
              <FoundApartmentList
                apartmentList={foundApartmentList}
                setApartmentList={setFoundApartmentList}
                isLoadingFoundApartmentList={isLoadingFoundApartmentList}
                setIsLoadingFoundApartmentList={setIsLoadingFoundApartmentList}
                token={token}
                foundCounter={foundApartmentsCounter}
                setFoundCounter={setFoundApartmentsCounter}
                clickedFoundApartments={clickedFoundApartments}
              />
              {!isLoadingFoundApartmentList && <BackTop />}
            </>
          )}
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
      <div ref={headerRef}>{appPage()}</div>
    </div>
  );
};

AppPage.getInitialProps = ({ query }) => ({ query });

AppPage.propTypes = {
  query: PropTypes.shape({
    tab: PropTypes.string,
    foundCounter: PropTypes.number,
    clicked: PropTypes.arrayOf(PropTypes.string),
  }),
};

AppPage.defaultProps = {
  query: {
    tabs: SEARCH_TAB,
    foundCounter: INITIAL_FOUND_COUNTER,
    clicked: [],
  },
};

export default AppPage;
