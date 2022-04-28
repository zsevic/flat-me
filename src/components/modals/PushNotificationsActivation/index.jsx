import { Button, Modal } from "antd";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PUSH_NOTIFICATIONS_ACTIVATION_MODAL_TITLE } from "constants/config";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { trackEvent } from "utils/analytics";
import eventBus from "utils/event-bus";

export const PushNotificationsActivationModal = ({ handler }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [visible, setVisible] = useState(false);

  const closeModal = (track = true) => {
    if (track) {
      trackEvent("push-notifications", "cancel-push-notifications");
    }
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
    trackEvent("push-notifications", "turn-on-push-notifications");
  };

  const onClickHandler = async () => {
    const { isDone } = await handler();
    if (isDone) return closeModal(false);
  };

  useEffect(() => {
    eventBus.on("trackFilters-changed", (data) => {
      setIsDisabled(data.isDisabled);
    });
  }, []);

  return (
    <>
      <div className="text-center">
        <Button
          type="primary"
          onClick={showModal}
          size="large"
          disabled={isDisabled}
        >
          <IoMdNotificationsOutline className="mb-1 mr-1 inline" />
          {PUSH_NOTIFICATIONS_ACTIVATION_MODAL_TITLE}
        </Button>
        <p className="block text-gray-600" style={{ maxWidth: "12rem" }}>
          obaveštenja na uređaju o novim stanovima
        </p>
      </div>
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
        <div className="text-center">
          <Button type="primary" onClick={onClickHandler}>
            {PUSH_NOTIFICATIONS_ACTIVATION_MODAL_TITLE}
          </Button>
        </div>
      </Modal>
    </>
  );
};

PushNotificationsActivationModal.propTypes = {
  handler: PropTypes.func.isRequired,
};
