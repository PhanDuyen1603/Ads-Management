/**
 * @desc parse cookie to object
 * @param {string} str
 * @returns {object}
 */
export default function parseCookie(str) {
  if (!str) return {};
  return str
    .split(';')
    .filter(i => i)
    .map(x => x.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
}