module.exports = {
  map(obj = {}, cb) {
    return Object.keys(obj).map(key => cb(obj[key])).reduce((acc, item) => ({ ...acc, item }))
  },

  find(obj = {}, cb) {
    return obj[Object.keys(obj).find(key => cb(obj[key]))]
  }
}
