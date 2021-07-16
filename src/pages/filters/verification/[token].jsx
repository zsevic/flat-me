import { message, Spin } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "components/Header";
import { VERIFICATION_PAGE_NOTIFICATION_DURATION } from "constants/config";
import * as filtersService from "services/filters";

const FilterVerificationPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      filtersService
        .verifyFilter(token)
        .then(() => {
          message.success(
            "Pretraga je uspešno sačuvana",
            VERIFICATION_PAGE_NOTIFICATION_DURATION
          );
          setLoading(false);
        })
        .catch(() => {
          message.error(
            "Čuvanje pretrage nije uspešno obavljeno",
            VERIFICATION_PAGE_NOTIFICATION_DURATION
          );
          setLoading(false);
        }),
    []
  );

  return (
    <>
      <Header />
      <Spin spinning={loading} className="flex justify-center" />
    </>
  );
};

export default FilterVerificationPage;
