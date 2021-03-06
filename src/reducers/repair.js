const { playerEntity } = require('../entity')

module.exports = state => {
  const player = playerEntity(state.entities)

  return {
    ...state,
    entities: {
      ...state.entities,
      [player.id]: {
        ...player,
        armor: player.maxArmor
      }
    }
  }
}
