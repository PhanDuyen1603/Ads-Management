/**
 * @desc get object value thourgh path
 * @param {Object} obj
 * @param {String} path object path seperate with custom seperator
 * @param {String} defaultValue
 * @param {String} separator
 */

const get = (obj, path, defaultValue = '', separator = '_') => {
  let res = obj
  const keys = path.split(separator)
  for (let index = 0; index < keys.length; index++) {
    const val = res?.[keys[index]]
    // console.log({
    //   index, val, res, key: keys[index]
    // })
    if (val == null ) {
      if( typeof res === 'object') res = defaultValue
      break;
    }
    res = val
  }
  return defaultValue || keys.length && res
}

export default get