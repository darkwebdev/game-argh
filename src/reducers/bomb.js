const { EGIDS } = require('../const')
const { toObj, entitiesNearby, isBoss, isPlayer } = require('../entity')
const { filterValues, find } = require('../helpers')
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

  const reducedBombs = bombs => {
    const affectedEntities = bombs.reduce((all, bomb) => ({
      ...all,
      ...(bomb.timeout ? reducedTimeout(bomb) : explodedEntities(bomb)),
    }), {})

    const isPlayerBlown = !!find(affectedEntities, e => isPlayer(e) && e.hp <= 0)
    const isBossBlown = !!find(affectedEntities, e => isBoss(e) && e.hp <= 0)

    return ({
      ...state,
      gameOver: state.gameOver || isPlayerBlown,
      victory: state.victory || isBossBlown,
      entities: {
        ...entities,
        ...affectedEntities,
      },
    })
  }

  return bombs.length ? reducedBombs(bombs) : {}
}
