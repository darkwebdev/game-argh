// const { layers = [], width } = require('../resources/map.json')
const { layers = [], width, height, tilewidth, tileheight } = require('../resources/map2')
const templates = {
  'template-player.json': require('../resources/template-player'),
  'template-enemy-weak.json': require('../resources/template-enemy-weak'),
}

const { DIRECTIONS } = require('./const')

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
    entities: entitiesFromObjects(entities.objects),
    // entities: entitiesFromLayers(entities.layers),
  },

  coords(pos) {
    const x = (pos % width)
    const y = Math.floor(pos / width)

    return { x, y }
  },

  position(x, y) {
    return y * width + x
  },

  directionCoords({ x, y, direction }) {
    return {
      [DIRECTIONS.NORTH]: { x, y: y - 1 },
      [DIRECTIONS.SOUTH]: { x, y: y + 1 },
      [DIRECTIONS.EAST]: { x: x + 1, y },
      [DIRECTIONS.WEST]: { x: x - 1, y }
    }[direction]
  }
}

function withFixedOffset(entity) {
  return {
    ...entity,
    y: entity.y - mapYoffset
  }
}

function flatten({ id, gid, name, visible, x, y, properties = undefined }) {
  return {
    id, gid, name, visible, x: x / tilewidth, y: y / tileheight,
    ...(properties ? properties : {})
  }
}

function entitiesFromLayers(layers = []) {
  const objects = layers.reduce((arr, layer) => [ ...arr, ...layer.objects ], [])

  return entitiesFromObjects(objects)
}

function entitiesFromObjects(objects = []) {
  return objects.reduce((obj, entity) => ({
    ...obj,
    [entity.id]: withFixedOffset(flatten({
      ...entity,
      ...templates[entity.template].object,
    })),
  }), {})
}
