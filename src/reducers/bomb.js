const { EGIDS } = require('../const')
const { toObj, entitiesNearby } = require('../enitity')
const { filterValues } = require('../helpers')
const { hpDamage, armorDamage } = require('../game')

module.exports = state => {
  const entities = state.entities
  const bombs = filterValues(entities, e => e.gid === EGIDS.BOMB && e.visible)
  const explodedEntities = bomb => {
    const { id, x, y, damage } = bomb
    const affectedEntities = entitiesNearby({
      entities, x, y,
      filter: e => e.hp > 0
    }).map(e => ({
      ...e,
      hp: hpDamage(e.hp, e.armor, damage),
      armor: armorDamage(e.armor, damage),
    }))

    return {
      [id]: {
        ...bomb,
        visible: false
      },
      ...toObj(affectedEntities),
    }
  }

  const reducedTimeout = bomb => ({
    [bomb.id]: {
      ...bomb,
      timeout: bomb.timeout - 1
    }
  })

  const reduceBombs = bombs => ({
    ...state,
    entities: {
      ...entities,
      ...bombs.reduce((all, bomb) => ({
        ...all,
        ...(bomb.timeout ? reducedTimeout(bomb) : explodedEntities(bomb)),
      }), {}),
    }
  })

  return bombs.length ? reduceBombs(bombs) : {}
}
