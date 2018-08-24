const { playerEntity } = require('../enitity')

module.exports = state => portId => {
  const player = playerEntity(state.entities)
  const betterArmor = state.entities[portId].armorUp || player.maxArmor

  return {
    ...state,
    entities: {
      ...state.entities,
      [player.id]: {
        ...player,
        armor: betterArmor,
        maxArmor: betterArmor,
      }
    }
  }
}
