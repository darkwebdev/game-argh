const { expect } = require('chai')
const { entities: es } = require('../../src/const')
const reducer = require('../../src/reducers/world')
const config = { hpPerTurn: 1 }
const player = {
  0: {
    id: 0,
    gid: es.gids.PLAYER,
    hp: 10,
    maxHp: 20
  }
}
const healedPlayer = {
  0: {
    id: 0,
    gid: es.gids.PLAYER,
    hp: 11,
    maxHp: 20
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

describe('worldReducer()', () => {
  it('should heal a player', () => {
    const oldState = {
      entities: {
        ...player
      }
    }
    const expectedState = {
      entities: {
        ...healedPlayer
      }
    }

    expect(reducer({ oldState, state: {}, config })).to.deep.equal(expectedState)
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
      entities: {
        ...ships,
      }
    }
    const state = {
      entities: {
        ...player,
        ...ships,
      }
    }
    const expectedState = {
      entities: {
        ...healedPlayer,
        ...shipsWithoutSunk,
      }
    }

    expect(reducer({ oldState, state, config })).to.deep.equal(expectedState)
  })
})
