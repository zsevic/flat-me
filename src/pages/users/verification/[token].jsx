import { message } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Header } from "components/Header";
import { VERIFICATION_PAGE_NOTIFICATION_DURATION } from "constants/config";
import * as usersService from "services/users";

const UserVerificationPage = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    usersService
      .verifyUser(token)
      .then(
        () => message.success("Mejl je uspešno potvrđen"),
        VERIFICATION_PAGE_NOTIFICATION_DURATION
      )
      .catch(
        () => message.error("Mejl nije potvrđen"),
        VERIFICATION_PAGE_NOTIFICATION_DURATION
      );
  }, []);

  return <Header />;
};

export default UserVerificationPage;
