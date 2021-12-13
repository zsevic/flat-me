import React from "react";
import { VerificationPage } from "components/VerificationPage";
import * as filtersService from "services/filters";

const ERROR_MESSAGE = "Brisanje pretrage nije uspelo";
const SUCCESS_MESSAGE = "Uspešno izbrisana pretraga";
const DEACTIVATION_SUCCESS_MESSAGE =
  "Možete da sačuvate novu pretragu na osnovu željenih kriterijuma.";

const FilterDeactivationPage = () => (
  <VerificationPage
    errorMessage={ERROR_MESSAGE}
    successMessage={SUCCESS_MESSAGE}
    successMessageDescription={DEACTIVATION_SUCCESS_MESSAGE}
    verify={filtersService.deactivateFilter}
    title="FlatMe | Brisanje sačuvane pretrage"
  />
);

export default FilterDeactivationPage;
