import { Avatar, Button, Card, Empty, Image, List, Row, Skeleton } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { CgPlayListAdd } from "react-icons/cg";
import { FaMapMarkedAlt } from "react-icons/fa";
import { GiMoneyStack, GiSofa, GiStairs } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import {
  RiDoorOpenFill,
  RiExternalLinkLine,
  RiFileEditFill,
  RiPencilRuler2Fill,
} from "react-icons/ri";
import { priceFormatter } from "components/FiltersForm/utils";
import { advertiserTypesMap } from "constants/advertiser-types";
import {
  APARTMENT_CARD_LOCALE,
  APARTMENT_LIST_LOADER_TEXT,
  APARTMENT_LIST_TAB,
  LOGO_ENCODED,
  LOGO_URL,
  NO_RESULTS_TEXT,
  PAGE_SIZE,
  PROVIDER_LOGO_URLS,
  THEME_COLOR,
} from "constants/config";
import { furnishedMap } from "constants/furnished";
import { structuresMap } from "constants/structures";
import { useAppContext } from "context/appContext";
import { trackEvent } from "utils/analytics";
import { getLocationUrl } from "utils/location";
import { getFoundApartmentList } from "services/apartments";
import eventBus from "utils/event-bus";
import { getAddressValue, handleFloor } from "../ApartmentList/utils";

const { Meta } = Card;

export const FoundApartmentList = ({
  foundCounter,
  setFoundCounter,
  clickedFoundApartments,
}) => {
  const router = useRouter();
  const [endCursor, setEndCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const newSublistStartRef = useRef();
  const [newSublistStartApartmentId, setNewSublistStartApartmentId] =
    useState(null);
  const [clickedFound, setClickedFound] = useState([]);
  const { state, dispatch } = useAppContext();

  const handleLoadMore = async () => {
    dispatch({
      type: "foundApartmentListLoadingSet",
      payload: { isLoadingFoundApartmentList: true },
    });
    const { data, pageInfo } = await getFoundApartmentList({
      token: state.accessToken,
      limitPerPage: PAGE_SIZE,
      cursor: endCursor,
    });
    setHasNextPage(pageInfo.hasNextPage);
    setEndCursor(pageInfo.endCursor);
    const [firstSublistApartment] = data;
    setNewSublistStartApartmentId(firstSublistApartment?.id);
    dispatch({
      type: "foundApartmentListAppend",
      payload: { foundApartmentList: data },
    });
    dispatch({
      type: "foundApartmentListLoadingSet",
      payload: { isLoadingFoundApartmentList: false },
    });
    newSublistStartRef?.current?.scrollIntoView();
    trackEvent("found-apartments-load-more", "found-apartments-load-more");
  };

  const loadMore = !state.isLoadingFoundApartmentList && hasNextPage && (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button onClick={handleLoadMore}>Učitaj još</Button>
    </div>
  );

  useEffect(() => {
    eventBus.on("found-apartment-list-page-changed", (data) => {
      setHasNextPage(data.hasNextPage);
      setEndCursor(data.endCursor);
    });
  }, []);

  let clickedCounter = 0;

  return (
    <div className="paginated-list">
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={state.foundApartmentList}
        itemLayout="horizontal"
        loading={{
          tip: APARTMENT_LIST_LOADER_TEXT,
          spinning: state.isLoadingFoundApartmentList,
          className: "mt-2",
        }}
        locale={{
          emptyText: (
            <Empty
              className={!state.foundApartmentList.length ? "block" : "hidden"}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={NO_RESULTS_TEXT}
            />
          ),
        }}
        loadMore={loadMore}
        renderItem={(apartment, index) => {
          const isFound =
            clickedCounter < foundCounter &&
            !clickedFound.includes(index) &&
            !clickedFoundApartments.includes(index);
          if (isFound) {
            clickedCounter += 1;
          }
          let postedAt;
          try {
            postedAt = new Intl.DateTimeFormat(APARTMENT_CARD_LOCALE).format(
              new Date(apartment.postedAt)
            );
          } catch (error) {
            console.error(error);
          }

          const actions = [
            <div key={`apartment-structure-${apartment.id}`}>
              <RiDoorOpenFill className="block mx-auto" />{" "}
              {structuresMap[apartment.structure]}
            </div>,
            <div key={`apartment-details-link-${apartment.id}`}>
              <Button
                type="primary"
                size="small"
                className="find-more-btn"
                onClick={() => {
                  if (isFound) {
                    const updatedClickedFound = [...clickedFound, index];
                    setClickedFound(updatedClickedFound);
                    const isAlreadyClicked = clickedFound.includes(index);
                    if (!isAlreadyClicked && foundCounter >= 1) {
                      setFoundCounter(foundCounter - 1);
                      router.push(
                        {
                          pathname: "/app",
                          query: {
                            tab: APARTMENT_LIST_TAB,
                            foundCounter: foundCounter - 1,
                            clicked: updatedClickedFound,
                          },
                        },
                        undefined,
                        { shallow: true }
                      );
                    }
                  }
                  trackEvent(
                    `apartment-details-${apartment.providerName}`,
                    `apartment-details-${apartment.id}`
                  );
                }}
              >
                <Link href={apartment.url} passHref>
                  <a target="_blank" rel="noopener noreferrer">
                    <RiExternalLinkLine className="block mx-auto" /> saznaj više
                  </a>
                </Link>
              </Button>
            </div>,
          ];
          if (postedAt) {
            const postedAtAction = (
              <div key={`apartment-postedat-${apartment.id}`}>
                <CgPlayListAdd className="block mx-auto" /> {postedAt}
              </div>
            );

            actions.unshift(postedAtAction);
          }

          const locationUrl =
            apartment.location && getLocationUrl(apartment.location);
          const locationTextComponent = (
            <span>
              {locationUrl && <FaMapMarkedAlt className="inline mb-1" />}{" "}
              {getAddressValue(apartment)}
            </span>
          );
          const locationComponent = locationUrl ? (
            <a href={locationUrl} target="_blank" rel="noopener noreferrer">
              {locationTextComponent}
            </a>
          ) : (
            locationTextComponent
          );
          const apartmentImageAlt = `stan: ${getAddressValue(apartment)}`;
          const notificationCardStyle = {
            ...(isFound && {
              style: {
                borderColor: THEME_COLOR,
              },
            }),
          };

          return (
            <List.Item>
              <Skeleton
                avatar
                loading={state.isLoadingFoundApartmentList}
                title={false}
                active
              >
                <Card
                  {...notificationCardStyle}
                  cover={
                    apartment.coverPhotoUrl && (
                      <>
                        {newSublistStartApartmentId === apartment.id && (
                          <div ref={newSublistStartRef} />
                        )}
                        <Image
                          alt={apartmentImageAlt}
                          height={300}
                          key={`image-${apartment.id}`}
                          src={apartment.coverPhotoUrl}
                          preview={false}
                          fallback={LOGO_ENCODED}
                        />
                      </>
                    )
                  }
                  actions={actions}
                >
                  <Meta
                    avatar={
                      <Avatar
                        size={{
                          xs: 45,
                          sm: 45,
                          md: 45,
                          lg: 45,
                          xl: 45,
                          xxl: 100,
                        }}
                        shape="square"
                        icon={
                          <Image
                            alt={`${apartment.providerName} logo`}
                            src={
                              PROVIDER_LOGO_URLS[apartment.providerName] ||
                              LOGO_URL
                            }
                            preview={false}
                            className="bg-white"
                            height={45}
                          />
                        }
                      />
                    }
                    title={
                      <span style={{ whiteSpace: "initial" }}>
                        {locationComponent}
                      </span>
                    }
                    description={
                      <ul>
                        <Row>
                          <li className="inline-block px-2">
                            <MdLocationOn className="inline mb-1" />{" "}
                            {apartment.municipality}
                          </li>
                          <li className="inline-block px-2">
                            <GiMoneyStack className="inline mb-1" />{" "}
                            {priceFormatter(apartment.price)}
                          </li>
                        </Row>
                        <Row>
                          <li className="inline-block px-2">
                            <GiStairs className="inline mb-1" />{" "}
                            {handleFloor(apartment.floor)}
                          </li>
                          <li className="inline-block px-2">
                            <RiPencilRuler2Fill className="inline mb-1" />{" "}
                            {apartment.size}m<sup>2</sup>
                          </li>
                        </Row>
                        <Row>
                          <li className="inline-block px-2">
                            <RiFileEditFill className="inline mb-1" />{" "}
                            {advertiserTypesMap[apartment.advertiserType]}
                          </li>
                          {apartment.rentOrSale === "rent" && (
                            <li className="inline-block px-2">
                              <GiSofa className="inline mb-1" />{" "}
                              {furnishedMap[apartment.furnished]}
                            </li>
                          )}
                        </Row>
                      </ul>
                    }
                  />
                </Card>
              </Skeleton>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

FoundApartmentList.propTypes = {
  foundCounter: PropTypes.number.isRequired,
  setFoundCounter: PropTypes.func.isRequired,
  clickedFoundApartments: PropTypes.arrayOf(PropTypes.number),
};

FoundApartmentList.defaultProps = {
  clickedFoundApartments: [],
};
