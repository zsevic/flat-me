import { message } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Header } from "components/Header";
import { VERIFICATION_PAGE_NOTIFICATION_DURATION } from "constants/config";
import * as filtersService from "services/filters";

const FilterVerificationPage = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    filtersService
      .verifyFilter(token)
      .then(
        () => message.success("Pretraga je uspešno sačuvana"),
        VERIFICATION_PAGE_NOTIFICATION_DURATION
      )
      .catch(
        () => message.error("Čuvanje pretrage nije uspešno obavljeno"),
        VERIFICATION_PAGE_NOTIFICATION_DURATION
      );
  }, []);

  return <Header />;
};

export default FilterVerificationPage;
