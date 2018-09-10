const { EGIDS } = require('../const')
const { toObj, entitiesNearby, isPort, areOpposed } = require('../enitity')
const { filterValues, flatMap } = require('../helpers')
const { hpDamage, armorDamage } = require('../game')

module.exports = state => {
  const entities = state.entities
  const ports = filterValues(entities, isPort)
  const entitiesShotByPorts = flatMap(ports, p => {
    const { x, y, damage } = p
    const filter = e => areOpposed(p, e)
    const portEnemies = entitiesNearby({ entities, x, y, filter })

    portEnemies.length && console.log('PORT', p.name, p.id, 'FIGHTS', portEnemies.map(e => e.name))

    return portEnemies.map(e => ({
      ...e,
      hp: hpDamage(e.hp, e.armor, damage),
      armor: armorDamage(e.armor, damage),
    }))
  })

  return {
    ...state,
    gameOver: state.gameOver || entitiesShotByPorts.some(e => e.gid === EGIDS.PLAYER && e.hp <= 0),
    entities: {
      ...entities,
      ...toObj(entitiesShotByPorts),
    }
  }
}
