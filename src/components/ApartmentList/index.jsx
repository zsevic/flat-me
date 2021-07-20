import { Avatar, Col, List, Row, Skeleton } from "antd";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { NO_RESULTS_TEXT } from "constants/config";
import { furnishedMap } from "constants/furnished";
import { roomsMap } from "constants/rooms-map";
import * as apartmentsService from "services/apartments";
import { apartmentListPropType, filtersPropType } from "utils/prop-types";

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

    if (["-1", "0", "PR"].includes(floor)) return "prizemlje";

    return `${floor}. sprat`;
  };

  return (
    <>
      <Row justify="center" className="mt-4" ref={listRef}>
        <Col xs={24} md={12}>
          <List
            className="demo-loadmore-list mx-5"
            dataSource={apartmentList}
            itemLayout="vertical"
            loading={isLoadingApartmentList}
            locale={{ emptyText: NO_RESULTS_TEXT }}
            pagination={{
              onChange,
              total,
              showSizeChanger: false,
              hideOnSinglePage: true,
              className: "mb-5",
            }}
            renderItem={(item) => (
              <List.Item>
                <Skeleton
                  avatar
                  loading={isLoadingApartmentList}
                  title={false}
                  active
                >
                  <List.Item.Meta
                    avatar={<Avatar src="./logo.png" shape="square" />}
                    title={
                      <Link href={item.url} passHref>
                        <a target="_blank" rel="noopener noreferrer">
                          {item.address || item.place}, {item.size}m<sup>2</sup>
                          , {roomsMap[item.structure]},{" "}
                          {furnishedMap[item.furnished]}
                        </a>
                      </Link>
                    }
                    description={item.description || "opis"}
                  />
                  <div>{item.price}€</div>
                  <div>{handleFloor(item.floor)}</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
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
