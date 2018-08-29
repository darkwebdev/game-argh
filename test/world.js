const { expect } = require('chai')
const { directionCoords } = require('../src/world')
const { DIRECTIONS } = require('../src/const')
const x = 0
const y = 0

describe('world', () => {
  describe('directionCoords()', () => {
    it('should return undefined given invalid direction', () => {
      expect(directionCoords({ direction: undefined, x, y })).to.be.undefined
    })

    it('should return coords to the North given NORTH', () => {
      expect(directionCoords({ direction: DIRECTIONS.NORTH, x, y })).to.deep.equal({ x, y: -1 })
    })

    it('should return coords to the South given SOUTH', () => {
      expect(directionCoords({ direction: DIRECTIONS.SOUTH, x, y })).to.deep.equal({ x, y: 1 })
    })

    it('should return coords to the East given EAST', () => {
      expect(directionCoords({ direction: DIRECTIONS.EAST, x, y })).to.deep.equal({ x: 1, y })
    })

    it('should return coords to the West given WEST', () => {
      expect(directionCoords({ direction: DIRECTIONS.WEST, x, y })).to.deep.equal({ x: -1, y })
    })
  })
})
