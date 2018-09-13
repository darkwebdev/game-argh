const { filterValues } = require('../helpers')
const { roundOutcome } = require('../game')
const { entitiesNearby, areOpposed, isPlayer, isBoss } = require('../entity')

module.exports = ({ state: startState = {}, sound } = {}) => {
  const entities = startState.entities || {}
  const { sounds, play } = sound

  const foughtEntity = ({ state, entity }) => {
    const entities = state.entities || {}
    const { id, name, x, y } = entity
    // todo: skip already fought aggressive enemies
    const enemies = entitiesNearby({ entities, x, y, filter: e => areOpposed(e, entity) })

    if (!enemies.length) return state

    const enemy = enemies[0]
    const { hp1, armor1, damage1, hp2, armor2, damage2 } = roundOutcome(entity, enemy)

    play(sounds.cannons)
    console.log('FIGHT', name, id, '@', x, y, '/', hp1, armor1, entity.damage, 'vs',
      enemy.name, enemy.id, '@', enemy.x, enemy.y, '/', hp2, armor2, enemy.damage)

    const enemyId = e => e.hp > 0 ? e.id : undefined

    return {
      ...state,
      gameOver: state.gameOver || isPlayer(enemy) && hp2 <= 0,
      victory: state.victory || (isBoss(entity) && hp1 <= 0) || (isBoss(enemy) && hp2 <= 0),
      entities: {
        ...entities,
        [entity.id]: {
          ...entity,
          hp: hp1,
          armor: armor1,
          damage: damage1,
          destX: undefined,
          destY: undefined,
          enemyId: enemyId(enemy),
        },
        [enemy.id]: {
          ...enemy,
          hp: hp2,
          armor: armor2,
          damage: damage2,
          destX: undefined,
          destY: undefined,
          enemyId: enemyId(entity),
        },
      }
    }
  }

  return filterValues(entities, e => e.hp > 0 && e.aggressive).reduce((reducedState, entity) => ({
    ...reducedState,
    ...foughtEntity({ state: reducedState, entity })
  }), startState)
}
