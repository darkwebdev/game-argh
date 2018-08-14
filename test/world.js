const { expect } = require('chai')
const { directionCoords } = require('../src/world')
const { directions } = require('../src/const')
const x = 0
const y = 0

describe('world', () => {
  describe('directionCoords()', () => {
    it('should return undefined given invalid direction', () => {
      expect(directionCoords({ direction: undefined, x, y })).to.be.undefined
    })

    it('should return coords to the North given directions.NORTH', () => {
      expect(directionCoords({ direction: directions.NORTH, x, y })).to.deep.equal({ x, y: -1 })
    })

    it('should return coords to the South given directions.SOUTH', () => {
      expect(directionCoords({ direction: directions.SOUTH, x, y })).to.deep.equal({ x, y: 1 })
    })

    it('should return coords to the East given directions.EAST', () => {
      expect(directionCoords({ direction: directions.EAST, x, y })).to.deep.equal({ x: 1, y })
    })

    it('should return coords to the West given directions.WEST', () => {
      expect(directionCoords({ direction: directions.WEST, x, y })).to.deep.equal({ x: -1, y })
    })
  })
})
