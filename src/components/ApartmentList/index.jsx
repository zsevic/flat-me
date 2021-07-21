import { Avatar, Card, List, Skeleton } from "antd";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";
import { NO_RESULTS_TEXT } from "constants/config";
import { floorsLocaleMap } from "constants/floors";
import { furnishedMap } from "constants/furnished";
import { structuresMap } from "constants/structures";
import * as apartmentsService from "services/apartments";
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
  const onChange = async (page, pageSize) => {
    setIsLoadingApartmentList(true);
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

  const handleFloor = (floor) => {
    if (!floor) return null;

    return floorsLocaleMap[floor] || `na ${floor}. spratu`;
  };

  return (
    <div ref={listRef}>
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
        className="mx-5"
        dataSource={apartmentList}
        itemLayout="horizontal"
        loading={isLoadingApartmentList}
        locale={{ emptyText: NO_RESULTS_TEXT }}
        pagination={{
          onChange,
          total,
          showSizeChanger: false,
          hideOnSinglePage: true,
          className: "mb-5",
        }}
        renderItem={(apartment) => {
          const actions = [
            <div key={`apartment-furnished-${apartment._id}`}>
              {furnishedMap[apartment.furnished]}
            </div>,
            <div key={`apartment-structure-${apartment._id}`}>
              {structuresMap[apartment.structure]}
            </div>,
          ];
          if (apartment.floor) {
            actions.unshift(
              <div key={`apartment-floor-${apartment._id}`}>
                {handleFloor(apartment.floor)}
              </div>
            );
          }
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
                      <Image
                        alt="logo"
                        width={300}
                        height={300}
                        src={apartment.coverPhotoUrl}
                      />
                    )
                  }
                  actions={actions}
                >
                  <Meta
                    avatar={<Avatar src="./logo.png" shape="square" />}
                    title={
                      <Link href={apartment.url} passHref>
                        <a target="_blank" rel="noopener noreferrer">
                          {apartment.address || apartment.place} (
                          {apartment.municipality})
                        </a>
                      </Link>
                    }
                    description={
                      <>
                        <div>
                          {apartment.size}m<sup>2</sup>
                        </div>
                        <div>{apartment.price}€</div>
                      </>
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
  total: PropTypes.number.isRequired,
};
