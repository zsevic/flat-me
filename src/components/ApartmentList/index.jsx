import { Avatar, Button, Card, Empty, List, Row, Skeleton } from "antd";
import latinize from "latinize";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { GiMoneyStack, GiShop, GiSofa, GiStairs } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import {
  RiDoorOpenFill,
  RiExternalLinkLine,
  RiPencilRuler2Fill,
} from "react-icons/ri";
import { priceFormatter } from "components/FiltersForm/utils";
import ImageWithFallback from "components/ImageWithFallback";
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
  LOGO_URL,
  NO_RESULTS_TEXT,
  PROVIDER_LOGO_URLS,
} from "constants/config";
import { floorsLocaleMap } from "constants/floors";
import { furnishedMap } from "constants/furnished";
import { structuresMap } from "constants/structures";
import * as apartmentsService from "services/apartments";
import eventBus from "utils/event-bus";
import { getLocationUrl } from "utils/location";
import { apartmentListPropType, filtersPropType } from "utils/prop-types";

const { Meta } = Card;

export const ApartmentList = ({
  apartmentList,
  setApartmentList,
  isLoadingApartmentList,
  setIsLoadingApartmentList,
  filters,
  listRef,
  total,
}) => {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE_NUMBER);

  const onChange = async (page, pageSize) => {
    setIsLoadingApartmentList(true);
    setCurrentPage(page);
    const { data } = await apartmentsService.getApartmentList({
      ...filters,
      pageNumber: page,
      limitPerPage: pageSize,
    });
    setApartmentList(data);
    setIsLoadingApartmentList(false);
    listRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleFloor = (floor) =>
    floorsLocaleMap[floor] || `na ${floor}. spratu`;

  const getLocationText = (apartment) => {
    let locationText = apartment.address;
    if (
      apartment.place &&
      apartment.address &&
      latinize(apartment.place) !== latinize(apartment.address) &&
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
      setCurrentPage(data.page);
    });
  }, []);

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
        loading={isLoadingApartmentList}
        locale={{
          emptyText: (
            <Empty
              className={total === 0 ? "block" : "hidden"}
              description={NO_RESULTS_TEXT}
            />
          ),
        }}
        pagination={{
          onChange,
          current: currentPage,
          total,
          showSizeChanger: false,
          hideOnSinglePage: true,
          className: "text-center",
          defaultPageSize: INITIAL_PAGE_SIZE,
        }}
        renderItem={(apartment) => {
          const actions = [
            <div key={`apartment-structure-${apartment.id}`}>
              <RiDoorOpenFill className="inline" />{" "}
              {structuresMap[apartment.structure]}
            </div>,
            <div key={`apartment-details-link-${apartment.id}`}>
              <Button type="primary" size="small">
                <Link href={apartment.url} passHref>
                  <a target="_blank" rel="noopener noreferrer">
                    <RiExternalLinkLine className="inline" /> saznaj više
                  </a>
                </Link>
              </Button>
            </div>,
          ];
          if (apartment.rentOrSale === "rent") {
            actions.unshift(
              <div key={`apartment-furnished-${apartment.id}`}>
                <GiSofa className="inline" />{" "}
                {furnishedMap[apartment.furnished]}
              </div>
            );
          }

          const locationUrl =
            apartment.location && getLocationUrl(apartment.location);
          const locationTextComponent = (
            <span>
              {locationUrl && <FaMapMarkedAlt className="inline" />}{" "}
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
                      <ImageWithFallback
                        alt="stan"
                        width={300}
                        height={300}
                        key={`image-${apartment.id}`}
                        src={apartment.coverPhotoUrl}
                        fallbackSrc={LOGO_URL}
                      />
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
                            src={
                              PROVIDER_LOGO_URLS[apartment.providerName] ||
                              LOGO_URL
                            }
                            layout="fill"
                            className="bg-white"
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
  total: PropTypes.number,
};

ApartmentList.defaultProps = {
  total: null,
};
