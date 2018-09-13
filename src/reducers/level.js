const { playerEntity } = require('../entity')
const { damageLevel } = require('../game')


module.exports = ({ state = {}, oldState = {}, config = {}, sound }) => {
  const { sounds, play } = sound
  const entities = state.entities || {}
  const oldEntities = oldState.entities || {}
  const player = playerEntity(entities) || {}
  const { damage: oldDamage } = playerEntity(oldEntities) || {}

  const level = damageLevel(player.damage, config.damageLevels)
  const oldLevel = damageLevel(oldDamage, config.damageLevels)


  const withIncreasedMaxHp = () => {
    play(sounds.upgrade)

    const increasedMaxHp = player.maxHp + config.hpPerLevel

    return {
      entities: {
        ...entities,
        [player.id]: {
          ...player,
          hp: increasedMaxHp,
          maxHp: increasedMaxHp,
        },
      },
    }
  }

  return {
    ...state,
    ...(level > oldLevel ? withIncreasedMaxHp() : {}),
  }
}
