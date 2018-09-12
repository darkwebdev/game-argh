const { EGIDS } = require('../const')
const { newId } = require('../entity')

module.exports = state => (x, y) => {
  const bombId = newId(state.entities)

  return {
    entities: {
      ...state.entities,
      [bombId]: {
        id: bombId,
        gid: EGIDS.BOMB,
        name: 'Time bomb',
        visible: true,
        x,
        y,
        timeout: 3,
        damage: 150,
      }
    }
  }
}
