const { position } = require('./world')

const terrainAt = ({ terrain, x, y }) => terrain[position(x, y)]

module.exports = {
  terrainAt
}
