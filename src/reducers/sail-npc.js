const { map, filter } = require('../helpers')
const { entityAt } = require('../entity')

module.exports = (state = {}) => {
  const entities = state.entities || {}

  const sailedEntity = entity => {
    const { id, name, destX, destY } = entity

    if (destX === undefined || destY === undefined) return entity

    const entityAtNewLoc = entityAt({ entities, x: destX, y: destY, filter: e => e.hp > 0 })
    if (entityAtNewLoc) return entity // skip turn & wait for space

    console.log('NPC moves', name, id, destX, destY)

    return {
      ...entity,
      x: destX,
      y: destY,
      destX: undefined,
      destY: undefined,
    }
  }

  const sailingEntities = map(filter(entities, e => e.hp > 0), sailedEntity)

  return {
    ...state,
    entities: {
      ...entities,
      ...sailingEntities,
    }
  }
}
