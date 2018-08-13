'use strict'

const { directions } = require('./const')
const { minX, maxX, minY, maxY } = require('./world')

module.exports = {
  locationAt({ x, y }, direction) {// todo: avoid land && ships
    return {
      [directions.NORTH]: { x, y: y > minY ? y - 1 : y },
      [directions.SOUTH]: { x, y: y < maxY ? y + 1: y },
      [directions.EAST]: { x: x < maxX ? x + 1 : x, y },
      [directions.WEST]: { x: x > minX ? x - 1 : x, y }
    }[direction] || { x, y }
  }
}
