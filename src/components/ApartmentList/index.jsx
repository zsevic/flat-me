import { Avatar, Button, Card, Empty, Image, List, Row, Skeleton } from "antd";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { CgPlayListAdd } from "react-icons/cg";
import { FaGooglePlay, FaMapMarkedAlt } from "react-icons/fa";
import { GiMoneyStack, GiSofa, GiStairs } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import {
  RiDoorOpenFill,
  RiExternalLinkLine,
  RiFileEditFill,
  RiPencilRuler2Fill,
} from "react-icons/ri";
import { advertiserTypesMap } from "constants/advertiser-types";
import {
  APARTMENT_CARD_LOCALE,
  APARTMENT_LIST_LOADER_TEXT,
  GOOGLE_PLAY_STORE_URL,
  LOGO_ENCODED,
  LOGO_URL,
  NO_RESULTS_TEXT,
  PROVIDER_LOGO_URLS,
} from "constants/config";
import { furnishedMap } from "constants/furnished";
import { structuresMap } from "constants/structures";
import { useAppContext } from "context";
import { trackEvent } from "utils/analytics";
import { getLocationUrl } from "utils/location";
import eventBus from "utils/event-bus";
import { Price } from "./price";
import { getAddressValue, handleFloor } from "./utils";

const { Meta } = Card;

export const ApartmentList = () => {
  const { state } = useAppContext();
  const listRef = useRef();

  useEffect(() => {
    eventBus.dispatch("list-ref", {
      listRef,
    });
  }, []);

  const handleRedirectionToStore = () => {
    trackEvent(
      "download-play-store-app-listing",
      "download-play-store-app-listing"
    );
  };

  const loadMore = !state.isLoadingApartmentList &&
    state.apartmentListHasNextPage && (
      <Row justify="center">
        <Link href={GOOGLE_PLAY_STORE_URL}>
          <Button
            type="primary"
            onClick={handleRedirectionToStore}
            size="large"
            className="w-3/4 break-words"
          >
            <FaGooglePlay className="inline mb-1 mr-1" /> Za više rezultata
            instalirajte FlatMe Premium aplikaciju
          </Button>
        </Link>
      </Row>
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
                      <Image
                        alt={apartmentImageAlt}
                        height={300}
                        key={`image-${apartment.id}`}
                        src={apartment.coverPhotoUrl}
                        preview={false}
                        fallback={LOGO_ENCODED}
                      />
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
                        style={{
                          backgroundColor: "white",
                        }}
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
                            <Price apartment={apartment} />
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
