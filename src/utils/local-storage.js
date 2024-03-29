export const INITIAL_FILTERS_KEY = "initial-filters";
export const STATE_KEY = "state";
export const TOKEN_KEY = "flat-me-token";

export function getItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error("Local storage (getItem) is not supported", error);
    return null;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Local storage (setItem) is not supported", error);
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Local storage (removeItem) is not supported", error);
  }
}
