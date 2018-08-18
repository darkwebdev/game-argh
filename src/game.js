'use strict'

const { reduce } = require('./helpers')
const { directions, terrains } = require('./const')
const { minX, maxX, minY, maxY } = require('./world')
const { events } = require('./events')
const { enemyNearby, allyNearby, portNearby, playerEntity, entityAt } = require('./enitity')
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

  playerActions({ state }) {
    if (state.gameOver) return [ { event: events.NEW_GAME } ]

    const entities = state.entities
    const terrain = state.world.terrain
    const { x, y } = playerEntity(entities)

    return [
      ...sailEvents({ terrain, entities, x, y }),
      ...tradeEvent({ entities, x, y }),
      ...fightEvent({ entities, x, y }),
      ...shopEvent({ entities, x, y })
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
  const entityAtNewLoc = entityAt({ entities, x: newX, y: newY, filter: e => e.hp > 0 })

  if (terrainAtNewLoc === terrains.gids.LAND) {
    return []
  }

  if (entityAtNewLoc) {
    return []
  }

  return [ { event: events.SAIL, direction } ]
}

function tradeEvent({ entities, x, y }) {
  const ally = allyNearby({ entities, x, y });

  return ally ? [ { event: events.TRADE, entityId: ally.id } ] : [];
}

function fightEvent({ entities, x, y }) {
  const enemy = enemyNearby({ entities, x, y });

  return enemy ? [ { event: events.FIGHT, entityId: enemy.id } ] : [];
}

function shopEvent({ entities, x, y }) {
  const port = portNearby({ entities, x, y });

  return port ? [ { event: events.SHOP, entityId: port.id } ] : [];
}

function armorDamage(armor, damage) {
  return armor < damage ? 0 : armor - damage
}

function hpDamage(hp, armor, damage) {
  const newHp = (hp + armor < damage) ? 0 : hp + armor - damage

  return Math.min(newHp, hp)
}
