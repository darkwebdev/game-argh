module.exports = {
  map(obj = {}, cb = item => item) {
    return Object.entries(obj)
      .map(([key, value]) => ({ [key]: cb(value, key) }))
      .reduce((acc, item) => ({ ...acc, ...item }), {})
  },

  flatMap(arr, cb) {
    return arr.reduce((x, y) => [...x, ...cb(y)], [])
  },

  find(obj = {}, cb = () => false) {
    return obj[Object.keys(obj).find(key => cb(obj[key], key))]
  },

  findKey(obj = {}, cb = () => false) {
    return Object.keys(obj).find(key => cb(obj[key], key))
  },

  reduce(obj = {}, cb = item => item, initial = {}) {
    return Object.entries(obj).reduce((acc, [key, value]) => cb(acc, value, key), initial)
  },

  filter(obj = {}, cb = () => true) {
    return Object.entries(obj)
      .filter(([key, value]) => cb(value, key))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
  },

  filterValues(obj = {}, cb = () => true) {
    return Object.keys(obj).filter(key => cb(obj[key], key)).map(key => obj[key])
  },

  range(length) {
    return [...Array(length).keys()]
  },
}
