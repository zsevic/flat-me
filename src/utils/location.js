export function getLocationUrl({ latitude = null, longitude = null } = {}) {
  if (!latitude || !longitude) return;

  return `http://www.google.com/maps/place/${latitude},${longitude}`; // eslint-disable-line consistent-return
}
