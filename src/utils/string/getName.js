export default function getName(o, defaultValue = '') {
  if(!o) return defaultValue
  if(typeof o === 'string') return 0
  return o.name || o.title || defaultValue
}