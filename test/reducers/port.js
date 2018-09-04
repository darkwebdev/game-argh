const { expect } = require('chai')
const { EGIDS } = require('../../src/const')
const reducer = require('../../src/reducers/port')

describe('reducers/port', () => {
  it('should return empty object given no enemies', () => {
    expect(reducer({})).to.deep.equal({})
  })

  it('should shoot at enemy ships', () => {
    const entities = {
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
    }
    const expectedEntities = {
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
    }

    expect(reducer(entities)).to.deep.equal(expectedEntities)
  })

  it('should ignore remote ships', () => {
    const entities = {
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
    }
    const expectedEntities = {}

    expect(reducer(entities)).to.deep.equal(expectedEntities)
  })

  it('should ignore ally ships', () => {
    const entities = {
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
    }
    const expectedEntities = {}

    expect(reducer(entities)).to.deep.equal(expectedEntities)
  })

  describe('enemy port', () => {
    it('should shoot at ally ships', () => {
      const entities = {
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
      }
      const expectedEntities = {
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
      }

      expect(reducer(entities)).to.deep.equal(expectedEntities)
    })
  })
})
