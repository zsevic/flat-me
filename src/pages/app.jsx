import { BackTop, Badge, Tabs } from "antd";
import { isSupported } from "firebase/messaging";
import Head from "next/head";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { StickyContainer, Sticky } from "react-sticky";
import { ApartmentList } from "components/ApartmentList";
import CommonHead from "components/CommonHead";
import { FiltersForm } from "components/FiltersForm";
import { FoundApartmentList } from "components/FoundApartmentList";
import { PushNotificationsUnsubscribeModal } from "components/modals/PushNotificationUnsubscribe";
import {
  APARTMENT_LIST_TAB,
  APP_TITLE,
  DOMAIN_URL,
  HOMEPAGE_META_DESCRIPTION,
  INITIAL_FOUND_APARTMENTS_COUNTER,
  PAGE_SIZE,
  SEARCH_TAB,
} from "constants/config";
import { defaultNotificationsErrorMessage } from "constants/error-messages";
import { useAppContext } from "context";
import {
  SET_ACCESS_TOKEN,
  SET_FOUND_APARTMENT_LIST,
  SET_FOUND_APARTMENTS_COUNTER,
  SET_LOADING_FOUND_APARTMENT_LIST,
  INITIALIZE_STORE,
  SET_CLICKED_FOUND_APARTMENTS,
} from "context/constants";
import { initialState } from "context/reducer";
import { trackEvent } from "utils/analytics";
import { getTokenForPushNotifications } from "utils/push-notifications";
import { getFoundApartmentList } from "services/apartments";
import { getErrorMessageForPushNotifications } from "utils/error-messages";
import { getItem, STATE_KEY, TOKEN_KEY } from "utils/local-storage";
import { scroll } from "utils/scrolling";

const { TabPane } = Tabs;

const AppPage = ({ query }) => {
  const [tabKey, setTabKey] = useState(SEARCH_TAB);
  const [
    showDefaultTextForFoundApartmentsTab,
    setShowDefaultTextForFoundApartmentsTab,
  ] = useState(true);
  const [
    defaultTextForFoundApartmentsTab,
    setDefaultTextForFoundApartmentsTab,
  ] = useState(defaultNotificationsErrorMessage);
  const [isInitialFoundSearchDone, setIsInitialFoundSearchDone] =
    useState(false);
  const [isPushNotificationSupported, setIsPushNotificationSupported] =
    useState(false);
  const { state, dispatch } = useAppContext();
  const headerRef = useRef();

  const handleFoundApartmentsTab = async () => {
    try {
      const storedToken = getItem(TOKEN_KEY);
      if (!storedToken) {
        dispatch({
          type: SET_LOADING_FOUND_APARTMENT_LIST,
          payload: { isLoadingFoundApartmentList: false },
        });
        setShowDefaultTextForFoundApartmentsTab(true);
        return;
      }
      setShowDefaultTextForFoundApartmentsTab(false);
      if (isInitialFoundSearchDone) return;

      dispatch({
        type: SET_LOADING_FOUND_APARTMENT_LIST,
        payload: { isLoadingFoundApartmentList: true },
      });
      const accessToken = await getTokenForPushNotifications();
      dispatch({ type: SET_ACCESS_TOKEN, payload: { accessToken } });
      const { data, pageInfo } = await getFoundApartmentList({
        token: accessToken,
        limitPerPage: PAGE_SIZE,
      });
      dispatch({
        type: SET_LOADING_FOUND_APARTMENT_LIST,
        payload: { isLoadingFoundApartmentList: false },
      });
      dispatch({
        type: SET_FOUND_APARTMENT_LIST,
        payload: {
          foundApartmentList: data,
          foundApartmentListHasNextPage: pageInfo.hasNextPage,
          foundApartmentListEndCursor: pageInfo.endCursor,
        },
      });
      setIsInitialFoundSearchDone(true);
      scroll(headerRef);
    } catch (error) {
      const errorMessage = getErrorMessageForPushNotifications(error);
      dispatch({
        type: SET_LOADING_FOUND_APARTMENT_LIST,
        payload: { isLoadingFoundApartmentList: false },
      });
      setDefaultTextForFoundApartmentsTab(errorMessage);
      setShowDefaultTextForFoundApartmentsTab(true);
    }
  };

  useEffect(() => {
    const stateItem = getItem(STATE_KEY);
    if (!stateItem) return;

    const parsedState = JSON.parse(stateItem);
    const updatedState = {
      ...initialState,
      accessToken: parsedState.accessToken,
      filters: parsedState.filters,
      isPushNotificationActivated: parsedState.isPushNotificationActivated,
    };
    dispatch({
      type: INITIALIZE_STORE,
      payload: updatedState,
    });
  }, []);

  useEffect(() => {
    const { foundCounter, clicked } = query;
    if (
      !Number.isNaN(clicked) ||
      (Array.isArray(clicked) &&
        clicked.filter((index) => Number.isInteger(Number(index))).length > 0)
    ) {
      const clickedArray = !Array.isArray(clicked) ? [clicked] : clicked;
      const clickedFoundApartments = clickedArray.map((clickedIndex) =>
        Number(clickedIndex)
      );
      dispatch({
        type: SET_CLICKED_FOUND_APARTMENTS,
        payload: { clickedFoundApartments },
      });
    }

    if (
      foundCounter &&
      !Number.isNaN(Number(foundCounter)) &&
      Number.isInteger(Number(foundCounter))
    ) {
      dispatch({
        type: SET_FOUND_APARTMENTS_COUNTER,
        payload: { foundApartmentsCounter: foundCounter },
      });
    }

    if (query.tab === APARTMENT_LIST_TAB) {
      setTabKey(query.tab);
      handleFoundApartmentsTab();
    }
  }, []);

  const onTabChange = async (key) => {
    setTabKey(key);
    // eslint-disable-next-line
    if (key === APARTMENT_LIST_TAB) {
      await handleFoundApartmentsTab();
      trackEvent("found-apartments-tab", "found-apartments-tab");
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
      <FiltersForm />
      <ApartmentList />
      {!state.isLoadingApartmentList && <BackTop />}
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
            <span>
              <AiOutlineFileSearch className="mr-1 mb-1 inline" />
              Pronađeni stanovi <Badge count={state.foundApartmentsCounter} />
            </span>
          }
          key={APARTMENT_LIST_TAB}
        >
          {showDefaultTextForFoundApartmentsTab ? (
            <p className="text-center pt-20 mx-10">
              {defaultTextForFoundApartmentsTab}
            </p>
          ) : (
            <>
              <FoundApartmentList />
              {!state.isLoadingFoundApartmentList &&
                state.isPushNotificationActivated && (
                  <PushNotificationsUnsubscribeModal />
                )}
              {!state.isLoadingFoundApartmentList && <BackTop />}
            </>
          )}
        </TabPane>
      </Tabs>
    </StickyContainer>
  );

  useEffect(() => {
    if (isSupported()) {
      setIsPushNotificationSupported(true);
    }
  }, []);

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
      <div ref={headerRef}>
        {isPushNotificationSupported ? tabs() : searchTab()}
      </div>
    </div>
  );
};

AppPage.getInitialProps = ({ query }) => ({ query });

AppPage.propTypes = {
  query: PropTypes.shape({
    tab: PropTypes.string,
    foundCounter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    clicked: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  }),
};

AppPage.defaultProps = {
  query: {
    tabs: SEARCH_TAB,
    foundCounter: INITIAL_FOUND_APARTMENTS_COUNTER,
    clicked: [],
  },
};

export default AppPage;
