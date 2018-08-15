module.exports = {
  map(obj = {}, cb = item => item) {
    return Object.entries(obj)
      .map(([key, value]) => ({ [key]: cb(value, key) }))
      .reduce((acc, item) => ({ ...acc, ...item }), {})
  },

  find(obj = {}, cb = item => item) {
    return obj[Object.keys(obj).find(key => cb(obj[key], key))]
  },

  reduce(obj = {}, cb = item => item) {
    return Object.keys(obj).reduce((acc, key) => cb(acc, obj[key], key))
  },

  filter(obj = {}, cb = item => item) {
    return Object.entries(obj)
      .filter(([key, value]) => cb(value, key))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
  }
}
