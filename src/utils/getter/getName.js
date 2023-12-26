import get from './get'
const getName = (obj, path, defaultValue = '') => {
  path = path + '_name'
  return get(obj, path, defaultValue)
}
export default getName