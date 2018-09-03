const { TGIDS } = require('../../const')
const { coords } = require('../../world')
const { entityAt } = require('../../enitity')
const { filter } = require('../../helpers')
const Entity = require('../entity')

const cells = {
  [TGIDS.WATER]: 'w',
  [TGIDS.LAND]: 'l',
}

module.exports = ({ state }) => {
  const visibleEntities = filter(state.entities, e => e.visible);

  return (state.world.terrain || [])
    .map((cell, i) => {
      const terrain = cells[cell] || cells[TGIDS.WATER]
      const terrainAttr = cell === TGIDS.WATER ? '' : ` gid=${cell}`

      const { x, y } = coords(i) // todo: optimize for performance???
      const entityInside = entityAt({ entities: visibleEntities, x, y }) || {}
      const entity = entityInside.gid ? Entity(entityInside) : ''

      return `<${terrain}${terrainAttr}>${entity}</${terrain}>`
    })
    .join('')
}
