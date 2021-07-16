import React from "react";
import { VerificationPage } from "components/VerificationPage";
import * as filtersService from "services/filters";

const ERROR_MESSAGE = "Čuvanje pretrage nije uspešno obavljeno";
const SUCCESS_MESSAGE = "Pretraga je uspešno sačuvana";

const FilterVerificationPage = () => (
  <VerificationPage
    errorMessage={ERROR_MESSAGE}
    successMessage={SUCCESS_MESSAGE}
    verify={filtersService.verifyFilter}
  />
);

export default FilterVerificationPage;
