const { layers = [], width, height, tilewidth, tileheight } = require('../map/map')
const templates = {
  //player
  'tp.json': require('../build/map/tp.js'),
  //boss
  'tb.json': require('../build/map/tb.js'),
  // allied ports
  'tap0.json': require('../build/map/tap0.js'),
  'tap1.json': require('../build/map/tap1.js'),
  'tap2.json': require('../build/map/tap2.js'),
  // enemy ports
  'tep0.json': require('../build/map/tep0.js'),
  'tep1.json': require('../build/map/tep1.js'),
  'tep2.json': require('../build/map/tep2.js'),
  // allies
  'ta0.json': require('../build/map/ta0.js'),
  'ta1.json': require('../build/map/ta1.js'),
  'ta2.json': require('../build/map/ta2.js'),
  //enemies
  'te0.json': require('../build/map/te0.js'),
  'te1.json': require('../build/map/te1.js'),
  'te2.json': require('../build/map/te2.js'),
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

const fromTemplate = ({ template, x, y, ...props }) => ({
  ...props, x: x / tilewidth, y: y / tileheight,
})

const entitiesFromObjects = (objects = []) =>
  objects.reduce((obj, entity) =>
    ({
      ...obj,
      [entity.id]: withFixedOffset(fromTemplate({
        ...entity,
        ...templates[entity.template],
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

