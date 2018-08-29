const { expect } = require('chai')
const { map, filter, filterValues, find, findKey } = require('../src/helpers')

describe('helpers', () => {
  describe('map()', () => {
    it('should return empty object given no input / empty object', () => {
      expect(map()).to.deep.equal({})
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
    it('should return empty object given no input / empty object', () => {
      expect(filter()).to.deep.equal({})
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

  describe('filterValues()', () => {
    it('should return undefined given no input / empty object', () => {
      expect(filterValues()).to.be.empty
      expect(filterValues({})).to.be.empty
    })

    it('should return object values given no callback', () => {
      const obj = { a: 1, b: 2 };
      expect(filterValues(obj)).to.deep.equal([1, 2])
    })

    it('should filter out false callbacks applied to each item', () => {
      const obj = { a: 1, b: 2 }
      const cb = item => item > 1
      const expected = [ 2 ]

      expect(filterValues(obj, cb)).to.deep.equal(expected)
    })

    it('should filter out false callbacks applied to each item', () => {
      const obj = { a: 1, b: 2 }
      const cb = (item, key) => key === 'a'
      const expected = [ 1 ]

      expect(filterValues(obj, cb)).to.deep.equal(expected)
    })
  })

  describe('findKey()', () => {
    it('should return undefined given no input / empty object', () => {
      expect(findKey()).to.be.undefined
      expect(findKey({})).to.be.undefined
    })

    it('should return undefined given no callback', () => {
      const obj = { a: 1 };

      expect(findKey(obj)).to.be.undefined
    })

    it('should return item key given callback', () => {
      const obj = { a: 1, b: 2 };

      expect(findKey(obj, i => i > 1)).to.equal('b')
      expect(findKey(obj, (v, k) => k === 'b')).to.equal('b')
    })
  })

  describe('find()', () => {
    it('should return undefined given no input / empty object', () => {
      expect(find()).to.be.undefined
      expect(find({})).to.be.undefined
    })

    it('should return undefined given no callback', () => {
      const obj = { a: 1 };

      expect(find(obj)).to.be.undefined
    })

    it('should return item key given callback', () => {
      const obj = { a: 1, b: 2 };

      expect(find(obj, i => i > 1)).to.equal(obj.b)
      expect(find(obj, (v, k) => k === 'b')).to.equal(obj.b)
    })
  })
})
