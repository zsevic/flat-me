import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Pagination,
  Row,
  Select,
  Slider,
} from "antd";
import Head from "next/head";
import React, { useState } from "react";
import { PAGE_SIZE } from "constants/config";
import * as apartmentsService from "services/apartments";

React.useLayoutEffect = React.useEffect;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const IndexPage = () => {
  const [filters, setFilters] = useState({});
  const [total, setTotal] = useState(0);

  const onFinish = async (values) => {
    const { price, ...filterValues } = values;
    const [minPrice, maxPrice] = price;
    const newFilters = {
      ...filterValues,
      minPrice,
      maxPrice,
    };
    setFilters(newFilters);

    const { data, total } = await apartmentsService.getApartmentList({
      ...newFilters,
      pageNumber: 1,
      limitPerPage: PAGE_SIZE,
    });
    setTotal(total);
  };

  const onChange = async (page, pageSize) => {
    const apartmentList = await apartmentsService.getApartmentList({
      ...filters,
      pageNumber: page,
      limitPerPage: pageSize,
    });
    console.log("result", apartmentList);
  };

  return (
    <div>
      <Head>
        <title>FlatMe</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <Divider orientation="left">FlatMe</Divider>
      <Row justify="center" align="top" className="bg-gray-50 px-3 mx-5">
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
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

          <Row justify="center">
            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            >
              <Button type="primary" htmlType="submit">
                Pretraži
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Row>
      <Row justify="center" className="my-4">
        <Pagination onChange={onChange} total={total} pageSize={PAGE_SIZE} />
      </Row>
    </div>
  );
};

export default IndexPage;
