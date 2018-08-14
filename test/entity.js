const { expect } = require('chai')
const { entityAt, entityNearby } = require('../src/enitity')
const x = 0
const y = 0

describe('entity', () => {
  describe('entityAt()', () => {
    it('should return undefined given no entity found', () => {
      expect(entityAt({ entities: [], x: 0, y: 0 })).to.be.undefined
    })

    it('should return entity@0.0 given entity', () => {
      const entity = { x, y };
      expect(entityAt({ entities: [entity], x, y })).to.equal(entity)
    })
  })

  describe('entityNearby()', () => {
    it('should return undefined given no entities', () => {
      expect(entityNearby({ entities: [], x, y })).to.be.undefined
    })

    it('should return an entity given entity to the North', () => {
      const entity = { x, y: -1 }

      expect(entityNearby({ entities: [entity], x, y })).to.equal(entity)
    })
  })
})
