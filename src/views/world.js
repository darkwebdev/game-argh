'use strict'

const cells = [ , 'w', 'l', 'x', 'x', 'x' ]

module.exports = ({ state }) =>
  (state.world || [])
    .map(cell => {
      const el = cells[cell]

      return `<${el}></${el}>`
    })
    .join('')
  // (state.world || []).map(row =>
  //   row.map(cell => `<div>${cell}</div>`)
  // )
