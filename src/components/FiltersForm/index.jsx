import { Checkbox, Col, Button, Form, Row, Select, Slider } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { TrackFiltersModal } from "components/TrackFiltersModal";
import { INITIAL_PAGE_NUMBER, INITIAL_PAGE_SIZE } from "constants/config";
import * as apartmentsService from "services/apartments";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export const FiltersForm = ({ setApartmentList, setFilters, setTotal }) => {
  const onFinish = async (values) => {
    const { price, ...filterValues } = values;
    const [minPrice, maxPrice] = price;
    const newFilters = {
      ...filterValues,
      minPrice,
      maxPrice,
    };
    setFilters(newFilters);

    const { data, total: totalAmount } =
      await apartmentsService.getApartmentList({
        ...newFilters,
        pageNumber: INITIAL_PAGE_NUMBER,
        limitPerPage: INITIAL_PAGE_SIZE,
      });
    setApartmentList(data);
    setTotal(totalAmount);
  };

  const onFieldsChange = (fields) => {
    const [field] = fields;
    const { name, value } = field;
    const [fieldsName] = name;
    console.log("on fields changed", fieldsName, value);
  };

  return (
    <Row justify="center" align="top" className="bg-gray-50 px-3 mx-5">
      <Form
        name="filters-form"
        {...formItemLayout}
        onFinish={onFinish}
        onFieldsChange={onFieldsChange}
        initialValues={{
          price: [200, 300],
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
            min={0}
            max={500}
            marks={{
              0: 0,
              500: 500,
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
          <Select mode="multiple" placeholder="Izaberi deo grada">
            <Option value="Vračar">Vračar</Option>
            <Option value="Zvezdara">Zvezdara</Option>
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
              <Col span={12}>
                <Checkbox
                  value="1.0"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  jednosoban
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox
                  value="1.5"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  jednoiposoban
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox
                  value="2.0"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  dvosoban
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox
                  value="2.5"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  dvoiposoban
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Row justify="space-around" align="center">
          <Col className="mx-1">
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
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
  setTotal: PropTypes.func.isRequired,
};
