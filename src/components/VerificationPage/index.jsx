import { message, Spin } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "components/Header";
import { VERIFICATION_PAGE_NOTIFICATION_DURATION } from "constants/config";
import { tooManyRequestsErrorMessage } from "constants/error-messages";
import { TOO_MANY_REQUESTS_STATUS_CODE } from "constants/status-codes";
import { verificationPagePropTypes } from "utils/prop-types";

export const VerificationPage = ({ errorMessage, successMessage, verify }) => {
  const router = useRouter();
  const { token } = router.query;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    verify(token)
      .then(() => {
        message.success(
          successMessage,
          VERIFICATION_PAGE_NOTIFICATION_DURATION
        );
        setIsLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === TOO_MANY_REQUESTS_STATUS_CODE) {
          message.error(
            tooManyRequestsErrorMessage,
            VERIFICATION_PAGE_NOTIFICATION_DURATION
          );
        } else {
          message.error(errorMessage, VERIFICATION_PAGE_NOTIFICATION_DURATION);
        }
        setIsLoading(false);
      });
  }, [errorMessage, router.isReady, successMessage, token, verify]);

  return (
    <>
      <Header />
      <Spin spinning={isLoading} className="flex justify-center" />
    </>
  );
};

VerificationPage.propTypes = verificationPagePropTypes;
