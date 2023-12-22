/**
 * @desc set cookie
 * @param {string} key
 * @param {*} value
 */
export default function setCookie(key, value) {
  document.cookie = `${key}=${value};Path=/;`;
}