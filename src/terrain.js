const { minX, maxX, minY, maxY, position } = require('./world')
const { TGIDS, DIRECTIONS } = require('./const')

const terrainAt = ({ terrain, x, y }) => terrain[position(x, y)]

const isLand = egid => egid === TGIDS.LAND

const locationAt = ({ x, y }, direction) => ({ // do we need edge checks here or outside?
  [DIRECTIONS.NORTH]: { x, y: y > minY ? y - 1 : y },
  [DIRECTIONS.SOUTH]: { x, y: y < maxY ? y + 1: y },
  [DIRECTIONS.EAST]: { x: x < maxX ? x + 1 : x, y },
  [DIRECTIONS.WEST]: { x: x > minX ? x - 1 : x, y }
}[direction] || { x, y })

module.exports = {
  terrainAt,
  locationAt,
  isLand
}
