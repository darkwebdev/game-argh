const { playerEntity } = require('../enitity')
const { filter, map } = require('../helpers')
const bombReducer = require('./bomb')

const healedHp = ({ hp, maxHp }, hpPerTurn) => hp < maxHp ? Math.min(hp + hpPerTurn, maxHp) : hp

module.exports = ({ oldState, state, config }) => {
  const updatedState = {
    ...oldState,
    ...state,
  }

  const entities = updatedState.entities

  const player = playerEntity(entities)
  // todo: npc random movement

  // Sunk ships reducer
  const ships = filter(entities, e => e.hp !== undefined)
  const withoutSunkShips = map(ships, e => ({
    ...e,
    visible: !(e.hp <= 0 && oldState.entities[e.id].hp <= 0)
  }))

  return {
    ...updatedState,
    entities: {
      ...entities,
      ...withoutSunkShips,
      ...bombReducer(entities),
      [player.id]: {
        ...player,
        hp: healedHp(player, config.hpPerTurn)
      }
    }
  }
}
