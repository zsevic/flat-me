import { Button, Modal, Spin } from "antd";
import { IoMdNotificationsOutline } from "react-icons/io";
import { NotificationFooter } from "components/NotificationFooter";
import { PUSH_NOTIFICATIONS_ACTIVATION_MODAL_TITLE } from "constants/config";
import { useAppContext } from "context";
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
  const [isLoading, setIsLoading] = useState(false);
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
      trackEvent(
        "push-notifications-activation",
        "cancel-activating-push-notifications"
      );
    }
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
    trackEvent("push-notifications-activation", "turn-on-push-notifications");
  };

  const onClickHandler = async () => {
    setIsLoading(true);
    const data = await handler();
    setIsLoading(false);
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
        title={`${PUSH_NOTIFICATIONS_ACTIVATION_MODAL_TITLE} na ${deviceTypesMap[deviceType]}`}
        visible={visible}
        forceRender
        onCancel={closeModal}
        footer={<NotificationFooter />}
      >
        <Spin spinning={isLoading}>
          <p>
            Ukoliko želite da primate informacije o novim stanovima koji
            odgovaraju Vašim izabranim kriterijumima, nakon što se pojave na
            FlatMe, aktivirajte obaveštenja na {deviceTypesMap[deviceType]}.
          </p>
          <div className="text-center">
            <Button type="primary" onClick={onClickHandler}>
              {PUSH_NOTIFICATIONS_ACTIVATION_MODAL_TITLE}
            </Button>
          </div>
        </Spin>
      </Modal>
    </>
  );
};

PushNotificationsActivationModal.propTypes = {
  handler: PropTypes.func.isRequired,
};
