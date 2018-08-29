const { expect } = require('chai')
const { entities: es } = require('../../src/const')
const reducer = require('../../src/reducers/bomb')
describe('bombReducer()', () => {
  it('should return empty object given no bombs', () => {
    expect(reducer({})).to.deep.equal({})
  })

  it('should decrease all bombs timeouts', () => {
    const entities = {
      0: {
        id: 0,
        gid: es.gids.BOMB,
        timeout: 3,
      },
      1: {
        id: 1,
        gid: es.gids.BOMB,
        timeout: 1,
      },
    }
    const expectedEntities = {
      0: {
        id: 0,
        gid: es.gids.BOMB,
        timeout: 2,
      },
      1: {
        id: 1,
        gid: es.gids.BOMB,
        timeout: 0,
      },
    }

    expect(reducer(entities)).to.deep.equal(expectedEntities)
  })

  it('should blow up with ships given 0-timeouts', () => {
    const entities = {
      0: {
        id: 0,
        gid: es.gids.BOMB,
        timeout: 0,
        x: 0, y: 0,
        damage: 10,
        visible: true,
      },
      1: {
        id: 1,
        x: 1, y: 0,
        hp: 20,
        visible: true,
      },
      2: {
        id: 2,
        x: 0, y: 1,
        hp: 10,
        visible: true,
      },
    }
    const expectedEntities = {
      0: {
        id: 0,
        gid: es.gids.BOMB,
        timeout: 0,
        x: 0, y: 0,
        damage: 10,
        visible: false,
      },
      1: {
        id: 1,
        x: 1, y: 0,
        hp: 10,
        visible: true,
      },
      2: {
        id: 2,
        x: 0, y: 1,
        hp: 0,
        visible: true,
      },
    }

    expect(reducer(entities)).to.deep.equal(expectedEntities)
  })

  it('should ignore remote ships given 0-timeouts', () => {
    const entities = {
      0: {
        id: 0,
        gid: es.gids.BOMB,
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
    }
    const expectedEntities = {
      0: {
        id: 0,
        gid: es.gids.BOMB,
        timeout: 0,
        x: 0, y: 0,
        damage: 10,
        visible: false,
      },
    }

    expect(reducer(entities)).to.deep.equal(expectedEntities)
  })
})
