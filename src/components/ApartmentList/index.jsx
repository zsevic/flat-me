import { Avatar, Button, Card, Empty, List, Row, Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { FaDoorOpen, FaMapMarkedAlt } from "react-icons/fa";
import { GiMoneyStack, GiSofa, GiStairs } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import { RiPencilRuler2Fill } from "react-icons/ri";
import { priceFormatter } from "components/FiltersForm/utils";
import ImageWithFallback from "components/ImageWithFallback";
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
  LOGO_URL,
  NO_RESULTS_TEXT,
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
            <div key={`apartment-furnished-${apartment.id}`}>
              <GiSofa className="inline" /> {furnishedMap[apartment.furnished]}
            </div>,
            <div key={`apartment-structure-${apartment.id}`}>
              <FaDoorOpen className="inline" />{" "}
              {structuresMap[apartment.structure]}
            </div>,
            <div key={`apartment-details-link-${apartment.id}`}>
              <Button type="primary" size="small">
                <Link href={apartment.url} passHref>
                  <a target="_blank" rel="noopener noreferrer">
                    <BiLinkExternal className="inline" /> saznaj više
                  </a>
                </Link>
              </Button>
            </div>,
          ];

          const locationUrl =
            apartment.location && getLocationUrl(apartment.location);
          const locationTextComponent = (
            <span>
              {locationUrl && <FaMapMarkedAlt className="inline" />}{" "}
              {apartment.address || apartment.place}
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
                          xs: 64,
                          sm: 50,
                          md: 54,
                          lg: 50,
                          xl: 50,
                          xxl: 100,
                        }}
                        shape="square"
                        icon={
                          <Image
                            src={apartment.advertiserLogoUrl || LOGO_URL}
                            layout="fill"
                            className="bg-white"
                          />
                        }
                      />
                    }
                    title={locationComponent}
                    description={
                      <ul>
                        <Row>
                          <li className="inline-block px-2">
                            <MdLocationOn className="inline" />{" "}
                            {apartment.municipality}
                          </li>
                          <li className="inline-block px-2">
                            <GiMoneyStack className="inline" />{" "}
                            {priceFormatter(apartment.price)}
                          </li>
                        </Row>
                        <Row>
                          <li className="inline-block px-2">
                            <GiStairs className="inline" />{" "}
                            {handleFloor(apartment.floor)}
                          </li>
                          <li className="inline-block px-2">
                            <RiPencilRuler2Fill className="inline" />{" "}
                            {apartment.size}m<sup>2</sup>
                          </li>
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
