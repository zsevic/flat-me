import { Button, Form, Modal } from "antd";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PUSH_NOTIFICATIONS_UPDATE_MODAL_TITLE } from "constants/config";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { trackEvent } from "utils/analytics";
import eventBus from "utils/event-bus";

export const PushNotificationsUpdateModal = ({ handler }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const closeModal = (track = true) => {
    if (track) {
      trackEvent(
        "push-notifications-update",
        "cancel-updating-push-notifications"
      );
    }
    setVisible(false);
    form.resetFields();
  };

  const showModal = () => {
    setVisible(true);
    trackEvent("push-notifications-update", "update-push-notifications");
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
        <IoMdNotificationsOutline className="mb-1 mr-1 inline" />
        {PUSH_NOTIFICATIONS_UPDATE_MODAL_TITLE}
      </Button>
      <Modal
        title={PUSH_NOTIFICATIONS_UPDATE_MODAL_TITLE}
        visible={visible}
        forceRender
        onCancel={closeModal}
        footer={
          <div>
            <small>
              Promenom obaveštenja, slažete sa FlatMe{" "}
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
          Ukoliko želite da promenite sačuvanu pretragu kojom dobijate
          informacije o novim stanovima koji odgovaraju Vašim izabranim
          kriterijumima, nakon što se pojave na FlatMe, aktivirajte obaveštenja.
        </p>
        <div className="text-center">
          <Button type="primary" onClick={handler}>
            {PUSH_NOTIFICATIONS_UPDATE_MODAL_TITLE}
          </Button>
        </div>
      </Modal>
    </>
  );
};

PushNotificationsUpdateModal.propTypes = {
  handler: PropTypes.func.isRequired,
};
