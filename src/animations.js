const { animations } = require('./const')
const { events } = require('./events')

module.exports = {
  [animations.SINK]: entityId => emit(events.ENTITY_DESTROYED, entityId)
}
