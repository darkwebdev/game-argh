const { find, reduce } = require('./helpers')
const { directionCoords } = require('./world')
const { EGIDS, DIRECTIONS } = require('./const')

module.exports = {
  toObj(entities) {
    return entities.reduce((es, e) => ({ ...es, [e.id]: e }), {})
  },

  playerEntity(entities) {
    return find(entities, isPlayer)
  },

  entityAt,

  entitiesNearby,

  alliesNearby({ entities, x, y }) {
    return entitiesNearby({ entities, x, y, filter: isAlly })
  },

  enemiesNearby({ entities, x, y }) {
    return entitiesNearby({ entities, x, y, filter: isEnemy })
  },

  portsNearby({ entities, x, y }) {
    return entitiesNearby({ entities, x, y, filter: isPort })
  },

  newId(entities) {
    const maxId = reduce(entities, (maxId, e) => Math.max(maxId, e.id), 0)

    return maxId + 1
  }
}

function entityAt({ entities, x, y, filter = () => true }) {
  return find(entities, e => e.x === x && e.y === y && filter(e))
}


function entitiesNearby({ entities, x, y, filter = () => true }) {
  const entityTo = direction => {
    const { x: dx, y: dy } = directionCoords({ direction, x, y })
    const entity = entityAt({ entities, x: dx, y: dy, filter: notSunk })

    return (entity && filter(entity)) ? [ entity ] : []
  }

  return reduce(DIRECTIONS, (arr, d) => [
    ...arr,
    ...entityTo(d)
  ], [])
}

function notSunk(entity) {
  return entity.hp === undefined || entity.hp > 0
}

function isAlly(entity) {
  return entity.gid === EGIDS.ALLY
}

function isEnemy(entity) {
  return entity.gid === EGIDS.ENEMY
}

function isPlayer(entity) {
  return entity.gid === EGIDS.PLAYER
}

function isPort(entity) {
  return entity.gid === EGIDS.PORT
}
