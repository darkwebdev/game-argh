'use strict'

const { emit, on, events } = require('./events')
const renderView = require('./views')
const { keys, directions, terrains } = require('./const')
const { playerEntity, entityAt } = require('./enitity')
const { terrainAt } = require('./terrain')
const { locationAt, menu, roundOutcome } = require('./game')

const actions = {
  [keys.ARROW_UP]: () => emit(events.SAIL, directions.NORTH),
  [keys.ARROW_DOWN]: () => emit(events.SAIL, directions.SOUTH),
  [keys.ARROW_LEFT]: () => emit(events.SAIL, directions.WEST),
  [keys.ARROW_RIGHT]: () => emit(events.SAIL, directions.EAST)
}
let state = {}

module.exports = ({ config, root }) => {
  const rootEl = document.querySelector(root)

  document.addEventListener('keydown', event => {
    emit(events.KEY_PRESSED, event.keyCode);
  });

  on(events.KEY_PRESSED, code => {
    const action = actions[code];

    if (action) {
      action()
    }
  })

  on(events.FIGHT, entityId => {
    const player = playerEntity(state.entities)
    const enemy = state.entities[entityId]
    const { hp1, armor1, hp2, armor2 } = roundOutcome(player, enemy);

    if (hp1 <= 0) {
      console.log('X ==> Your ship sinked')
      setTimeout(() => {
        emit(events.ENTITY_DESTROYED, player.id)
      }, config.entityRemovalDelayMs)
    }

    if (hp2 <= 0) {
      console.log('X ==> Enemy ship sinked')
      setTimeout(() => {
        emit(events.ENTITY_DESTROYED, enemy.id)
      }, config.entityRemovalDelayMs)
    }

    console.log(hp1, armor1, hp2, armor2)

    const properties1 = {
      ...player.properties,
      hp: hp1,
      armor: armor1
    }

    const properties2 = {
      ...enemy.properties,
      hp: hp2,
      armor: armor2
    }

    const newState = {
      enemyId: enemy.id,
      // todo: update menu?
      entities: {
        ...state.entities,
        [player.id]: {
          ...player,
          properties: properties1
        },
        [enemy.id]: {
          ...enemy,
          properties: properties2
        }
      }
    }

    emit(events.UPDATE_STATE, newState)
  })

  on(events.ENTITY_DESTROYED, entityId => {
    const entity = state.entities[entityId]
    const newState = {
      entities: {
        ...state.entities,
        [entityId]: {
          ...entity,
          visible: false
        }
      }
    }

    emit(events.UPDATE_STATE, newState)
  })

  on(events.SAIL, direction => {
    const entities = state.entities
    const terrain = state.world.terrain
    const player = playerEntity(state.entities)
    const { x, y } = locationAt({ x: player.x, y: player.y }, direction)
    const terrainAtNewLoc = terrainAt({ terrain, x, y })
    const entityAtNewLoc = entityAt({ entities, x, y })

    if (terrainAtNewLoc === terrains.gids.LAND) {
      console.log('Can not travel by land')
      return
    }

    if (entityAtNewLoc) {
      console.log('Location already busy')
      return
    }

    const newState = {
      menu: menu({ state, x, y }),
      entities: {
        ...state.entities,
        [player.id]: {
          ...player,
          x,
          y
        }
      }
    }

    emit(events.UPDATE_STATE, newState)
  })

  on(events.UPDATE_STATE, newState => {
    state = { ...state, ...newState }

    emit(events.STATE_CHANGED, state)
  })

  on(events.STATE_CHANGED, newState => {
    console.log('STATE', newState)
    rootEl.innerHTML = renderView({
      state: newState,
      config
    })
  })
}
