const { playerActions } = require('../game')

module.exports = state => ({
  ...state,
  actions: playerActions({ state }),
})
