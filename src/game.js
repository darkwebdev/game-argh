'use strict'

// const { layers = [], width } = require('./tilemaps')
const { layers = [], width } = require('../resources/testmap.json')

const chunked = (arr=[], n) =>
  arr.length ? [ arr.slice(0, n) ].concat(chunked(arr.slice(n), n)) : []

module.exports = {
  world() {
    const terrain = layers.find(l => l.name === "Terrain") || {}
    const entities = layers.find(l => l.name === "Entities") || {}

    return {
      terrain: terrain.data,
      entities: entities.objects
    }
    // const mapData = (layers[0] || {}).data

    // return chunked(mapData, width)
  }
}
