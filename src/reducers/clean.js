const { filter, map } = require('../helpers')

module.exports = ({ state = {}, oldState = {} }) => {
  const entities = state.entities || {}
  const oldEntities = oldState.entities || {}
  const ships = filter(entities, e => e.hp !== undefined)

  const withoutSunkShipsAndDeadEnemies = map(ships, e => {
    const enemy = ships[e.enemyId] || {}

    return {
      ...e,
      visible: !(e.hp <= 0 && oldEntities[e.id].hp <= 0),
      enemyId: enemy.hp > 0 ? enemy.id : undefined,
    }
  })

  return {
    ...state,
    entities: {
      ...entities,
      ...withoutSunkShipsAndDeadEnemies,
    }
  }
}
