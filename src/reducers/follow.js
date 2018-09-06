const { filterValues } = require('../helpers')
const { EGIDS } = require('../const')
// todo: stop if in fight

module.exports = ({ state: startState = {}, oldState = {}} = {}) => {
  const entities = startState.entities || {}

  const movedEntity = ({ state, entity }) => {
    const entities = state.entities || {}
    const oldEntities = oldState.entities || {}
    const { id, name, x, y, enemyId } = entity
    const enemyBefore = oldEntities[enemyId]
    const enemy = entities[enemyId]

    const updatedState = updatedEntity => ({
      ...state,
      entities: {
        ...entities,
        [entity.id]: {
          ...entity,
          ...updatedEntity,
        }
      }
    })

    if (enemy.hp <= 0) {
      console.log('Enemy dead, stop following')
      return updatedState({ enemyId: undefined })
    }

    const tooFar = Math.abs(enemyBefore.x - x) > 1 || Math.abs(enemyBefore.y - y) > 1
    if (tooFar) {
      console.log('Enemy escaped, stop following')
      return updatedState({ enemyId: undefined })
    }

    console.log('NPC', name, id, '@', x, y, 'follows', enemy.name, enemy.id, '@', enemyBefore.x, enemyBefore.y)

    return updatedState({
      destX: enemyBefore.x,
      destY: enemyBefore.y,
    })
  }

  return filterValues(entities, e => e.hp > 0 && e.enemyId && e.gid !== EGIDS.PLAYER).reduce((reducedState, entity) => ({
    ...reducedState,
    ...movedEntity({ state: reducedState, entity })
  }), startState)
}
