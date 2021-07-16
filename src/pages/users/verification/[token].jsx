import React from "react";
import { VerificationPage } from "components/VerificationPage";
import * as usersService from "services/users";

const ERROR_MESSAGE = "Mejl nije potvrđen";
const SUCCESS_MESSAGE = "Mejl je uspešno potvrđen";

const UserVerificationPage = () => (
  <VerificationPage
    errorMessage={ERROR_MESSAGE}
    successMessage={SUCCESS_MESSAGE}
    verify={usersService.verifyUser}
  />
);

export default UserVerificationPage;
