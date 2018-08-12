'use strict'

const { layers = [], width } = require('./tilemaps')

const chunked = (arr=[], n) =>
  arr.length ? [ arr.slice(0, n) ].concat(chunked(arr.slice(n), n)) : []

module.exports = {
  name: 'Pirates',
  version: '0.1',

  world() {
    const mapData = (layers[0] || {}).data

    return chunked(mapData, width)
  }
}
