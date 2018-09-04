const { expect } = require('chai')
const { armorDamage, hpDamage, damageToLevel, percentToLevel, percentOfLevel } = require('../src/game')

describe('game', () => {
  describe('armorDamage()', () => {
    it('should return 0 given armor <= damage', () => {
      expect(armorDamage(10, 20)).to.equal(0)
      expect(armorDamage(10, 10)).to.equal(0)
    })

    it('should return reduced armor given armor > damage', () => {
      expect(armorDamage(20, 10)).to.equal(10)
    })
  })

  describe('hpDamage()', () => {
    it('should return the same hp given armor >= damage', () => {
      expect(hpDamage(10, 20, 20)).to.equal(10)
      expect(hpDamage(10, 30, 20)).to.equal(10)
    })

    it('should return 0 given hp+armor <= damage', () => {
      expect(hpDamage(10, 20, 40)).to.equal(0)
      expect(hpDamage(10, 20, 30)).to.equal(0)
    })

    it('should return reduced hp given armor < damage', () => {
      expect(hpDamage(10, 20, 30)).to.equal(0)
      expect(hpDamage(10, 20, 25)).to.equal(5)
    })
  })

  describe('damageToLevel()', () => {
    it('should calculate damage to level up', () => {
      const damageLevels = [ 10, 23, 40 ]

      expect(damageToLevel(0, damageLevels)).to.equal(10)
      expect(damageToLevel(1, damageLevels)).to.equal(9)
      expect(damageToLevel(15, damageLevels)).to.equal(8)
      expect(damageToLevel(23, damageLevels)).to.equal(17)
    })
  })

  describe('percentOfLevel()', () => {
    it('should calculate damage level percent', () => {
      const damageLevels = [10, 20, 30]

      expect(percentOfLevel(0, damageLevels)).to.equal(0)
      expect(percentOfLevel(1, damageLevels)).to.equal(10)
      expect(percentOfLevel(15, damageLevels)).to.equal(50)
      expect(percentOfLevel(20, damageLevels)).to.equal(0)
    })
  })
})
