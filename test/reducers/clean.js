const { expect } = require('chai')
const { EGIDS } = require('../../src/const')
const reducer = require('../../src/reducers/clean')

const ships = require('../fixtures/ships')
const shipsAfterCleanup = require('../fixtures/ships-after-cleanup')

describe('reducers/clean', () => {
  it('should return empty entities object given no entities', () => {
    expect(reducer({})).to.deep.equal({ entities: {} })
  })

  it('should hide sunk ships and remove dead emenies', () => {
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
        ...shipsAfterCleanup,
      }
    }

    expect(reducer({ oldState, state })).to.deep.equal(expectedState)
  })

})
