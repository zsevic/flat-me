import { SearchOutlined } from "@ant-design/icons";
import { Checkbox, Col, Button, Form, Row, Select, Slider } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { TrackFiltersModal } from "components/TrackFiltersModal";
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
  RENT_MAX_PRICE,
  RENT_MIN_PRICE,
  RENT_OR_SALE_INITIAL_MAX_PRICE,
  RENT_OR_SALE_INITIAL_MIN_PRICE,
  RENT_SELECTED_MAX_PRICE,
  RENT_SELECTED_MIN_PRICE,
  SALE_MAX_PRICE,
  SALE_MIN_PRICE,
  SALE_SELECTED_MAX_PRICE,
  SALE_SELECTED_MIN_PRICE,
} from "constants/config";
import { MUNICIPALITIES } from "constants/municipalities";
import { STRUCTURES } from "constants/structures";
import * as apartmentsService from "services/apartments";
import eventBus from "utils/event-bus";
import { getFilters } from "utils/filters";

const { Option } = Select;

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
  setTotal,
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

  const onFinish = async (values) => {
    const newFilters = getFilters(values);
    setFilters(newFilters);

    setIsLoadingApartmentList(true);
    const { data, total: totalAmount } =
      await apartmentsService.getApartmentList({
        ...newFilters,
        pageNumber: INITIAL_PAGE_NUMBER,
        limitPerPage: INITIAL_PAGE_SIZE,
      });
    setApartmentList(data);
    setIsLoadingApartmentList(false);
    setTotal(totalAmount);
  };

  const onValuesChange = (changedField) => {
    const { rentOrSale } = changedField;
    if (rentOrSale) {
      const [minPrice, maxPrice] = form.getFieldValue("price");
      switch (rentOrSale) {
        case "rent":
          setMinPriceField(RENT_MIN_PRICE);
          setMaxPriceField(RENT_MAX_PRICE);
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
    }

    form.validateFields().catch((error) => {
      const isDisabled = error.errorFields.length > 0;
      if (!isDisabled) {
        const filters = form.getFieldsValue();
        const updatedFilters = getFilters(filters);
        eventBus.dispatch("filters-changed", { filters: updatedFilters });
      }
      eventBus.dispatch("isDisabled-changed", { isDisabled });
    });
  };

  return (
    <Row justify="center" align="top" className="bg-gray-50 px-3 mx-5">
      <Form
        form={form}
        name="filters-form"
        {...formItemLayout}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValues={{
          price: [
            RENT_OR_SALE_INITIAL_MIN_PRICE,
            RENT_OR_SALE_INITIAL_MAX_PRICE,
          ],
          structures: ["1.0", "1.5"],
        }}
      >
        <p className="text-center mt-4 mb-4">
          Izaberi filtere i pronađi odgovarajući stan
        </p>
        <Form.Item
          name="rentOrSale"
          label="Vrsta pretrage"
          className="mt-2"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Izaberi vrstu pretrage!",
            },
          ]}
        >
          <Select placeholder="Izaberi vrstu pretrage">
            <Option value="rent">Iznajmljivanje</Option>
            <Option value="sale">Kupovina</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="price"
          label="Opseg cene (€)"
          rules={[
            {
              required: true,
              message: "Izaberi opseg cene!",
            },
          ]}
        >
          <Slider
            range
            min={minPriceField}
            max={maxPriceField}
            marks={{
              [minPriceField]: minPriceField,
              [maxPriceField]: maxPriceField,
            }}
            step={10}
          />
        </Form.Item>

        <Form.Item
          name="municipalities"
          label="Deo grada"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Izaberi deo grada!",
              type: "array",
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Izaberi deo grada"
            listHeight={160}
          >
            {MUNICIPALITIES.map((municipality) => (
              <Option key={municipality} value={municipality}>
                {municipality}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="structures"
          label="Struktura stana"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Izaberi strukturu stana!",
              type: "array",
            },
          ]}
        >
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

        <Row justify="space-around" align="center">
          <Col className="mx-1">
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                <SearchOutlined className="pb-1 align-middle" /> Pretraži
                stanove
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
  setTotal: PropTypes.func.isRequired,
};
