export const TOKEN_KEY = "flat-me-token";

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
