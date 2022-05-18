import { EMAIL_NOTIFICATIONS_SUCCESS_MESSAGE } from "./config";

export const emailNotValidErrorMessage = "Unesite ispravan email";
export const filtersLimitErrorMessage =
  "Nije dozvoljeno sačuvati još pretraga za unetu e-mail adresu. Ukoliko želite da promenite filter, potrebno je da prvo deaktivirate postojeći kad Vam stigne neko obaveštenje.";
export const tooManyRequestsErrorMessage =
  "Prekoračen je broj pokušaja, pokušajte ponovo za 24 sata.";
export const tokenAlreadyUsedErrorMessage = "Link je već iskorišćen.";
export const userNotVerifiedErrorMessage = `Nije dozvoljeno sačuvati još pretraga za unetu e-mail adresu. E-mail adresa nije potvrđena. ${EMAIL_NOTIFICATIONS_SUCCESS_MESSAGE}`;

export const defaultNotificationsBlockedErrorMessage =
  "Obaveštenja nisu uključena.";
export const notificationsBlockedErrorMessage =
  "Obaveštenja nisu uključena. Potrebno je da dozvolite (u podešavanjima pretraživača) primanje obaveštenja sa FlatMe aplikacije.";
