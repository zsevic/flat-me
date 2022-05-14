import { Button, Modal } from "antd";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PUSH_NOTIFICATIONS_ACTIVATION_MODAL_TITLE } from "constants/config";
import { useAppContext } from "context/AppContext";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { isDesktop, isMobile, isTablet } from "react-device-detect";
import { trackEvent } from "utils/analytics";

const PHONE = "phone";
const TABLET = "tablet";
const DESKTOP = "desktop";

const deviceTypesMap = {
  [PHONE]: "telefonu",
  [TABLET]: "tabletu",
  [DESKTOP]: "računaru",
};

export const PushNotificationsActivationModal = ({ handler }) => {
  const [visible, setVisible] = useState(false);
  const [deviceType, setDeviceType] = useState(PHONE);
  const { state } = useAppContext();
  const [turnOnNotificationsText, setTurnOnNotificationsText] = useState(
    "Uključi obaveštenja"
  );

  useEffect(() => {
    if (isTablet) {
      setDeviceType(TABLET);
    } else if (isDesktop) {
      setDeviceType(DESKTOP);
    } else if (isMobile) {
      setDeviceType(PHONE);
    }
  }, []);

  useEffect(() => {
    setTurnOnNotificationsText(
      `Uključi obaveštenja na ${deviceTypesMap[deviceType]}`
    );
  }, [deviceType]);

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
    const data = await handler();
    if (data.isDone) {
      closeModal(false);
    }
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
          {turnOnNotificationsText}
        </Button>
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
