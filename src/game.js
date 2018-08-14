'use strict'

const { directions } = require('./const')
const { minX, maxX, minY, maxY } = require('./world')
const { events } = require('./events')
const { enemyNearby, allyNearby, portNearby } = require('./enitity')

module.exports = {
  locationAt({ x, y }, direction) {
    return {// do we need edge checks here or outside?
      [directions.NORTH]: { x, y: y > minY ? y - 1 : y },
      [directions.SOUTH]: { x, y: y < maxY ? y + 1: y },
      [directions.EAST]: { x: x < maxX ? x + 1 : x, y },
      [directions.WEST]: { x: x > minX ? x - 1 : x, y }
    }[direction] || { x, y }
  },

  menu({ state, x, y }) {
    const entities = state.entities

    return [
      ...tradeEvent({ entities, x, y }),
      ...fightEvent({ entities, x, y }),
      ...shopEvent({ entities, x, y })
    ]
  }
}

function tradeEvent({ entities, x, y }) {
  const ally = allyNearby({ entities, x, y });

  return ally ? [ { event: events.TRADE, entityId: ally.id } ] : [];
}

function fightEvent({ entities, x, y }) {
  const enemy = enemyNearby({ entities, x, y });

  return enemy ? [ { event: events.FIGHT, entityId: enemy.id } ] : [];
}

function shopEvent({ entities, x, y }) {
  const port = portNearby({ entities, x, y });

  return port ? [ { event: events.SHOP, entityId: port.id } ] : [];
}
