const { EGIDS } = require('../../src/const')

module.exports = {
  2: {
    id: 2,
    name: 'Enemy',
    gid: EGIDS.ENEMY,
    x: 1,
    y: 0,
    hp: 20,
    armor: 0,
    damage: 10,
    aggressive: true,
    destX: undefined,
    destY: undefined,
  },
}
