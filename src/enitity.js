const { find, reduce } = require('./helpers')
const { directionCoords } = require('./world')
const { entities: eConsts, directions } = require('./const')

module.exports = {
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
  }
}

function entityAt({ entities, x, y, filter = () => true }) {
  return find(entities, e => e.x === x && e.y === y && filter(e))
}


function entitiesNearby({ entities, x, y, filter = () => true }) {
  const entityTo = (direction) => {
    const { x: dx, y: dy } = directionCoords({ direction, x, y })
    const entity = entityAt({ entities, x: dx, y: dy, filter: notSunk })

    return (entity && filter(entity)) ? [ entity ] : []
  }

  return reduce(directions, (arr, d) => [
    ...arr,
    ...entityTo(d)
  ], [])
}

function notSunk(entity) {
  return entity.hp === undefined || entity.hp > 0
}

function isAlly(entity) {
  return entity.gid === eConsts.gids.ALLY
}

function isEnemy(entity) {
  return entity.gid === eConsts.gids.ENEMY
}

function isPlayer(entity) {
  return entity.gid === eConsts.gids.PLAYER
}

function isPort(entity) {
  return entity.gid === eConsts.gids.PORT
}
