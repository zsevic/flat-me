import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as usersService from "services/users";

const VerifyUserPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const [response, setResponse] = useState("");

  useEffect(() => {
    usersService.verifyUser(token).then(() => {
      setResponse("Mejl je uspešno potvrđen");
    });
  });

  return <>{response}</>;
};

export default VerifyUserPage;
