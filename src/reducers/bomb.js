const { entities: eConst } = require('../const')
const { toObj, entitiesNearby } = require('../enitity')
const { filterValues } = require('../helpers')

module.exports = entities => {
  const bombs = filterValues(entities, e => e.gid === eConst.gids.BOMB && e.visible)
  const explodedEntities = bomb => {
    const { id, x, y, damage } = bomb
    const affectedEntities = entitiesNearby({
      entities, x, y,
      filter: e => e.hp > 0
    }).map(e => ({
      ...e,
      hp: e.hp - damage
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

  const reduceBombs = bombs =>
    bombs.reduce((all, bomb) => ({
      ...all,
      ...(bomb.timeout ? reducedTimeout(bomb) : explodedEntities(bomb)),
    }), {})

  return bombs.length ? reduceBombs(bombs) : {}
}
