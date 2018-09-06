const { playerEntity, entityAt } = require('../enitity')
const { terrainAt } = require('../terrain')
const { locationAt } = require('../game')
const { TGIDS } = require('../const')

module.exports = state => direction => {
  const entities = state.entities
  const terrain = state.world.terrain
  const player = playerEntity(state.entities)
  const { x, y } = locationAt({ x: player.x, y: player.y }, direction)
  const terrainAtNewLoc = terrainAt({ terrain, x, y })
  const entityAtNewLoc = entityAt({ entities, x, y, filter: e => e.hp > 0 })

  if (terrainAtNewLoc === TGIDS.LAND) {
    console.log('Can not travel by land')
    return {}
  }

  if (entityAtNewLoc) {
    console.log('Location already busy')
    return {}
  }

  return {
    entities: {
      ...state.entities,
      [player.id]: {
        ...player,
        x,
        y
      }
    }
  }
}
