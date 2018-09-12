const { layers = [], width, height, tilewidth, tileheight } = require('../map/map')
const templates = {
  //player
  'tp.json': require('../map/tp'),
  // allied ports
  'tap0.json': require('../map/tap0'),
  'tap1.json': require('../map/tap1'),
  'tap2.json': require('../map/tap2'),
  // enemy ports
  'tep0.json': require('../map/tep0'),
  'tep1.json': require('../map/tep1'),
  'tep2.json': require('../map/tep2'),
  // allies
  'ta0.json': require('../map/ta0'),
  'ta1.json': require('../map/ta1'),
  'ta2.json': require('../map/ta2'),
  //enemies
  'te0.json': require('../map/te0'),
  'te1.json': require('../map/te1'),
  'te2.json': require('../map/te2'),
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

const fromTemplate = ({ gid, name, visible, properties }) => ({ gid, name, visible, properties })

const entitiesFromObjects = (objects = []) =>
  objects.reduce((obj, entity) =>
    ({
      ...obj,
      [entity.id]: withFixedOffset(flatten({
        ...entity,
        ...fromTemplate(templates[entity.template].object),
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

