const { playerEntity } = require('../enitity')
const { filter, map } = require('../helpers')

module.exports = ({ oldState, state, config }) => {
  const updatedState = {
    ...oldState,
    ...state,
  }

  const player = playerEntity(updatedState.entities)
  // todo: npc random movement
  // should other entities heal???

  const ships = filter(updatedState.entities, e => e.hp !== undefined)
  const withoutSunkShips = map(ships, e => ({
    ...e,
    visible: !(e.hp <= 0 && oldState.entities[e.id].hp <= 0)
  }))

  return {
    ...updatedState,
    entities: {
      ...updatedState.entities,
      ...withoutSunkShips,
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
