const { expect } = require('chai')
const reducer = require('../../src/reducers/sail-npc')

describe('reducers/sail-npc', () => {
  it('should return empty state object given empty state', () => {
    expect(reducer()).to.deep.equal({ entities: {} })
  })

  it('should not sail without destination', () => {
    const ships = {
      1: {
        id: 1,
        visible: true,
      },
    }

    const state = {
      gameOver: false,
      entities: {
        ...ships,
      },
    }

    expect(reducer(state)).to.deep.equal(state)
  })

  it('should not sail if dead', () => {
    const ships = {
      1: {
        id: 1,
        hp: 0,
        visible: true,
        destX: 0,
        destY: 0,
      },
    }

    const state = {
      gameOver: false,
      entities: {
        ...ships,
      },
    }

    expect(reducer(state)).to.deep.equal(state)
  })

  it('should not sail if location is busy', () => {
    const ships = {
      1: {
        id: 1,
        visible: true,
        destX: 0,
        destY: 0,
      },
      2: {
        id: 2,
        visible: true,
        hp: 10,
        x: 0,
        y: 0,
      }
    }

    const state = {
      gameOver: false,
      entities: ships,
    }

    expect(reducer(state)).to.deep.equal(state)
  })

  it('should sail if location is empty', () => {
    const ships = {
      1: {
        id: 1,
        hp: 10,
        visible: true,
        destX: 0,
        destY: 0,
      },
      2: {
        id: 2,
        visible: true,
        x: 0,
        y: 0,
        hp: 0,
      },
      3: {
        id: 3,
        visible: true,
        x: 1,
        y: 0,
        hp: 10,
      }
    }

    const expectedShips = {
      1: {
        id: 1,
        hp: 10,
        visible: true,
        x: 0,
        y: 0,
        destX: undefined,
        destY: undefined,
      },
      2: {
        id: 2,
        visible: true,
        x: 0,
        y: 0,
        hp: 0,
      },
      3: {
        id: 3,
        visible: true,
        x: 1,
        y: 0,
        hp: 10,
      }
    }

    const state = {
      gameOver: false,
      entities: ships,
    }

    const expectedState = {
      gameOver: false,
      entities: expectedShips,
    }

    expect(reducer(state)).to.deep.equal(expectedState)
  })
})
