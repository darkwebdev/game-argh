'use strict'

const { directions } = require('./const')
const { coords, position } = require('./world')

module.exports = {
  locationAt({ x, y }, direction) {// todo: estimate edges
    return {
      [directions.NORTH]: { x, y: y - 1},
      [directions.SOUTH]: { x, y: y + 1},
      [directions.EAST]: { x: x + 1, y },
      [directions.WEST]: { x: x - 1, y }
    }[direction] || { x, y }
  }
}
