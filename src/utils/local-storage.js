export const TOKEN_KEY = "flat-me-token";
export const UNSUBSCRIBED_KEY = "flat-me-unsubscribed";

export function getItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error("Local storage is not supported", error);
    return null;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Local storage is not supported", error);
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Local storage is not supported", error);
  }
}
