const { playerEntity } = require('../enitity')

module.exports = state => portId => {
  const player = playerEntity(state.entities)
  const port = state.entities[portId]
  const betterArmor = port.armorUp || player.maxArmor

  return {
    ...state,
    entities: {
      ...state.entities,
      [player.id]: {
        ...player,
        hp: player.maxHp,
        armor: betterArmor,
        maxArmor: betterArmor,
      },
      [port.id]: {
        ...port,
        armorUp: undefined,
      }
    }
  }
}
