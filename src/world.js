// const { layers = [], width } = require('../resources/map.json')
const { layers = [], width, height, tilewidth, tileheight } = require('../resources/map2')
const templates = {
  'template-player.json': require('../resources/template-player'),
  'template-port-0.json': require('../resources/template-port-0'),
  'template-port-1.json': require('../resources/template-port-1'),
  'template-enemy-0.json': require('../resources/template-enemy-0'),
  'template-enemy-1.json': require('../resources/template-enemy-1'),
  'template-enemy-2.json': require('../resources/template-enemy-2'),
}

const { DIRECTIONS } = require('./const')

const mapYoffset = 1 //weird Tiled stuff
const minX = 0;
const minY = 0;
const terrain = layers.find(l => l.name === "Terrain") || {}
const entities = layers.find(l => l.name === "Entities") || {}


const withFixedOffset = entity => ({
  ...entity,
  y: entity.y - mapYoffset
})

const flatten = ({ id, gid, name, visible, x, y, properties = undefined }) => ({
  id, gid, name, visible, x: x / tilewidth, y: y / tileheight,
  ...(properties ? properties : {})
})

const entitiesFromLayers = (layers = []) => {
  const objects = layers.reduce((arr, layer) => [ ...arr, ...layer.objects ], [])

  return entitiesFromObjects(objects)
}

const entitiesFromObjects = (objects = []) =>
  objects.reduce((obj, entity) => ({
    ...obj,
    [entity.id]: withFixedOffset(flatten({
      ...entity,
      ...templates[entity.template].object,
    })),
  }), {})

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

