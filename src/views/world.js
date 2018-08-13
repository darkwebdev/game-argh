'use strict'

module.exports = ({ state }) =>
  (state.world || [])
    .map(cell => `<div class="cell-${cell}"></div>`)
    .join('')
  // (state.world || []).map(row =>
  //   row.map(cell => `<div>${cell}</div>`)
  // )
