'use strict'

const { layers = [], width } = require('../resources/testmap.json')

const mapYoffset = 1 //weird Tiled stuff
const terrain = layers.find(l => l.name === "Terrain") || {}
const entities = layers.find(l => l.name === "Entities") || {}

module.exports = {
  world: {
    width,
    terrain: terrain.data,
    entities: entities.objects
  },

  coords(pos) {
    const x = (pos % width)
    const y = Math.floor(pos / width) + mapYoffset

    return { x, y }
  },

  position(x, y) {
    return (y - mapYoffset) * width + x
  }
}
