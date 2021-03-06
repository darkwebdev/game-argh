const { expect } = require('chai')
const reducer = require('../../src/reducers/fight-npc')

const ally = require('../fixtures/ally')
const allyFought = require('../fixtures/ally-fought')
const enemy = require('../fixtures/enemy')
const enemyFought = require('../fixtures/enemy-fought')
const enemyFoughtPlayer = require('../fixtures/enemy-fought-player')
const enemyAggressive = require('../fixtures/enemy-aggressive')
const enemyAggressiveDead = require('../fixtures/enemy-aggressive-dead')
const player = require('../fixtures/player-weak')
const playerDead = require('../fixtures/player-dead')

const sound = { sounds: {}, play: () => {} }

describe('reducers/fight-npc', () => {
  it('should return empty state given empty state', () => {
    const state = {}
    expect(reducer({ state, sound })).to.deep.equal({})
  })

  it('should return same state given no aggressive entities', () => {
    const state = {
      gameOver: false,
      entities: {
        ...ally,
        ...enemy,
      },
    }
    expect(reducer({ state, sound })).to.deep.equal(state)
  })

  it('should return state with same entities given dead enemies', () => {
    const state = {
      gameOver: false,
      entities: {
        ...ally,
        ...enemyAggressiveDead,
      },
    }
    expect(reducer({ state, sound })).to.deep.equal(state)
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
      victory: false,
      entities: {
        ...allyFought,
        ...enemyFought,
      },
    }
    expect(reducer({ state, sound })).to.deep.equal(expectedState)
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
      victory: false,
      entities: {
        ...playerDead,
        ...enemyFoughtPlayer,
      },
    }
    expect(reducer({ state, sound })).to.deep.equal(expectedState)
  })

})
