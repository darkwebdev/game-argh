const { expect } = require('chai')
const { EGIDS } = require('../../src/const')
const reducer = require('../../src/reducers/bomb')

describe('reducers/bomb', () => {
  it('should return empty object given no bombs', () => {
    expect(reducer({})).to.deep.equal({})
  })

  it('should decrease all bombs timeouts', () => {
    const state = {
      gameOver: false,
      entities: {
        0: {
          id: 0,
          gid: EGIDS.BOMB,
          timeout: 3,
          visible: true,
        },
        1: {
          id: 1,
          gid: EGIDS.BOMB,
          timeout: 1,
          visible: true,
        },
      },
    }
    const expectedState = {
      gameOver: false,
      victory: false,
      entities: {
        0: {
          id: 0,
          gid: EGIDS.BOMB,
          timeout: 2,
          visible: true,
        },
        1: {
          id: 1,
          gid: EGIDS.BOMB,
          timeout: 0,
          visible: true,
        },
      },
    }

    expect(reducer(state)).to.deep.equal(expectedState)
  })

  it('should blow up with ships given 0-timeouts', () => {
    const state = {
      gameOver: false,
      entities: {
        0: {
          id: 0,
          gid: EGIDS.BOMB,
          timeout: 0,
          x: 0, y: 0,
          damage: 10,
          visible: true,
        },
        1: {
          id: 1,
          x: 1, y: 0,
          hp: 20,
          armor: 20,
          visible: true,
        },
        2: {
          id: 2,
          x: 0, y: 1,
          hp: 10,
          armor: 0,
          visible: true,
        },
      },
    }
    const expectedState = {
      gameOver: false,
      victory: false,
      entities: {
        0: {
          id: 0,
          gid: EGIDS.BOMB,
          timeout: 0,
          x: 0, y: 0,
          damage: 10,
          visible: false,
        },
        1: {
          id: 1,
          x: 1, y: 0,
          hp: 20,
          armor: 10,
          visible: true,
        },
        2: {
          id: 2,
          x: 0, y: 1,
          hp: 0,
          armor: 0,
          visible: true,
        },
      },
    }

    expect(reducer(state)).to.deep.equal(expectedState)
  })

  it('should ignore remote ships given 0-timeouts', () => {
    const state = {
      gameOver: false,
      entities: {
        0: {
          id: 0,
          gid: EGIDS.BOMB,
          timeout: 0,
          x: 0, y: 0,
          damage: 10,
          visible: true,
        },
        1: {
          id: 1,
          x: 2, y: 0,
          hp: 20,
          visible: true,
        },
      },
    }

    const expectedState = {
      gameOver: false,
      victory: false,
      entities: {
        0: {
          id: 0,
          gid: EGIDS.BOMB,
          timeout: 0,
          x: 0, y: 0,
          damage: 10,
          visible: false,
        },
        1: {
          id: 1,
          x: 2, y: 0,
          hp: 20,
          visible: true,
        },
      },
    }

    expect(reducer(state)).to.deep.equal(expectedState)
  })
})
