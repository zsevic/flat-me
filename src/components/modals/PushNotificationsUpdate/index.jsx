import { Button, Modal } from "antd";
import { useAppContext } from "context/appContext";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PUSH_NOTIFICATIONS_UPDATE_MODAL_TITLE } from "constants/config";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { trackEvent } from "utils/analytics";

export const PushNotificationsUpdateModal = ({ handler }) => {
  const { state } = useAppContext();
  const [visible, setVisible] = useState(false);

  const closeModal = (track = true) => {
    if (track) {
      trackEvent(
        "push-notifications-update",
        "cancel-updating-push-notifications"
      );
    }
    setVisible(false);
  };

  const onClickHandler = async () => {
    const data = await handler();
    if (data.isDone) {
      closeModal(false);
    }
  };

  const showModal = () => {
    setVisible(true);
    trackEvent("push-notifications-update", "update-push-notifications");
  };

  return (
    <>
      <div className="text-center">
        <Button
          type="primary"
          onClick={showModal}
          size="large"
          disabled={state.isNotificationActivationDisabled}
        >
          <IoMdNotificationsOutline className="mb-1 mr-1 inline" />
          {PUSH_NOTIFICATIONS_UPDATE_MODAL_TITLE}
        </Button>
      </div>
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
          <Button type="primary" onClick={onClickHandler}>
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
