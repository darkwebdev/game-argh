const { reduce } = require('./helpers')
const { directions, terrains } = require('./const')
const { minX, maxX, minY, maxY } = require('./world')
const { events } = require('./events')
const { enemiesNearby, alliesNearby, portsNearby, playerEntity, entityAt } = require('./enitity')
const { terrainAt } = require('./terrain')

module.exports = {
  roundOutcome(entity1, entity2) {
    const { hp: hp1, damage: dmg1, armor: arm1 } = entity1
    const { hp: hp2, damage: dmg2, armor: arm2 } = entity2

    return {
      hp1: hpDamage(hp1, arm1, dmg2),
      hp2: hpDamage(hp2, arm2, dmg1),
      armor1: armorDamage(arm1, dmg2),
      armor2: armorDamage(arm2, dmg1)
    }
  },

  locationAt,

  playerActions({ state } = {}) {
    if (!state) return [
      { event: events.NEW_GAME }
    ]

    if (state.gameOver) return [
      { event: events.NEW_GAME }
    ]

    const entities = state.entities
    const terrain = state.world.terrain
    const { x, y, armor, maxArmor } = playerEntity(entities)

    return [
      ...sailEvents({ terrain, entities, x, y }),
      ...tradeEvents({ entities, x, y }),
      ...fightEvents({ entities, x, y }),
      ...portEvents({ entities, x, y, armor, maxArmor }),
    ]
  },

  hpDamage,
  armorDamage,
}

function locationAt({ x, y }, direction) {
  return {// do we need edge checks here or outside?
    [directions.NORTH]: { x, y: y > minY ? y - 1 : y },
    [directions.SOUTH]: { x, y: y < maxY ? y + 1: y },
    [directions.EAST]: { x: x < maxX ? x + 1 : x, y },
    [directions.WEST]: { x: x > minX ? x - 1 : x, y }
  }[direction] || { x, y }
}

function sailEvents({ terrain, entities, x, y }) {
  return Object.keys(directions).reduce((arr, key) => [
    ...arr,
    ...sailEvent({ terrain, entities, x, y, direction: directions[key] })
  ], [])
}

function sailEvent({ terrain, entities, x, y, direction }) {
  const { x: newX, y: newY } = locationAt({ x, y }, direction)
  const terrainAtNewLoc = terrainAt({ terrain, x: newX, y: newY })
  const entityAtNewLoc = entityAt({ entities, x: newX, y: newY, filter: e => e.hp > 0 || e.timeout > 0 })

  if (terrainAtNewLoc === terrains.gids.LAND) {
    return []
  }

  if (entityAtNewLoc) {
    return []
  }

  return [ { event: events.SAIL, direction } ]
}

function tradeEvents({ entities, x, y }) {
  return alliesNearby({ entities, x, y }).map(a => ({
    event: events.TRADE,
    entityId: a.id
  }))
}

function fightEvents({ entities, x, y }) {
  const enemyFightEvents = enemiesNearby({ entities, x, y }).map(e => ({
    event: events.FIGHT,
    entityId: e.id
  }))

  const bombEvent = {
    event: events.BOMB,
    x,
    y
  }

  return [
    ...enemyFightEvents,
    bombEvent,
  ]
}

function portEvents({ entities, x, y, armor, maxArmor }) {
  const damagedArmor = maxArmor - armor
  const ports = portsNearby({ entities, x, y })

  const armorRepairEvents = damagedArmor <= 0 ? [] : ports.map(p => ({
    event: events.REPAIR,
    portId: p.id
  }))

  const armorUpEvents = ports.filter(p => p.armorUp > maxArmor).map(p => ({
    event: events.UPGRADE,
    portId: p.id
  }))

  return [
    ...armorUpEvents,
    ...armorRepairEvents,
  ]
}

function armorDamage(armor, damage) {
  return armor < damage ? 0 : armor - damage
}

function hpDamage(hp, armor, damage) {
  const newHp = (hp + armor < damage) ? 0 : hp + armor - damage

  return Math.min(newHp, hp)
}
