import React from "react";
import { VerificationPage } from "components/VerificationPage";
import * as filtersService from "services/filters";

const ERROR_MESSAGE = "Brisanje pretrage nije uspešno obavljeno";
const SUCCESS_MESSAGE = "Pretraga je uspešno izbrisana";

const FilterDeactivationPage = () => (
  <VerificationPage
    errorMessage={ERROR_MESSAGE}
    successMessage={SUCCESS_MESSAGE}
    verify={filtersService.deactivateFilter}
  />
);

export default FilterDeactivationPage;
