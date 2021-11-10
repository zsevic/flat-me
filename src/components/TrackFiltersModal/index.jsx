import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import Link from "next/link";
import { handleMunicipalities } from "components/FiltersForm/utils";
import { TRACK_FILTERS_MODAL_TITLE } from "constants/config";
import { tooManyRequestsErrorMessage } from "constants/error-messages";
import { TOO_MANY_REQUESTS_STATUS_CODE } from "constants/status-codes";
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
      handleMunicipalities(filters);
      await filtersService.saveFilter({ ...filters, email });
      message.info("Proveri mejl sa detaljima oko potvrde sačuvane pretrage");
    } catch (error) {
      if (error?.response?.status === TOO_MANY_REQUESTS_STATUS_CODE) {
        message.error(tooManyRequestsErrorMessage);
      } else {
        message.error("Pretraga nije sačuvana");
      }
    }
  };

  const showModal = () => {
    setVisible(true);
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
        footer={
          <div>
            <small>
              Unošenjem email adrese, slažete sa FlatMe{" "}
              <Link href="/terms-and-conditions" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  Uslovima korišćenja.
                </a>
              </Link>
            </small>
          </div>
        }
      >
        <p>
          Ukoliko želite da primate informacije o novim stanovima koji
          odgovaraju Vašim izabranim kriterijumima, nakon što se pojave na
          FlatMe, unesite svoju email adresu.
        </p>
        <Form
          name="email-form"
          {...formItemLayout}
          className="mb-5 text-center"
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
