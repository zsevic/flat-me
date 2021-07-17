import { Avatar, Col, List, Pagination, Row, Skeleton } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { NO_RESULTS_TEXT } from "constants/config";
import { roomsMap } from "constants/rooms-map";
import * as apartmentsService from "services/apartments";
import { apartmentListPropType, filtersPropType } from "utils/prop-types";

export const ApartmentList = ({
  apartmentList,
  setApartmentList,
  isLoadingApartmentList,
  setIsLoadingApartmentList,
  filters,
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
  };

  const handleFloor = (floor) => {
    if (!floor) return null;

    if (["-1", "0", "PR"].includes(floor)) return "prizemlje";

    return `${floor}. sprat`;
  };

  return (
    <>
      <Row justify="center" className="mt-4">
        <Col xs={24} md={12}>
          <List
            className="demo-loadmore-list mx-5"
            loading={isLoadingApartmentList}
            itemLayout="vertical"
            dataSource={apartmentList}
            locale={{ emptyText: NO_RESULTS_TEXT }}
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
                      <a href={item.url}>
                        {item.address || item.place}, {item.size}m<sup>2</sup>,{" "}
                        {roomsMap[item.structure]}
                      </a>
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
      {!isLoadingApartmentList && (
        <Row justify="center" align="top" className="py-5">
          <Pagination
            onChange={onChange}
            total={total}
            showSizeChanger={false}
            hideOnSinglePage
          />
        </Row>
      )}
    </>
  );
};

ApartmentList.propTypes = {
  apartmentList: apartmentListPropType.isRequired,
  setApartmentList: PropTypes.func.isRequired,
  isLoadingApartmentList: PropTypes.bool.isRequired,
  setIsLoadingApartmentList: PropTypes.func.isRequired,
  filters: filtersPropType.isRequired,
  total: PropTypes.number.isRequired,
};
