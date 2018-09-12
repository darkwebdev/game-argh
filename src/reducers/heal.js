const { playerEntity } = require('../entity')

const healedHp = ({ hp, maxHp }, hpPerTurn) => hp < maxHp ? Math.min(hp + hpPerTurn, maxHp) : hp

module.exports = ({ state = {}, config = {} }) => {
  const entities = state.entities || {}
  const player = playerEntity(entities) || {}
  const withUpdatedEntities = player.hp > 0 ? {
    entities: {
      ...entities,
      [player.id]: {
        ...player,
        hp: healedHp(player, config.hpPerTurn),
      }
    }
  } : {}

  return {
    ...state,
    ...withUpdatedEntities,
  }
}
