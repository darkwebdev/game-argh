const { EGIDS } = require('../const')
const { toObj, isPort } = require('../entity')
const { filterValues } = require('../helpers')

const convertedPort = gid => gid === EGIDS.ENEMY_PORT ? EGIDS.ALLY_PORT : EGIDS.ENEMY_PORT

module.exports = state => {
  const entities = state.entities
  const defeatedPorts = filterValues(entities, e => isPort(e) && e.hp <= 0)
  const convertedPorts = defeatedPorts.map(p => ({
    ...p,
    gid: convertedPort(p.gid),
    hp: p.maxHp,
    armor: p.maxArmor,
  }))

  convertedPorts.length && console.log('PORT CONVERTED', convertedPorts)

  return {
    ...state,
    entities: {
      ...entities,
      ...toObj(convertedPorts),
    }
  }
}
