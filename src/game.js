const { DIRECTIONS } = require('./const')
const { EVENTS } = require('./events')
const { entitiesNearby, playerEntity, entityAt, isAlliedPort } = require('./entity')
const { terrainAt, isLand, locationAt } = require('./terrain')

const sailEvents = ({ terrain, entities, x, y }) =>
  Object.keys(DIRECTIONS).reduce((arr, key) => [
    ...arr,
    ...sailEvent({ terrain, entities, x, y, direction: DIRECTIONS[key] })
  ], [])


const sailEvent = ({ terrain, entities, x, y, direction }) => {
  const { x: newX, y: newY } = locationAt({ x, y }, direction)
  const terrainAtNewLoc = terrainAt({ terrain, x: newX, y: newY })
  const entityAtNewLoc = entityAt({ entities, x: newX, y: newY, filter: e => e.hp > 0 || e.timeout > 0 })

  if (isLand(terrainAtNewLoc)) {
    return []
  }

  if (entityAtNewLoc) {
    return []
  }

  return [ { event: EVENTS.SAIL, direction } ]
}

const fightEvents = ({ entities, x, y }) => {
  const bombEvent = {
    event: EVENTS.BOMB,
    x,
    y
  }

  return [
    bombEvent,
  ]
}

const portEvents = ({ entities, x, y, armor, maxArmor, enemyId }) => {
  const damagedArmor = maxArmor - armor
  const alliedPorts = entitiesNearby({ entities, x, y, filter: isAlliedPort })

  const armorRepairEvents = enemyId !== undefined || damagedArmor <= 0 ? [] : alliedPorts.map(p => ({
    event: EVENTS.REPAIR,
    portId: p.id
  }))

  const armorUpEvents = alliedPorts.filter(p => p.armorUp > maxArmor).map(p => ({
    event: EVENTS.UPGRADE,
    portId: p.id
  }))

  return [
    ...armorUpEvents,
    ...armorRepairEvents,
  ]
}

const armorDamage = (armor, damage) => armor < damage ? 0 : armor - damage

const hpDamage = (hp, armor, damage) => {
  const newHp = (hp + armor < damage) ? 0 : hp + armor - damage

  return Math.min(newHp, hp)
}

const damageLevel = (dmg, damageLevels = []) =>
  damageLevels.findIndex(damageLevel => dmg < damageLevel)

const damageToLevel = (dmg, damageLevels = []) =>
  damageLevels[damageLevel(dmg, damageLevels)] - dmg

const percentOfLevel = (dmg, damageLevels = []) => {
  const level = damageLevel(dmg, damageLevels)
  const lastLevelDmg = damageLevels[level - 1] || 0
  const ofLevel = dmg - lastLevelDmg
  const betweenLevels = damageLevels[level] - lastLevelDmg

  return ofLevel * 100 / betweenLevels
}

const loot = (enemyHp, enemyDmg) => enemyHp <= 0 ? Math.floor(enemyDmg / 10) : 0

module.exports = {
  roundOutcome(entity1, entity2) {
    const { hp: oldHp1, damage: dmg1, armor: arm1 } = entity1
    const { hp: oldHp2, damage: dmg2, armor: arm2 } = entity2

    const hp1 = hpDamage(oldHp1, arm1, dmg2)
    const hp2 = hpDamage(oldHp2, arm2, dmg1)

    console.log('LOOT', loot(hp2, dmg2) || loot(hp1, dmg1))

    return {
      hp1,
      hp2,
      damage1: dmg1 + loot(hp2, dmg2),

      armor1: armorDamage(arm1, dmg2),
      armor2: armorDamage(arm2, dmg1),
      damage2: dmg2 + loot(hp1, dmg1),
    }
  },

  playerActions({ state } = {}) {
    if (!state) return [
      { event: EVENTS.NEW_GAME }
    ]

    if (state.gameOver || state.victory) return [
      { event: EVENTS.NEW_GAME }
    ]

    const entities = state.entities
    const terrain = state.world.terrain
    const { x, y, armor, maxArmor, enemyId } = playerEntity(entities)

    return [// use flatmap here?
      ...sailEvents({ terrain, entities, x, y }),
      ...fightEvents({ entities, x, y }),
      ...portEvents({ entities, x, y, armor, maxArmor, enemyId }),
    ]
  },

  hpDamage,
  armorDamage,
  damageLevel,
  damageToLevel,
  percentOfLevel,
}
