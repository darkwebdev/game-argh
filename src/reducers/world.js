const { playerEntity } = require('../enitity')
const bombReducer = require('./bomb')
const portReducer = require('./port')
const sinkReducer = require('./sink')
const healReducer = require('./heal')

module.exports = ({ oldState, state, config }) => {
  const updatedState = {
    ...oldState,
    ...state,
  }

  const entities = updatedState.entities

  const entitiesWithoutSunkShips = {
    ...entities,
    ...sinkReducer({ entities, oldEntities: oldState.entities }),
  }

  const entitiesWithShotByPorts = {
    ...entitiesWithoutSunkShips,
    ...portReducer(entitiesWithoutSunkShips),
  }

  const entitiesWithExplodedByBombs = {
    ...entitiesWithShotByPorts,
    ...bombReducer(entitiesWithShotByPorts),
  }

  const player = playerEntity(entitiesWithExplodedByBombs)
  const entitiesWithHealedPlayer = {
    ...entitiesWithExplodedByBombs,
    ...healReducer({ player, config })
  }

  return {
    ...updatedState,
    entities: entitiesWithHealedPlayer,
  }
}
