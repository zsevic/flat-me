import { Button, Form, Modal } from "antd";
import Link from "next/link";
import { RiMailLine } from "react-icons/ri";
import { PUSH_NOTIFICATIONS_ACTIVATION_MODAL_TITLE } from "constants/config";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { trackEvent } from "utils/analytics";
import eventBus from "utils/event-bus";

export const PushNotificationsActivationModal = ({ handler }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const closeModal = (track = true) => {
    if (track) {
      trackEvent("push-notifications", "cancel-push-notifications");
    }
    setVisible(false);
    form.resetFields();
  };

  const showModal = () => {
    setVisible(true);
    trackEvent("push-notifications", "turn-on-push-notifications");
  };

  useEffect(() => {
    eventBus.on("trackFilters-changed", (data) => {
      setIsDisabled(data.isDisabled);
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
        {PUSH_NOTIFICATIONS_ACTIVATION_MODAL_TITLE}
      </Button>
      <Modal
        title={PUSH_NOTIFICATIONS_ACTIVATION_MODAL_TITLE}
        visible={visible}
        forceRender
        onCancel={closeModal}
        footer={
          <div>
            <small>
              Aktiviranjem obaveštenja, slažete sa FlatMe{" "}
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
          FlatMe, aktivirajte obaveštenja.
        </p>
        <Button type="primary" onClick={handler}>
          {PUSH_NOTIFICATIONS_ACTIVATION_MODAL_TITLE}
        </Button>
      </Modal>
    </>
  );
};

PushNotificationsActivationModal.propTypes = {
  handler: PropTypes.func.isRequired,
};
