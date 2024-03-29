import { Alert, Col, Row, Spin } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "components/Header";
import { BAD_REQUEST_STATUS_CODE } from "constants/status-codes";
import { getApartmentStatus } from "services/apartments";
import { trackEvent } from "utils/analytics";
import { commonProps, rowGutter } from "utils/common";

const ApartmentStatus = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const spinTip = "Učitavanje oglasa u toku...";

  useEffect(() => {
    if (!router.isReady) return;

    async function loadApartment(apartmentId) {
      try {
        const apartmentStatus = await getApartmentStatus(apartmentId);
        if (apartmentStatus.isValid) {
          const [providerName] = id.split("_");
          trackEvent(
            `email-notifications-visited-ad-${providerName}`,
            `email-notifications-visited-ad-${id}`
          );
          return router.replace(apartmentStatus.url);
        }
        setIsLoading(false);
        setErrorMessage("Oglas je istekao");
        return setShowErrorMessage(true);
      } catch (error) {
        if (error?.response?.status === BAD_REQUEST_STATUS_CODE) {
          setErrorMessage("Nepostojeći oglas");
          setErrorMsg("Pogrešna URL adresa");
        } else {
          console.error(error);
          setErrorMessage("Došlo je do greške, pokušajte ponovo kasnije");
        }
        setIsLoading(false);
        return setShowErrorMessage(true);
      }
    }

    loadApartment(id).catch(console.error);
  }, [router.isReady]);

  const errorAlertProps = {
    ...commonProps,
    type: "error",
    message: errorMessage,
    ...(errorMsg && { description: errorMsg }),
  };

  return (
    <div className="px-2">
      <Head>
        <title>FlatMe | Učitavanje oglasa</title>
      </Head>
      <Header />
      <div className="text-center">
        <Spin spinning={isLoading} tip={spinTip} />
      </div>
      {!isLoading && showErrorMessage && (
        <Row gutter={rowGutter}>
          <Col className="mx-auto">
            <Alert {...errorAlertProps} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ApartmentStatus;
