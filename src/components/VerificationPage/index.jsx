import { Alert, Col, Row, Spin } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "components/Header";
import { activationType, deactivationType } from "constants/config";
import {
  tokenAlreadyUsedErrorMessage,
  tooManyRequestsErrorMessage,
} from "constants/error-messages";
import {
  TOKEN_ALREADY_USED_STATUS_CODE,
  TOO_MANY_REQUESTS_STATUS_CODE,
} from "constants/status-codes";
import { trackEvent } from "utils/analytics";
import { commonProps, rowGutter } from "utils/common";
import { verificationPagePropTypes } from "utils/prop-types";

export const VerificationPage = ({
  errorMessage,
  successMessage,
  successMessageDescription,
  verify,
  title,
  type,
}) => {
  const router = useRouter();
  const { token } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const typeKeys = {
    [activationType]: "email-notifications-activated",
    [deactivationType]: "email-notifications-deactivated",
  };

  useEffect(() => {
    if (!router.isReady) return;

    verify(token)
      .then(() => {
        setIsLoading(false);
        setShowSuccessMessage(true);
        setSuccessMsg(successMessageDescription);
        const typeKey = typeKeys[type];
        trackEvent(typeKey, typeKey);
      })
      .catch((error) => {
        if (error?.response?.status === TOO_MANY_REQUESTS_STATUS_CODE) {
          setErrorMsg(tooManyRequestsErrorMessage);
        } else if (error?.response?.status === TOKEN_ALREADY_USED_STATUS_CODE) {
          setErrorMsg(tokenAlreadyUsedErrorMessage);
        }
        setIsLoading(false);
        setShowErrorMessage(true);
      });
  }, [errorMessage, router.isReady, successMessage, token, verify]);

  const errorAlertProps = {
    ...commonProps,
    type: "error",
    message: errorMessage,
    ...(errorMsg && { description: errorMsg }),
  };

  const successAlertProps = {
    ...commonProps,
    type: "success",
    message: successMessage,
    ...(successMsg && { description: successMsg }),
  };

  return (
    <div className="px-2">
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className="text-center">
        <Spin spinning={isLoading} />
      </div>
      {!isLoading && showSuccessMessage && !showErrorMessage && (
        <Row gutter={rowGutter}>
          <Col className="mx-auto">
            <Alert {...successAlertProps} />
          </Col>
        </Row>
      )}
      {!isLoading && showErrorMessage && !showSuccessMessage && (
        <Row gutter={rowGutter}>
          <Col className="mx-auto">
            <Alert {...errorAlertProps} />
          </Col>
        </Row>
      )}
    </div>
  );
};

VerificationPage.propTypes = verificationPagePropTypes;
