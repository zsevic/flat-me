import { Button, Form, Input, Modal, notification } from "antd";
import Link from "next/link";
import { RiMailLine } from "react-icons/ri";
import { handleMunicipalities } from "components/FiltersForm/utils";
import {
  TRACK_FILTERS_MODAL_TITLE,
  TRACK_FILTERS_SUCCESS_MESSAGE,
} from "constants/config";
import {
  emailNotValidErrorMessage,
  filtersLimitErrorMessage,
  tooManyRequestsErrorMessage,
  userNotVerifiedErrorMessage,
} from "constants/error-messages";
import {
  BAD_REQUEST_STATUS_CODE,
  FILTERS_LIMIT_STATUS_CODE,
  TOO_MANY_REQUESTS_STATUS_CODE,
  USER_IS_NOT_VERIFIED_STATUS_CODE,
} from "constants/status-codes";
import React, { useEffect, useState } from "react";
import * as filtersService from "services/filters";
import { trackEvent } from "utils/analytics";
import eventBus from "utils/event-bus";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const errorMessages = {
  [BAD_REQUEST_STATUS_CODE]: emailNotValidErrorMessage,
  [FILTERS_LIMIT_STATUS_CODE]: filtersLimitErrorMessage,
  [TOO_MANY_REQUESTS_STATUS_CODE]: tooManyRequestsErrorMessage,
  [USER_IS_NOT_VERIFIED_STATUS_CODE]: userNotVerifiedErrorMessage,
};

export const TrackFiltersModal = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [filters, setFilters] = useState({});
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const closeModal = (track = true) => {
    if (track) {
      trackEvent("notifications", "cancel-registration");
    }
    setVisible(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    const { email } = values;

    try {
      handleMunicipalities(filters);
      await filtersService.saveFilter({
        ...filters,
        ...(filters.rentOrSale !== "rent" && { furnished: [] }),
        email,
      });
      notification.info({
        description: TRACK_FILTERS_SUCCESS_MESSAGE,
        duration: 0,
      });
      closeModal(false);
      trackEvent("notifications", "registration-by-email");
    } catch (error) {
      const errorMessage =
        errorMessages[error?.response?.status] || "Pretraga nije sačuvana";
      notification.error({
        description: errorMessage,
        duration: 0,
      });
    }
  };

  const showModal = () => {
    setVisible(true);
    trackEvent("notifications", "turn-on-notifications");
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
        <RiMailLine className="mb-1 mr-1 inline" />
        {TRACK_FILTERS_MODAL_TITLE}
      </Button>
      <Modal
        title={TRACK_FILTERS_MODAL_TITLE}
        visible={visible}
        forceRender
        onCancel={closeModal}
        footer={
          <div>
            <small>
              Unošenjem email adrese, slažete sa FlatMe{" "}
              <Link href="/terms-and-conditions" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  Uslovima korišćenja
                </a>
              </Link>{" "}
              i{" "}
              <Link href="/privacy-policy" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  Politikom privatnosti
                </a>
              </Link>
              .
            </small>
          </div>
        }
      >
        <p>
          Ukoliko želite da primate informacije o novim stanovima koji
          odgovaraju Vašim izabranim kriterijumima, nakon što se pojave na
          FlatMe, unesite svoju email adresu. Nakon registracije stići će Vam
          email preko kog je neophodno da potvrdite svoju email adresu.
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
