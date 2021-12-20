import { Avatar, Button, Card, Empty, Image, List, Row, Skeleton } from "antd";
import latinize from "latinize";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { GiMoneyStack, GiShop, GiSofa, GiStairs } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import {
  RiDoorOpenFill,
  RiExternalLinkLine,
  RiPencilRuler2Fill,
} from "react-icons/ri";
import { priceFormatter } from "components/FiltersForm/utils";
import {
  APARTMENT_LIST_LOADER_TEXT,
  LOGO_ENCODED,
  LOGO_URL,
  NO_RESULTS_TEXT,
  PAGE_SIZE,
  PROVIDER_LOGO_URLS,
} from "constants/config";
import { floorsLocaleMap } from "constants/floors";
import { furnishedMap } from "constants/furnished";
import { structuresMap } from "constants/structures";
import * as apartmentsService from "services/apartments";
import eventBus from "utils/event-bus";
import { getLocationUrl } from "utils/location";
import { apartmentListPropType, filtersPropType } from "utils/prop-types";
import { getAddressValue } from "./utils";

const { Meta } = Card;

export const ApartmentList = ({
  apartmentList,
  setApartmentList,
  isLoadingApartmentList,
  setIsLoadingApartmentList,
  filters,
  listRef,
  isInitialSearchDone,
}) => {
  const [endCursor, setEndCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const newSublistStartRef = useRef();
  const [newSublistStartApartmentId, setNewSublistStartApartmentId] =
    useState(null);

  const handleLoadMore = async () => {
    setIsLoadingApartmentList(true);
    listRef?.current?.scrollIntoView();
    const { data, pageInfo } = await apartmentsService.getApartmentList({
      ...filters,
      limitPerPage: PAGE_SIZE,
      cursor: endCursor,
    });
    setHasNextPage(pageInfo.hasNextPage);
    setEndCursor(pageInfo.endCursor);
    const [firstSublistApartment] = data;
    setNewSublistStartApartmentId(firstSublistApartment?.id);
    setApartmentList([...apartmentList, ...data]);
    setIsLoadingApartmentList(false);
    newSublistStartRef?.current?.scrollIntoView();
  };

  const handleFloor = (floor) =>
    floorsLocaleMap[floor] || `na ${floor}. spratu`;

  const getLocationText = (apartment) => {
    let locationText = apartment.address;
    if (
      apartment.place &&
      apartment.address &&
      latinize(apartment.place.toLowerCase()) !==
        latinize(apartment.address.toLowerCase()) &&
      apartment.place !== apartment.municipality
    ) {
      locationText += `, ${apartment.place}`;
    } else if (apartment.place && !apartment.address) {
      locationText = apartment.place;
    }

    return locationText;
  };

  useEffect(() => {
    eventBus.on("apartment-list-page-changed", (data) => {
      setHasNextPage(data.hasNextPage);
      setEndCursor(data.endCursor);
    });
  }, []);

  const loadMore = !isLoadingApartmentList && hasNextPage && (
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
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={apartmentList}
        itemLayout="horizontal"
        loading={{
          tip: APARTMENT_LIST_LOADER_TEXT,
          spinning: isLoadingApartmentList,
          className: "mt-2",
        }}
        locale={{
          emptyText: (
            <Empty
              className={
                isInitialSearchDone && !apartmentList.length
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
          const actions = [
            <div key={`apartment-structure-${apartment.id}`}>
              <RiDoorOpenFill className="inline mb-1" />{" "}
              {structuresMap[apartment.structure]}
            </div>,
            <div key={`apartment-details-link-${apartment.id}`}>
              <Button type="primary" size="small">
                <Link href={apartment.url} passHref>
                  <a target="_blank" rel="noopener noreferrer">
                    <RiExternalLinkLine className="inline mb-1" /> saznaj više
                  </a>
                </Link>
              </Button>
            </div>,
          ];
          if (apartment.rentOrSale === "rent") {
            actions.unshift(
              <div key={`apartment-furnished-${apartment.id}`}>
                <GiSofa className="inline mb-1" />{" "}
                {furnishedMap[apartment.furnished]}
              </div>
            );
          }

          const locationUrl =
            apartment.location && getLocationUrl(apartment.location);
          const locationTextComponent = (
            <span>
              {locationUrl && <FaMapMarkedAlt className="inline mb-1" />}{" "}
              {getLocationText(apartment)}
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
                loading={isLoadingApartmentList}
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
                          xs: 50,
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
                            height={50}
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
                        {apartment.advertiserName &&
                          apartment.advertiserName !== "City Expert" && (
                            <Row>
                              <li className="inline-block px-2">
                                <GiShop className="inline mb-1" />{" "}
                                {apartment.advertiserName}
                              </li>
                            </Row>
                          )}
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

ApartmentList.propTypes = {
  apartmentList: apartmentListPropType.isRequired,
  setApartmentList: PropTypes.func.isRequired,
  isLoadingApartmentList: PropTypes.bool.isRequired,
  setIsLoadingApartmentList: PropTypes.func.isRequired,
  filters: filtersPropType.isRequired,
  listRef: PropTypes.object.isRequired,
  isInitialSearchDone: PropTypes.bool.isRequired,
};
