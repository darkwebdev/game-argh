const { filterValues } = require('../helpers')
const { roundOutcome } = require('../game')
const { entitiesNearby, areOpposed } = require('../enitity')
const { EGIDS } = require('../const')

module.exports = (startState = {}) => {
  const entities = startState.entities || {}

  const foughtEntity = ({ state, entity }) => {
    const entities = state.entities || {}
    const { id, name, x, y } = entity
    // todo: skip already fought aggressive enemies
    const enemies = entitiesNearby({ entities, x, y, filter: e => areOpposed(e, entity) })

    if (!enemies.length) return state

    const enemy = enemies[0]
    const { hp1, armor1, damage1, hp2, armor2, damage2 } = roundOutcome(entity, enemy)

    console.log('FIGHT', name, id, '@', x, y, '/', hp1, armor1, entity.damage, 'vs',
      enemy.name, enemy.id, '@', enemy.x, enemy.y, '/', hp2, armor2, enemy.damage)

    return {
      ...state,
      gameOver: state.gameOver || enemy.gid === EGIDS.PLAYER && hp2 <= 0,
      entities: {
        ...entities,
        [entity.id]: {
          ...entity,
          hp: hp1,
          armor: armor1,
          damage: damage1,
          destX: undefined,
          destY: undefined,
          enemyId: enemy.hp > 0 ? enemy.id : undefined,
        },
        [enemy.id]: {
          ...enemy,
          hp: hp2,
          armor: armor2,
          damage: damage2,
          destX: undefined,
          destY: undefined,
          enemyId: entity.hp > 0 ? entity.id : undefined,
        },
      }
    }
  }

  return filterValues(entities, e => e.hp > 0 && e.aggressive).reduce((reducedState, entity) => ({
    ...reducedState,
    ...foughtEntity({ state: reducedState, entity })
  }), startState)
}
