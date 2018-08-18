'use strict'

const { playerActions } = require('../game')

module.exports = state => ({
  actions: playerActions({ state }),
})
