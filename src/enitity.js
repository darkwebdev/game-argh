'use strict';

const { find } = require('./helpers')
const { directionCoords } = require('./world')
const { entities: eConsts, directions } = require('./const')

module.exports = {
  playerEntity(entities) {
    return find(entities, isPlayer)
  },

  entityAt,

  entityNearby,

  allyNearby({ entities, x, y }) {
    return entityNearby({ entities, x, y, filter: isAlly })
  },

  enemyNearby({ entities, x, y }) {
    return entityNearby({ entities, x, y, filter: isEnemy })
  },

  portNearby({ entities, x, y }) {
    return entityNearby({ entities, x, y, filter: isPort })
  }
}

function entityAt({ entities, x, y, filter = () => true }) {
  return find(entities, e => e.x === x && e.y === y && filter(e))
}

function entityNearby({ entities, x, y, filter = () => true }) {
  const entityTo = (direction) => {
    const { x: dx, y: dy } = directionCoords({ direction, x, y })
    const entity = entityAt({ entities, x: dx, y: dy, filter: e => e.hp > 0 })

    return (entity && filter(entity)) ? entity : undefined
  }

  return entityTo(directions.NORTH) ||
    entityTo(directions.EAST) ||
    entityTo(directions.SOUTH) ||
    entityTo(directions.WEST)
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
