import React from "react";
import { VerificationPage } from "components/VerificationPage";
import { activationType, VERIFICATION_SUCCESS_MESSAGE } from "constants/config";
import * as filtersService from "services/filters";

const ERROR_MESSAGE = "Čuvanje pretrage nije uspelo";
const SUCCESS_MESSAGE = "Uspešno sačuvana pretraga";

const FilterVerificationPage = () => (
  <VerificationPage
    errorMessage={ERROR_MESSAGE}
    successMessage={SUCCESS_MESSAGE}
    successMessageDescription={VERIFICATION_SUCCESS_MESSAGE}
    verify={filtersService.verifyFilter}
    title="FlatMe | Čuvanje pretrage"
    type={activationType}
  />
);

export default FilterVerificationPage;
