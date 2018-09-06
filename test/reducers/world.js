const { expect } = require('chai')
const { EGIDS } = require('../../src/const')
const reducer = require('../../src/reducers/world')

describe('reducers/world', () => {
})

describe('combinedReducers()', () => {
  it('should return empty object given no input', () => {
    expect(reducer.combinedReducers()).to.deep.equal({})
  })

  it('should return the same object given no callbacks', () => {
    expect(reducer.combinedReducers({ a: 1 })).to.deep.equal({ a: 1 })
  })

  it('should return reduced object given a callback', () => {
    expect(reducer.combinedReducers({ a: 1 }, [ o => o ])).to.deep.equal({ a: 1 })
    expect(reducer.combinedReducers({ a: 1 }, [ o => ({ a: o.a + 1 }) ])).to.deep.equal({ a: 2 })
    expect(reducer.combinedReducers({ a: 1 }, [ o => ({ a: o.a + 1 }), o => ({ a: o.a * 2 }) ])).to.deep.equal({ a: 4 })
  })
})
