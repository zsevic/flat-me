import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import { TRACK_FILTERS_MODAL_TITLE } from "constants/config";
import React, { useEffect, useState } from "react";
import * as filtersService from "services/filters";
import eventBus from "utils/event-bus";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export const TrackFiltersModal = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [filters, setFilters] = useState({});
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { email } = values;

    try {
      await filtersService.saveFilter({ ...filters, email });
      message.info("Proveri mejl sa detaljima oko potvrde sačuvane pretrage");
    } catch {
      message.error("Pretraga nije sačuvana");
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    eventBus.on("trackFilters-changed", (data) => {
      setIsDisabled(data.isDisabled);
    });

    eventBus.on("filters-changed", (data) => {
      setFilters(data.filters);
    });
  }, []);

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        size="large"
        disabled={isDisabled}
      >
        <MailOutlined className="pb-1 align-middle" />{" "}
        {TRACK_FILTERS_MODAL_TITLE}
      </Button>
      <Modal
        title={TRACK_FILTERS_MODAL_TITLE}
        visible={visible}
        onCancel={closeModal}
        onOk={closeModal}
      >
        <Form
          name="email-form"
          {...formItemLayout}
          className="mb-5"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label="E-mail adresa"
            className="mt-2"
            hasFeedback
            rules={[
              {
                type: "email",
                message: "Uneta e-mail adresa nije ispravna!",
              },
              {
                required: true,
                message: "Unesi e-mail adresu!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Registruj se
          </Button>
        </Form>
      </Modal>
    </>
  );
};
