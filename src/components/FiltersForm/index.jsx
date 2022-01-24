import { CaretRightOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Form,
  Row,
  Select,
  Slider,
  TreeSelect,
} from "antd";
import deepEqual from "fast-deep-equal/react";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { TrackFiltersModal } from "components/TrackFiltersModal";
import { ADVERTISER_TYPES } from "constants/advertiser-types";
import {
  INITIAL_FILTERS,
  PAGE_SIZE,
  RENT_MAX_PRICE,
  RENT_MIN_PRICE,
  RENT_SELECTED_MAX_PRICE,
  RENT_SELECTED_MIN_PRICE,
  SALE_MAX_PRICE,
  SALE_MIN_PRICE,
  SALE_SELECTED_MAX_PRICE,
  SALE_SELECTED_MIN_PRICE,
} from "constants/config";
import { floorFilters } from "constants/floors";
import { FURNISHED } from "constants/furnished";
import { STRUCTURES } from "constants/structures";
import * as apartmentsService from "services/apartments";
import eventBus from "utils/event-bus";
import { getFilters } from "utils/filters";
import { scroll } from "utils/scrolling";
import { placesData } from "./data";
import { getPriceStep, handleMunicipalities, priceFormatter } from "./utils";

const { Option } = Select;
const { Panel } = Collapse;
const { SHOW_PARENT } = TreeSelect;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export const FiltersForm = ({
  setApartmentList,
  setFilters,
  setIsLoadingApartmentList,
  setIsInitialSearchDone,
  isInitialSearchDone,
  listRef,
}) => {
  const [form] = Form.useForm();
  const [isInitialRentOrSale, setIsInitialRentOrSale] = useState(true);
  const [minPriceField, setMinPriceField] = useState(RENT_MIN_PRICE);
  const [maxPriceField, setMaxPriceField] = useState(RENT_MAX_PRICE);
  const [minRentPriceField, setMinRentPriceField] = useState(
    RENT_SELECTED_MIN_PRICE
  );
  const [maxRentPriceField, setMaxRentPriceField] = useState(
    RENT_SELECTED_MAX_PRICE
  );
  const [minSalePriceField, setMinSalePriceField] = useState(
    SALE_SELECTED_MIN_PRICE
  );
  const [maxSalePriceField, setMaxSalePriceField] = useState(
    SALE_SELECTED_MAX_PRICE
  );
  const [minSelectedPrice, setMinSelectedPrice] = useState(
    RENT_SELECTED_MIN_PRICE
  );
  const [maxSelectedPrice, setMaxSelectedPrice] = useState(
    RENT_SELECTED_MAX_PRICE
  );
  const otherFiltersKey = "1";
  const [activeKey, setActiveKey] = useState(null);
  const [places, setPlaces] = useState([]);
  const [showRentFilters, setShowRentFilters] = useState(false);

  const validateFields = (storedFilters) => {
    form
      .validateFields()
      .then(() => {
        const filters = storedFilters || form.getFieldsValue();
        const updatedFilters = getFilters(filters);
        eventBus.dispatch("filters-changed", { filters: updatedFilters });
        eventBus.dispatch("trackFilters-changed", { isDisabled: false });
      })
      .catch((error) => {
        const isDisabled = error?.errorFields?.length > 0;
        if (!isDisabled) {
          const filters = form.getFieldsValue();
          const updatedFilters = getFilters(filters);
          eventBus.dispatch("filters-changed", { filters: updatedFilters });
        }
        eventBus.dispatch("trackFilters-changed", { isDisabled });
      });
  };

  useEffect(() => {
    const storedFilters = localStorage.getItem("initial-filters");
    if (!storedFilters) {
      form.setFieldsValue(INITIAL_FILTERS);
      const [minPrice, maxPrice] = form.getFieldValue("price");
      setMinSelectedPrice(minPrice);
      setMaxSelectedPrice(maxPrice);
      return;
    }

    const filters = JSON.parse(storedFilters);
    if (filters.rentOrSale === "sale") {
      setMinPriceField(SALE_MIN_PRICE);
      setMaxPriceField(SALE_MAX_PRICE);
      setIsInitialRentOrSale(false);
      setShowRentFilters(false);
    } else {
      setShowRentFilters(true);
    }

    if (filters?.floor?.length > 0 || filters?.advertiserTypes?.length > 0) {
      setActiveKey(otherFiltersKey);
    }

    const [minPrice, maxPrice] = filters.price;
    setMinSelectedPrice(minPrice);
    setMaxSelectedPrice(maxPrice);

    form.setFieldsValue(filters);
    validateFields(filters);
  }, []);

  const onFinish = async (values) => {
    handleMunicipalities(values);

    const storedFilters = localStorage.getItem("initial-filters");
    if (storedFilters && isInitialSearchDone) {
      const isSameFilter = deepEqual(JSON.parse(storedFilters), values);
      if (isSameFilter) {
        scroll(listRef);
        return;
      }
    }

    const newFilters = getFilters(values);
    setFilters(newFilters);
    localStorage.setItem("initial-filters", JSON.stringify(values));

    setIsLoadingApartmentList(true);
    scroll(listRef);
    const { data, pageInfo } = await apartmentsService.getApartmentList({
      ...newFilters,
      limitPerPage: PAGE_SIZE,
    });
    setApartmentList(data);
    setIsLoadingApartmentList(false);
    setIsInitialSearchDone(true);
    scroll(listRef);
    eventBus.dispatch("apartment-list-page-changed", {
      hasNextPage: pageInfo.hasNextPage,
      endCursor: pageInfo.endCursor,
    });
  };

  const onValuesChange = (changedField) => {
    const { price, rentOrSale } = changedField;
    if (price) {
      const [minPrice, maxPrice] = price;
      setMinSelectedPrice(minPrice);
      setMaxSelectedPrice(maxPrice);
    }

    if (rentOrSale) {
      const [minPrice, maxPrice] = form.getFieldValue("price");
      switch (rentOrSale) {
        case "rent":
          setMinPriceField(RENT_MIN_PRICE);
          setMaxPriceField(RENT_MAX_PRICE);
          setShowRentFilters(true);
          if (isInitialRentOrSale) {
            setIsInitialRentOrSale(false);
            form.setFieldsValue({
              price: [minPrice, maxPrice],
            });
          } else {
            setMinSalePriceField(minPrice);
            setMaxSalePriceField(maxPrice);
            form.setFieldsValue({
              price: [minRentPriceField, maxRentPriceField],
            });
          }
          break;
        case "sale":
          setMinPriceField(SALE_MIN_PRICE);
          setMaxPriceField(SALE_MAX_PRICE);
          setMinRentPriceField(minPrice);
          setMaxRentPriceField(maxPrice);
          setShowRentFilters(false);
          if (isInitialRentOrSale) {
            setIsInitialRentOrSale(false);
            form.setFieldsValue({
              price: [SALE_SELECTED_MIN_PRICE, SALE_SELECTED_MAX_PRICE],
            });
          } else {
            form.setFieldsValue({
              price: [minSalePriceField, maxSalePriceField],
            });
          }
          break;
        default:
      }
      const [latestMinPrice, latestMaxPrice] = form.getFieldValue("price");
      setMinSelectedPrice(latestMinPrice);
      setMaxSelectedPrice(latestMaxPrice);
    }

    validateFields();
  };

  const onPlacesChange = (values) => {
    setPlaces(values);
  };

  const placesProps = {
    allowClear: true,
    listHeight: 160,
    onChange: onPlacesChange,
    placeholder: "Izaberi mesto",
    showCheckedStrategy: SHOW_PARENT,
    treeCheckable: true,
    treeData: placesData,
    treeDefaultExpandAll: true,
    value: places,
  };

  return (
    <Row justify="center" align="top" className="bg-gray-50 px-3 mx-5">
      <Form
        form={form}
        name="filters-form"
        {...formItemLayout}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <p className="text-center mt-4 mb-4">
          Izaberi filtere i pronađi odgovarajući stan
        </p>
        <Col>
          <Form.Item
            name="rentOrSale"
            label="Vrsta pretrage"
            className="mt-2"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Izaberi vrstu pretrage",
              },
            ]}
          >
            <Select placeholder="Izaberi vrstu pretrage">
              <Option value="rent">Iznajmljivanje</Option>
              <Option value="sale">Kupovina</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col className="mt-2">
          <Form.Item
            name="price"
            label="Opseg cene"
            className="m0"
            rules={[
              {
                required: true,
                message: "Izaberi opseg cene",
              },
            ]}
          >
            <Slider
              range
              min={minPriceField}
              max={maxPriceField}
              marks={{
                [minPriceField]: {
                  label: priceFormatter(minPriceField),
                  style: {
                    transform: "translate(-5px)",
                  },
                },
                [maxPriceField]: {
                  label: priceFormatter(maxPriceField),
                  style: {
                    transform:
                      maxPriceField === SALE_MAX_PRICE
                        ? "translate(-60px)"
                        : "translate(-40px)",
                  },
                },
              }}
              step={getPriceStep(maxPriceField)}
              tipFormatter={priceFormatter}
              tooltipVisible={false}
            />
          </Form.Item>
          <p className="text-center">
            Izabran opseg cene: {minSelectedPrice} - {maxSelectedPrice}
          </p>
        </Col>

        <Col>
          <Form.Item
            name="municipalities"
            label="Mesto"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Izaberi mesto",
                type: "array",
              },
            ]}
          >
            <TreeSelect {...placesProps} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="structures" label="Struktura stana" hasFeedback>
            <Checkbox.Group>
              <Row>
                {STRUCTURES.map((structure) => (
                  <Col span={12} key={structure.locale}>
                    <Checkbox
                      value={structure.numberOfRooms}
                      style={{
                        lineHeight: "32px",
                      }}
                    >
                      {structure.locale}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="furnished"
            label="Opremljenost stana"
            hasFeedback
            rules={[
              {
                required: !!showRentFilters,
                message: "Izaberi opremljenost stana",
                type: "array",
              },
            ]}
            hidden={!showRentFilters}
          >
            <Checkbox.Group>
              <Row>
                {FURNISHED.map((furnished) => (
                  <Col span={24} key={furnished.locale}>
                    <Checkbox
                      value={furnished.value}
                      style={{
                        lineHeight: "32px",
                      }}
                    >
                      {furnished.locale}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Col>
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          onChange={(key) => setActiveKey(key)}
          activeKey={activeKey}
          ghost
        >
          <Panel key={otherFiltersKey} header="Ostali filteri">
            <Col>
              <Form.Item name="floor" label="Spratnost stana">
                <Checkbox.Group>
                  <Row>
                    {floorFilters.map((floorFilter) => (
                      <Col span={24} key={floorFilter.value}>
                        <Checkbox
                          value={floorFilter.value}
                          style={{
                            lineHeight: "32px",
                          }}
                        >
                          {floorFilter.locale}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="advertiserTypes" label="Oglašivač" hasFeedback>
                <Checkbox.Group>
                  <Row>
                    {ADVERTISER_TYPES.map((advertiserType) =>
                      showRentFilters &&
                      advertiserType.value === "investor" ? null : (
                        <Col span={24} key={advertiserType.locale}>
                          <Checkbox
                            value={advertiserType.value}
                            style={{
                              lineHeight: "32px",
                            }}
                          >
                            {advertiserType.locale}
                          </Checkbox>
                        </Col>
                      )
                    )}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Panel>
        </Collapse>

        <Row justify="space-around" align="center" className="mt-2">
          <Col className="mx-1">
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                <GoSearch className="mb-1 mr-1 inline" />
                Pretraži stanove
              </Button>
            </Form.Item>
          </Col>
          <Col className="mx-1">
            <Form.Item>
              <TrackFiltersModal />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Row>
  );
};

FiltersForm.propTypes = {
  setApartmentList: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  setIsLoadingApartmentList: PropTypes.func.isRequired,
  setIsInitialSearchDone: PropTypes.func.isRequired,
  isInitialSearchDone: PropTypes.bool.isRequired,
  listRef: PropTypes.object.isRequired,
};
