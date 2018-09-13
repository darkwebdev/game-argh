const { find, reduce } = require('./helpers')
const { directionCoords } = require('./world')
const { EGIDS, DIRECTIONS } = require('./const')

const entityAt = ({ entities, x, y, filter = () => true }) =>
  find(entities, e => e.x === x && e.y === y && filter(e))

const entityWillBeAt = ({ entities, x, y, filter = () => true }) =>
  find(entities, e => filter(e) && notSunk(e) && (
    e.destX === x && e.destY === y ||
    e.destX === undefined && e.destY === undefined && e.x === x && e.y === y
  ))

const entitiesNearby = ({ entities, x, y, filter = () => true }) => {
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

const notSunk = entity => entity.hp === undefined || entity.hp > 0

const isAlly = entity => entity.gid === EGIDS.ALLY

const isEnemy = entity => entity.gid === EGIDS.ENEMY

const isPlayer = entity => entity.gid === EGIDS.PLAYER

const isPort = entity => [EGIDS.ALLY_PORT, EGIDS.ENEMY_PORT].includes(entity.gid)

const isAlliedPort = entity => entity.gid === EGIDS.ALLY_PORT

const isBoss = entity => entity.gid === EGIDS.BOSS

module.exports = {
  toObj(entities) {
    return entities.reduce((es, e) => ({ ...es, [e.id]: e }), {})
  },

  playerEntity(entities) {
    return find(entities, isPlayer)
  },

  entityAt,
  entityWillBeAt,

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

  isPort,
  isAlliedPort,
  isPlayer,
  isBoss,

  areOpposed(e1, e2) {
    const allies = [EGIDS.PLAYER, EGIDS.ALLY, EGIDS.ALLY_PORT]
    const enemies = [EGIDS.BOSS, EGIDS.ENEMY, EGIDS.ENEMY_PORT]

    return allies.includes(e1.gid) && enemies.includes(e2.gid) ||
      enemies.includes(e1.gid) && allies.includes(e2.gid)
  },

  newId(entities) {
    const maxId = reduce(entities, (maxId, e) => Math.max(maxId, e.id), 0)

    return maxId + 1
  }
}
