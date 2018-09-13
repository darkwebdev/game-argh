const { playerEntity } = require('../entity')
const { damageLevel } = require('../game')


module.exports = ({ state = {}, oldState = {}, config = {} }) => {
  const increasedMaxHp = ({ maxHp }) => maxHp + config.hpPerLevel

  const entities = state.entities || {}
  const oldEntities = oldState.entities || {}
  const player = playerEntity(entities) || {}
  const { damage: oldDamage } = playerEntity(oldEntities) || {}

  const level = damageLevel(player.damage, config.damageLevels)
  const oldLevel = damageLevel(oldDamage, config.damageLevels)

  const withUpdatedEntities = level > oldLevel ? {
    entities: {
      ...entities,
      [player.id]: {
        ...player,
        hp: increasedMaxHp(player),
        maxHp: increasedMaxHp(player)
      }
    }
  } : {}

  return {
    ...state,
    ...withUpdatedEntities,
  }
}
