const { expect } = require('chai')
const { EGIDS } = require('../../src/const')
const reducer = require('../../src/reducers/world')
const config = { hpPerTurn: 1 }
const player = {
  0: {
    id: 0,
    gid: EGIDS.PLAYER,
    hp: 10,
    maxHp: 20,
    visible: true,
  }
}
const deadPlayer = {
  0: {
    id: 0,
    gid: EGIDS.PLAYER,
    hp: 0,
    maxHp: 20,
    visible: false,
  }
}
const healedPlayer = {
  0: {
    id: 0,
    gid: EGIDS.PLAYER,
    hp: 11,
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

describe('reducers/world', () => {
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

  it('should NOT heal a DEAD player', () => {
    const oldState = {
      entities: {
        ...deadPlayer
      }
    }
    const expectedState = {
      entities: {
        ...deadPlayer
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
