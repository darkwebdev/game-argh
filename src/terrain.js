const { position } = require('./world')

module.exports = {
  terrainAt
}

function terrainAt({ terrain, x, y }) {
  return terrain[position(x, y)];
}
