const { filterValues } = require('../helpers')
const { roundOutcome } = require('../game')
const { entitiesNearby, areOpposed } = require('../enitity')
const { EGIDS } = require('../const')

module.exports = (startState = {}) => {
  const entities = startState.entities || {}

  const foughtEntity = ({ state, entity }) => {
    const entities = state.entities || {}
    const { id, name, x, y } = entity
    const enemies = entitiesNearby({ entities, x, y, filter: e => areOpposed(e, entity) })

    if (!enemies.length) return state

    const enemy = enemies[0]
    const { hp1, armor1, hp2, armor2 } = roundOutcome(entity, enemy)

    console.log('NPC fights', name, id, x, y, hp1, armor1, entity.damage)
    console.log('Enemy fought', enemy.name, enemy.id, enemy.x, enemy.y, hp2, armor2, enemy.damage)

    return {
      ...state,
      gameOver: state.gameOver || enemy.gid === EGIDS.PLAYER && hp2 <= 0,
      entities: {
        ...entities,
        [entity.id]: {
          ...entity,
          hp: hp1,
          armor: armor1,
          destX: undefined,
          destY: undefined,
        },
        [enemy.id]: {
          ...enemy,
          hp: hp2,
          armor: armor2,
          destX: undefined,
          destY: undefined,
        },
      }
    }
  }

  return filterValues(entities, e => e.hp > 0 && e.aggressive).reduce((reducedState, entity) => ({
    ...reducedState,
    ...foughtEntity({ state: reducedState, entity })
  }), startState)
}
