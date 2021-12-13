import React from "react";
import { VerificationPage } from "components/VerificationPage";
import * as filtersService from "services/filters";

const ERROR_MESSAGE = "Čuvanje pretrage nije uspelo";
const SUCCESS_MESSAGE = "Uspešno sačuvana pretraga";
const VERIFICATION_SUCCESS_MESSAGE =
  "Dva puta dnevno ćete primati obaveštenja o novim stanovima na osnovu sačuvane pretrage.";

const FilterVerificationPage = () => (
  <VerificationPage
    errorMessage={ERROR_MESSAGE}
    successMessage={SUCCESS_MESSAGE}
    successMessageDescription={VERIFICATION_SUCCESS_MESSAGE}
    verify={filtersService.verifyFilter}
    title="FlatMe | Čuvanje pretrage"
  />
);

export default FilterVerificationPage;
