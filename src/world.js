'use strict'

const { layers = [], width } = require('../resources/testmap.json')

const mapYoffset = 1 //weird Tiled stuff
const minX = 0;
const minY = 0;
const terrain = layers.find(l => l.name === "Terrain") || {}
const entities = layers.find(l => l.name === "Entities") || {}

module.exports = {
  minX,
  minY,
  maxX: minX + width - 1,
  maxY: minY + width - 1,

  world: {
    width,
    terrain: terrain.data,
    entities: entitiesObject(entities.objects)
  },

  coords(pos) {
    const x = (pos % width)
    const y = Math.floor(pos / width)

    return { x, y }
  },

  position(x, y) {
    return y * width + x
  }
}

function withFixedOffset(entity) {
  return { ...entity, y: entity.y - mapYoffset }
}

function entitiesObject(entities) {
  return entities.reduce((obj, entity) => ({ ...obj, [entity.gid]: withFixedOffset(entity) }), {})
}
