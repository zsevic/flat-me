import { Avatar, Button, Card, Empty, Image, List, Row, Skeleton } from "antd";
import Link from "next/link";
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
  LOGO_ENCODED,
  LOGO_URL,
  NO_RESULTS_TEXT,
  PAGE_SIZE,
  PROVIDER_LOGO_URLS,
} from "constants/config";
import { furnishedMap } from "constants/furnished";
import { structuresMap } from "constants/structures";
import { useAppContext } from "context";
import * as apartmentsService from "services/apartments";
import { trackEvent } from "utils/analytics";
import eventBus from "utils/event-bus";
import { getLocationUrl } from "utils/location";
import { scroll } from "utils/scrolling";
import {
  APPEND_APARTMENT_LIST,
  SET_LOADING_APARTMENT_LIST,
} from "context/constants";
import { getAddressValue, handleFloor } from "./utils";

const { Meta } = Card;

export const ApartmentList = () => {
  const [endCursor, setEndCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const newSublistStartRef = useRef();
  const [newSublistStartApartmentId, setNewSublistStartApartmentId] =
    useState(null);
  const listRef = useRef();
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    eventBus.dispatch("list-ref", {
      listRef,
    });
  }, []);

  const handleLoadMore = async () => {
    dispatch({
      type: SET_LOADING_APARTMENT_LIST,
      payload: { isLoadingApartmentList: true },
    });
    scroll(listRef);
    const { data, pageInfo } = await apartmentsService.getApartmentList({
      ...state.filters,
      limitPerPage: PAGE_SIZE,
      cursor: endCursor,
    });
    setHasNextPage(pageInfo.hasNextPage);
    setEndCursor(pageInfo.endCursor);
    const [firstSublistApartment] = data;
    setNewSublistStartApartmentId(firstSublistApartment?.id);
    dispatch({ type: APPEND_APARTMENT_LIST, payload: { apartmentList: data } });
    dispatch({
      type: SET_LOADING_APARTMENT_LIST,
      payload: { isLoadingApartmentList: false },
    });
    newSublistStartRef?.current?.scrollIntoView();
    trackEvent("search", "load-more");
  };

  useEffect(() => {
    eventBus.on("apartment-list-page-changed", (data) => {
      setHasNextPage(data.hasNextPage);
      setEndCursor(data.endCursor);
    });
  }, []);

  const loadMore = !state.isLoadingApartmentList && hasNextPage && (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button onClick={handleLoadMore}>Pretraži još</Button>
    </div>
  );

  return (
    <div ref={listRef} className="paginated-list">
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
        dataSource={state.apartmentList}
        itemLayout="horizontal"
        loading={{
          tip: APARTMENT_LIST_LOADER_TEXT,
          spinning: state.isLoadingApartmentList,
          className: "mt-2",
        }}
        locale={{
          emptyText: (
            <Empty
              className={
                state.isInitialSearchDone && !state.apartmentList.length
                  ? "block"
                  : "hidden"
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={NO_RESULTS_TEXT}
            />
          ),
        }}
        loadMore={loadMore}
        renderItem={(apartment) => {
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
                onClick={() =>
                  trackEvent(
                    `apartment-details-${apartment.providerName}`,
                    `apartment-details-${apartment.id}`
                  )
                }
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

          return (
            <List.Item>
              <Skeleton
                avatar
                loading={state.isLoadingApartmentList}
                title={false}
                active
              >
                <Card
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
