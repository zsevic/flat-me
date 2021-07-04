import { Avatar, Col, List, Pagination, Row, Skeleton } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { roomsMap } from "constants/rooms-map";
import * as apartmentsService from "services/apartments";
import { apartmentListPropType, filtersPropType } from "utils/prop-types";

export const ApartmentList = ({
  apartmentList,
  setApartmentList,
  filters,
  total,
}) => {
  const onChange = async (page, pageSize) => {
    const { data } = await apartmentsService.getApartmentList({
      ...filters,
      pageNumber: page,
      limitPerPage: pageSize,
    });
    setApartmentList(data);
  };

  return (
    <>
      <Row justify="center" className="mt-4">
        <Col xs={24} md={12}>
          <List
            className="demo-loadmore-list mx-5"
            loading={false}
            itemLayout="vertical"
            dataSource={apartmentList}
            renderItem={(item) => (
              <List.Item>
                <Skeleton avatar loading={false} title={false} active>
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
                  <div>
                    {item.price}€{item.floor && `, ${item.floor}. sprat`}
                  </div>
                </Skeleton>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row justify="center" align="top" className="py-5">
        <Pagination
          onChange={onChange}
          total={total}
          showSizeChanger={false}
          hideOnSinglePage
        />
      </Row>
    </>
  );
};

ApartmentList.propTypes = {
  apartmentList: apartmentListPropType.isRequired,
  setApartmentList: PropTypes.func.isRequired,
  filters: filtersPropType.isRequired,
  total: PropTypes.number.isRequired,
};
