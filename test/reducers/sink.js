const { expect } = require('chai')
const { EGIDS } = require('../../src/const')
const reducer = require('../../src/reducers/sink')

const player = {
  0: {
    id: 0,
    gid: EGIDS.PLAYER,
    hp: 10,
    maxHp: 20,
    visible: true,
  }
}

const ships = {
  1: {
    id: 1,
    hp: 10,
    visible: true
  },
  2: {
    id: 2,
    hp: 0,
    visible: true,
  }
}

describe('reducers/sink', () => {
  it('should return empty entities object given no entities', () => {
    expect(reducer({})).to.deep.equal({ entities: {} })
  })

  it('should hide sunk ships', () => {
    const shipsWithoutSunk = {
      1: {
        id: 1,
        hp: 10,
        visible: true
      },
      2: {
        id: 2,
        hp: 0,
        visible: false,
      }
    }
    const oldState = {
      gameOver: false,
      entities: {
        ...ships,
      }
    }
    const state = {
      gameOver: false,
      entities: {
        ...ships,
      }
    }
    const expectedState = {
      gameOver: false,
      entities: {
        ...shipsWithoutSunk,
      }
    }

    expect(reducer({ oldState, state })).to.deep.equal(expectedState)
  })

})
