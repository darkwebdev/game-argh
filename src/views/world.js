'use strict'

module.exports = ({ state }) =>
  (state.world || []).map(row =>
    row.map(cell => `<div>${cell}</div>`)
  )
