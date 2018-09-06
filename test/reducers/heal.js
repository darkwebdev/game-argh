const { expect } = require('chai')
const { EGIDS } = require('../../src/const')
const reducer = require('../../src/reducers/heal')

const config = { hpPerTurn: 1 }
const woundedPlayer = {
  0: {
    id: 0,
    gid: EGIDS.PLAYER,
    hp: 10,
    maxHp: 20,
    visible: true,
  },
}
const deadPlayer = {
  0: {
    id: 0,
    gid: EGIDS.PLAYER,
    hp: 0,
    maxHp: 20,
    visible: false,
  },
}
const healedPlayer = {
  0: {
    id: 0,
    gid: EGIDS.PLAYER,
    hp: 11,
    maxHp: 20,
    visible: true,
  },
}

describe('reducers/heal', () => {
  it('should return empty entities object given no entities', () => {
    expect(reducer({ state: {} })).to.deep.equal({})
  })

  it('should return empty entities object given no config', () => {
    expect(reducer({ state: {} })).to.deep.equal({})
  })

  it('should heal wounded player', () => {
    const state = {
      gameOver: false,
      entities: {
        ...woundedPlayer,
      },
    }
    const expectedState = {
      gameOver: false,
      entities: {
        ...healedPlayer,
      },
    }

    expect(reducer({ state, config })).to.deep.equal(expectedState)
  })

  it('should not heal dead player', () => {
    const state = {
      gameOver: false,
      entities: {
        ...deadPlayer,
      },
    }
    const expectedState = {
      gameOver: false,
      entities: {
        ...deadPlayer,
      },
    }

    expect(reducer({ state, config })).to.deep.equal(expectedState)
  })

})
