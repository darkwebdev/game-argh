const { expect } = require('chai')
const { map, filter } = require('../src/helpers')

describe('helpers', () => {
  describe('map()', () => {
    it('should return empty object given no input', () => {
      expect(map()).to.deep.equal({})
    })

    it('should return empty object given empty object', () => {
      expect(map({})).to.deep.equal({})
    })

    it('should return the same object given no callback', () => {
      const obj = { a: 1 }

      expect(map(obj)).to.deep.equal(obj)
    })

    it('should return the object with callback applied to each item', () => {
      const obj = { a: 1, b: 2 }
      const cb = item => item + 1
      const expectedObj = { a: 2, b: 3 }

      expect(map(obj, cb)).to.deep.equal(expectedObj)
    })
  })

  describe('filter()', () => {
    it('should return empty object given no input', () => {
      expect(filter()).to.deep.equal({})
    })

    it('should return empty object given empty object', () => {
      expect(filter({})).to.deep.equal({})
    })

    it('should return the same object given no callback', () => {
      const obj = { a: 1 };
      expect(filter(obj)).to.deep.equal(obj)
    })

    it('should filter out false callbacks applied to each item', () => {
      const obj = { a: 1, b: 2 }
      const cb = item => item > 1
      const expectedObj = { b: 2 }

      expect(filter(obj, cb)).to.deep.equal(expectedObj)
    })

    it('should filter out false callbacks applied to each item', () => {
      const obj = { a: 1, b: 2 }
      const cb = (item, key) => key === 'a'
      const expectedObj = { a: 1 }

      expect(filter(obj, cb)).to.deep.equal(expectedObj)
    })
  })
})
