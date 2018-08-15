const { expect } = require('chai')
const { armorDamage, hpDamage } = require('../src/game')

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
})
