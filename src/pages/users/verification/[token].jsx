import { message, Spin } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "components/Header";
import { VERIFICATION_PAGE_NOTIFICATION_DURATION } from "constants/config";
import * as usersService from "services/users";

const UserVerificationPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      usersService
        .verifyUser(token)
        .then(() => {
          message.success(
            "Mejl je uspešno potvrđen",
            VERIFICATION_PAGE_NOTIFICATION_DURATION
          );
          setLoading(false);
        })
        .catch(() => {
          message.error(
            "Mejl nije potvrđen",
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

export default UserVerificationPage;
