const { expect } = require('chai')
const reducer = require('../../src/reducers/follow')

const playerFollowing = require('../fixtures/player-following')
const ally = require('../fixtures/ally')
const allyFollowing = require('../fixtures/ally-following')
const allyFollowingDead = require('../fixtures/ally-following-dead')
const enemyFar = require('../fixtures/enemy-far')
const enemyAggressive = require('../fixtures/enemy-aggressive')
const enemyAggressiveDead = require('../fixtures/enemy-aggressive-dead')

describe('reducers/follow', () => {
  it('should return empty state given empty state', () => {
    expect(reducer()).to.deep.equal({})
  })

  it('should return same state given no enemies', () => {
    const state = {
      gameOver: false,
      entities: {
        ...ally,
      },
    }
    expect(reducer({ state })).to.deep.equal(state)
  })

  it('should stop following given dead entity', () => {
    const state = {
      gameOver: false,
      entities: {
        ...allyFollowingDead,
      },
    }
    expect(reducer({ state })).to.deep.equal(state)
  })

  it('should work for NPCs only', () => {
    const state = {
      gameOver: false,
      entities: {
        ...playerFollowing,
      },
    }

    const oldState = {
      gameOver: false,
      entities: {
        ...playerFollowing,
        ...enemyAggressive,
      },
    }

    expect(reducer({ state, oldState })).to.deep.equal(state)
  })

  it('should stop following given dead enemy', () => {
    const state = {
      gameOver: false,
      entities: {
        ...allyFollowing,
        ...enemyAggressiveDead,
      },
    }

    const oldState = {
      gameOver: false,
      entities: {
        ...allyFollowing,
        ...enemyAggressive,
      },
    }

    const expectedState = {
      gameOver: false,
      entities: {
        ...ally,
        ...enemyAggressiveDead,
      },
    }

    expect(reducer({ state, oldState })).to.deep.equal(expectedState)
  })

  it('should stop following given enemy is too far', () => {
    const state = {
      gameOver: false,
      entities: {
        ...allyFollowing,
        ...enemyFar,
      },
    }
    const oldState = {
      gameOver: false,
      entities: {
        ...allyFollowing,
        ...enemyFar,
      },
    }
    const expectedState = {
      gameOver: false,
      entities: {
        ...ally,
        ...enemyFar,
      },
    }

    expect(reducer({ state, oldState })).to.deep.equal(expectedState)
  })
})
