const { expect } = require('chai')
const reducer = require('../../src/reducers/fight-npc')

const ally = require('../fixtures/ally')
const allyFought = require('../fixtures/ally-fought')
const enemy = require('../fixtures/enemy')
const enemyFought = require('../fixtures/enemy-fought')
const enemyAggressive = require('../fixtures/enemy-aggressive')
const enemyAggressiveDead = require('../fixtures/enemy-aggressive-dead')
const player = require('../fixtures/player-weak')
const playerDead = require('../fixtures/player-dead')

describe('reducers/fight-npc', () => {
  it('should return empty state given empty state', () => {
    expect(reducer()).to.deep.equal({})
  })

  it('should return same state given no aggressive entities', () => {
    const state = {
      gameOver: false,
      entities: {
        ...ally,
        ...enemy,
      },
    }
    expect(reducer(state)).to.deep.equal(state)
  })

  it('should return state with same entities given dead enemies', () => {
    const state = {
      gameOver: false,
      entities: {
        ...ally,
        ...enemyAggressiveDead,
      },
    }
    expect(reducer(state)).to.deep.equal(state)
  })

  it('should return state with fought entities given aggressive entities', () => {
    const state = {
      gameOver: false,
      entities: {
        ...ally,
        ...enemyAggressive,
      },
    }

    const expectedState = {
      gameOver: false,
      entities: {
        ...allyFought,
        ...enemyFought,
      },
    }
    expect(reducer(state)).to.deep.equal(expectedState)
  })

  it('should return gameOver given player die during battle', () => {
    const state = {
      gameOver: false,
      entities: {
        ...player,
        ...enemyAggressive,
      },
    }

    const expectedState = {
      gameOver: true,
      entities: {
        ...playerDead,
        ...enemyFought,
      },
    }
    expect(reducer(state)).to.deep.equal(expectedState)
  })

})
