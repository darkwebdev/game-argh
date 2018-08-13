'use strict';

const { entities: eConsts } = require('./const')

module.exports = {
  player(entities) {
    return find(entities, e => e.gid === eConsts.gids.PLAYER)
  },

  asObject(entities) {
    return entities.reduce((obj, entity) => ({ ...obj, [entity.gid]: entity }), {})
  },

  entityAt(entities, x, y) {
    return find(entities, e => e.x === x & e.y === y)
  }
};

function map(obj, cb) {
  return Object.keys(obj).map(key => cb(obj[key])).reduce((acc, item) => ({ ...acc, item }))
}

function find(obj, cb) {
  return obj[Object.keys(obj).find(key => cb(obj[key]))]
}
