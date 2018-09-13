const { DIRECTIONS } = require('./const')

const mapYoffset = 1 //weird Tiled stuff
const minX = 0;
const minY = 0;

const withFixedOffset = entity => ({
  ...entity,
  y: entity.y - mapYoffset
})

module.exports = {
  world({ templates = {}, map = {} }) {
    const { layers = [], width, height, tilewidth, tileheight } = map
    const terrain = layers.find(l => l.name === "Terrain") || {}
    const entities = layers.find(l => l.name === "Entities") || {}

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

    return {
      width,
      height,
      minX,
      minY,
      maxX: minX + width - 1,
      maxY: minY + height - 1,
      terrain: terrain.data,
      entities: entitiesFromObjects(entities.objects),
    }
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
      [DIRECTIONS.WEST]: { x: x - 1, y },
    }[direction]
  },
}
