const { filter, map } = require('../helpers')

module.exports = ({ entities, oldEntities }) => {
  const ships = filter(entities, e => e.hp !== undefined)
  const withoutSunkShips = map(ships, e => ({
    ...e,
    visible: !(e.hp <= 0 && oldEntities[e.id].hp <= 0)
  }))

  return {
    ...entities,
    ...withoutSunkShips,
  }
}
