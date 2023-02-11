import { BackTop } from "antd";
import Head from "next/head";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { ApartmentList } from "components/ApartmentList";
import CommonHead from "components/CommonHead";
import { FiltersForm } from "components/FiltersForm";
import {
  APP_TITLE,
  DOMAIN_URL,
  HOMEPAGE_META_DESCRIPTION,
  INITIAL_FOUND_APARTMENTS_COUNTER,
  SEARCH_TAB,
} from "constants/config";
import { useAppContext } from "context";
import { INITIALIZE_STORE } from "context/constants";
import { initialState } from "context/reducer";
import { getItem, STATE_KEY } from "utils/local-storage";

const AppPage = () => {
  const { state, dispatch } = useAppContext();
  const headerRef = useRef();

  useEffect(() => {
    const stateItem = getItem(STATE_KEY);
    if (!stateItem) return;

    const parsedState = JSON.parse(stateItem);
    const updatedState = {
      ...initialState,
      accessToken: parsedState.accessToken,
      filters: parsedState.filters,
      isPushNotificationActivated: parsedState.isPushNotificationActivated,
      isPushNotificationSupported: parsedState.isPushNotificationSupported,
    };
    dispatch({
      type: INITIALIZE_STORE,
      payload: updatedState,
    });
  }, []);

  const searchTab = () => (
    <>
      <FiltersForm />
      <ApartmentList />
      {!state.isLoadingApartmentList && <BackTop />}
    </>
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
      <div ref={headerRef}>{searchTab()}</div>
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
