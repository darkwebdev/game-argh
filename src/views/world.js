'use strict'

const { terrains } = require('../const')
const { coords } = require('../world')
const { entityAt } = require('../enitity')

const cells = {
  [terrains.gids.WATER]: 'w',
  [terrains.gids.LAND]: 'l'
}

module.exports = ({ state }) =>
  (state.world.terrain || [])
    .map((cell, i) => {
      const el = cells[cell]
      const { x, y } = coords(i) // todo: optimize for performance
      const entity = entityAt({ entities: state.entities, x, y })
      const className = entity && `entity-${entity.gid}`
      const attrs = className ? ` class="${className}"` : '';

      return `<${el}${attrs}></${el}>`
    })
    .join('')
  // (state.world || []).map(row =>
  //   row.map(cell => `<div>${cell}</div>`)
  // )
