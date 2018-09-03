const { expect } = require('chai')

const { EGIDS } = require('../../src/const')
const Entity = require('../../src/views/entity')

describe('views/Entity', () => {
  it('should render a minimal entity', () => {
    expect(Entity({ props: { gid: 1 } })).to.equal('<e gid=1></e>')
  })

  it('should render a damage level', () => {
    const config = { damageLevels: [ 10, 20, 30 ] }

    expect(Entity({ props: { gid: 1, damage: 0 }, config })).to.equal('<e gid=1 level=0></e>')
    expect(Entity({ props: { gid: 1, damage: 10 }, config })).to.equal('<e gid=1 level=1></e>')
    expect(Entity({ props: { gid: 1, damage: 11 }, config })).to.equal('<e gid=1 level=1></e>')
    expect(Entity({ props: { gid: 1, damage: 20 }, config })).to.equal('<e gid=1 level=2></e>')
  })

  it('should render a bomb timeout', () => {
    expect(Entity({ props: { gid: EGIDS.BOMB, timeout: 2 } })).to.equal('<e gid=10 timeout=3></e>')
  })

  it('should render hp bar', () => {
    expect(Entity({ props: { gid: 1, hp: 20, maxHp: 20 } })).to.equal('<e gid=1><bar class="hp" style="width: 100%"></bar></e>')
    expect(Entity({ props: { gid: 1, hp: 10, maxHp: 20 } })).to.equal('<e gid=1><bar class="hp" style="width: 50%"></bar></e>')
  })

  it('should render armor bar', () => {
    expect(Entity({ props: { gid: 1, armor: 20, maxArmor: 20 } })).to.equal('<e gid=1><bar class="armor" style="width: 100%"></bar></e>')
    expect(Entity({ props: { gid: 1, armor: 10, maxArmor: 20 } })).to.equal('<e gid=1><bar class="armor" style="width: 50%"></bar></e>')
    expect(Entity({ props: { gid: 1, armor: 0, maxArmor: 20 } })).to.equal('<e gid=1><bar class="armor" style="width: 0%"></bar></e>')
  })

  it('should render a sinking entity', () => {
    expect(Entity({ props: { gid: 1, hp: 0 } })).to.equal('<e gid=1 sink><bar class="hp" style="width: 0%"></bar></e>')
  })
})
