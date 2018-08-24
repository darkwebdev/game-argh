const { playerEntity } = require('../enitity')

module.exports = ({ state, config }) => {
  const player = playerEntity(state.entities)
  // todo: npc random movement
  // should other entities heal???

  return {
    entities: {
      ...state.entities,
      [player.id]: {
        ...player,
        hp: healedHp(player, config.hpPerTurn)
      }
    }
  }
}

function healedHp({ hp, maxHp }, hpPerTurn) {
  return hp < maxHp ? Math.min(hp + hpPerTurn, maxHp) : hp
}
