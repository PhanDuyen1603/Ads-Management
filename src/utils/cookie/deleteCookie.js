/**
 * deleteCookie
 * @param {string} key
 */
export default function deleteCookie(key) {
  document.cookie = `${key}=;Path=/;`;
}