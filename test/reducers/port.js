const { expect } = require('chai')
const { EGIDS } = require('../../src/const')
const reducer = require('../../src/reducers/port')

describe('reducers/port', () => {
  it('should return empty object given no enemies', () => {
    expect(reducer({})).to.deep.equal({ entities: {} })
  })

  it('should shoot at enemy ships', () => {
    const state = {
      gameOver: false,
      entities: {
        0: {
          id: 0,
          gid: EGIDS.ALLY_PORT,
          x: 0, y: 0,
          damage: 10,
        },
        1: {
          id: 1,
          gid: EGIDS.ENEMY,
          x: 1, y: 0,
          hp: 20,
          armor: 20,
          visible: true,
        },
        2: {
          id: 2,
          gid: EGIDS.ENEMY,
          x: 0, y: 1,
          hp: 10,
          armor: 0,
          visible: true,
        },
      },
    }
    const expectedState = {
      gameOver: false,
      entities: {
        0: {
          id: 0,
          gid: EGIDS.ALLY_PORT,
          x: 0, y: 0,
          damage: 10,
        },
        1: {
          id: 1,
          gid: EGIDS.ENEMY,
          x: 1, y: 0,
          hp: 20,
          armor: 10,
          visible: true,
        },
        2: {
          id: 2,
          gid: EGIDS.ENEMY,
          x: 0, y: 1,
          hp: 0,
          armor: 0,
          visible: true,
        },
      },
    }

    expect(reducer(state)).to.deep.equal(expectedState)
  })

  it('should ignore remote ships', () => {
    const state = {
      gameOver: false,
      entities: {
        0: {
          id: 0,
          gid: EGIDS.ALLY_PORT,
          x: 0, y: 0,
          damage: 10,
        },
        1: {
          id: 1,
          gid: EGIDS.ENEMY,
          x: 2, y: 0,
          hp: 20,
          visible: true,
        },
      },
    }

    expect(reducer(state)).to.deep.equal(state)
  })

  it('should ignore ally ships', () => {
    const state = {
      gameOver: false,
      entities: {
        0: {
          id: 0,
          gid: EGIDS.ALLY_PORT,
          x: 0, y: 0,
          damage: 10,
        },
        1: {
          id: 1,
          gid: EGIDS.ALLY,
          x: 1, y: 0,
          hp: 20,
          visible: true,
        },
        1: {
          id: 2,
          gid: EGIDS.PLAYER,
          x: 0, y: 1,
          hp: 20,
          visible: true,
        },
      },
    }

    expect(reducer(state)).to.deep.equal(state)
  })

  describe('enemy port', () => {
    it('should shoot at ally ships', () => {
      const state = {
        gameOver: false,
        entities: {
          0: {
            id: 0,
            gid: EGIDS.ENEMY_PORT,
            x: 0, y: 0,
            damage: 10,
          },
          1: {
            id: 1,
            gid: EGIDS.ALLY,
            x: 1, y: 0,
            hp: 20,
            armor: 20,
            visible: true,
          },
          2: {
            id: 2,
            gid: EGIDS.PLAYER,
            x: 0, y: 1,
            hp: 10,
            armor: 0,
            visible: true,
          },
        },
      }

      const expectedState = {
        gameOver: false,
        entities: {
          0: {
            id: 0,
            gid: EGIDS.ENEMY_PORT,
            x: 0, y: 0,
            damage: 10,
          },
          1: {
            id: 1,
            gid: EGIDS.ALLY,
            x: 1, y: 0,
            hp: 20,
            armor: 10,
            visible: true,
          },
          2: {
            id: 2,
            gid: EGIDS.PLAYER,
            x: 0, y: 1,
            hp: 0,
            armor: 0,
            visible: true,
          },
        },
      }

      expect(reducer(state)).to.deep.equal(expectedState)
    })
  })
})
