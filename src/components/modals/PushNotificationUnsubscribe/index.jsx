import { Button, Modal, notification, Spin } from "antd";
import { useAppContext } from "context";
import { UPDATE_PUSH_NOTIFICATIONS } from "context/constants";
import { IoMdNotificationsOff } from "react-icons/io";
import { PUSH_NOTIFICATIONS_UNSUBSCRIBE_MODAL_TITLE } from "constants/config";
import React, { useState } from "react";
import { trackEvent } from "utils/analytics";
import { unsubscribeFromPushNotifications } from "services/subscriptions";
import { getErrorMessageForPushNotifications } from "utils/error-messages";
import { getTokenForPushNotifications } from "utils/push-notifications";

export const PushNotificationsUnsubscribeModal = () => {
  const { dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const closeModal = (track = true) => {
    if (track) {
      trackEvent(
        "push-notifications-deactivation",
        "cancel-deactivating-push-notifications"
      );
    }
    setVisible(false);
  };

  const handleUnsubscribe = async () => {
    try {
      const accessToken = await getTokenForPushNotifications();
      setIsLoading(true);
      await unsubscribeFromPushNotifications({
        token: accessToken,
      });
      dispatch({
        type: UPDATE_PUSH_NOTIFICATIONS,
        payload: { isPushNotificationActivated: false },
      });
      notification.info({
        description: "Obaveštenja su uspešno isključena",
        duration: 0,
      });
      trackEvent(
        "push-notifications-deactivation",
        "push-notifications-deactivated"
      );
      closeModal(false);
    } catch (error) {
      const errorMessage = getErrorMessageForPushNotifications(error);
      notification.error({
        description: errorMessage,
        duration: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const showModal = () => {
    setVisible(true);
    trackEvent(
      "push-notifications-deactivation",
      "deactivate-push-notifications"
    );
  };

  return (
    <>
      <div className="text-center mb-3">
        <Button danger onClick={showModal} size="small">
          <IoMdNotificationsOff className="mb-1 mr-1 inline" />
          {PUSH_NOTIFICATIONS_UNSUBSCRIBE_MODAL_TITLE}
        </Button>
      </div>
      <Modal
        title={PUSH_NOTIFICATIONS_UNSUBSCRIBE_MODAL_TITLE}
        visible={visible}
        forceRender
        onCancel={closeModal}
        footer={null}
      >
        <Spin spinning={isLoading}>
          <p>
            Ukoliko više ne želite da primate obaveštenja o novim stanovima koji
            odgovaraju Vašim izabranim kriterijumima, kliknite na dugme ispod.
          </p>
          <div className="text-center">
            <Button danger onClick={handleUnsubscribe}>
              {PUSH_NOTIFICATIONS_UNSUBSCRIBE_MODAL_TITLE}
            </Button>
          </div>
        </Spin>
      </Modal>
    </>
  );
};
