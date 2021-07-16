import { message, Spin } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "components/Header";
import { VERIFICATION_PAGE_NOTIFICATION_DURATION } from "constants/config";
import { verificationPagePropTypes } from "utils/prop-types";

export const VerificationPage = ({ errorMessage, successMessage, verify }) => {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    verify(token)
      .then(() => {
        message.success(
          successMessage,
          VERIFICATION_PAGE_NOTIFICATION_DURATION
        );
        setLoading(false);
      })
      .catch(() => {
        message.error(errorMessage, VERIFICATION_PAGE_NOTIFICATION_DURATION);
        setLoading(false);
      });
  }, [router.isReady]);

  return (
    <>
      <Header />
      <Spin spinning={loading} className="flex justify-center" />
    </>
  );
};

VerificationPage.propTypes = verificationPagePropTypes;
