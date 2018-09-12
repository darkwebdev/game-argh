const { expect } = require('chai')
const { entityAt, entitiesNearby } = require('../src/entity')
const x = 0
const y = 0

describe('entity', () => {
  describe('entityAt()', () => {
    it('should return undefined given no entity found', () => {
      expect(entityAt({ entities: {}, x: 0, y: 0 })).to.be.undefined
    })

    it('should return entity@0.0 given entity', () => {
      const entity = { x, y };
      expect(entityAt({ entities: { 0: entity }, x, y })).to.equal(entity)
    })
  })

  describe('entitiesNearby()', () => {
    it('should return empty array given no entities', () => {
      expect(entitiesNearby({ entities: [], x, y })).to.be.empty
    })

    it('should return a close entity and ignore the remote one', () => {
      const entityNearby = { x, y: -1 }
      const entityFarAway = { x, y: 2 }

      expect(entitiesNearby({ entities: [entityNearby, entityFarAway], x, y })).to.deep.equal([entityNearby])
    })
  })
})
