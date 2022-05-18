import { Button, Form, Input, Modal, notification } from "antd";
import { RiMailLine } from "react-icons/ri";
import { handleMunicipalities } from "components/FiltersForm/utils";
import { NotificationFooter } from "components/NotificationFooter";
import {
  EMAIL_NOTIFICATIONS_MODAL_TITLE,
  EMAIL_NOTIFICATIONS_SUCCESS_MESSAGE,
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
import { useAppContext } from "context";
import React, { useState } from "react";
import * as filtersService from "services/filters";
import { trackEvent } from "utils/analytics";

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

export const EmailNotificationsModal = () => {
  const [visible, setVisible] = useState(false);
  const { state } = useAppContext();
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
      handleMunicipalities(state.filters);
      await filtersService.saveFilter({
        ...state.filters,
        ...(state.filters.rentOrSale !== "rent" && { furnished: [] }),
        email,
      });
      notification.info({
        description: EMAIL_NOTIFICATIONS_SUCCESS_MESSAGE,
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

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        size="large"
        disabled={state.isNotificationActivationDisabled}
      >
        <RiMailLine className="mb-1 mr-1 inline" />
        {EMAIL_NOTIFICATIONS_MODAL_TITLE}
      </Button>
      <Modal
        title={EMAIL_NOTIFICATIONS_MODAL_TITLE}
        visible={visible}
        onCancel={closeModal}
        footer={<NotificationFooter />}
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
