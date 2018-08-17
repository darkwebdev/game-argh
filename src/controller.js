'use strict'

const { emit, on, events } = require('./events')
const renderView = require('./views')
const hotkeys = require('./hotkeys')
const animations = require('./animations')
const fightReducer = require('./reducers/fight')
const sailReducer = require('./reducers/sail')
const entityDestroyedReducer = require('./reducers/entity-destroyed')
const { playerActions } = require('./game')

let state = {}

module.exports = ({ config, root }) => {
  const rootEl = document.querySelector(root)

  document.addEventListener('keydown', event => {
    emit(events.KEY_PRESSED, event.keyCode)
  })

  on(events.KEY_PRESSED, code => {
    const action = hotkeys[code]

    if (action) {
      action(state.actions)
    }
  })

  on(events.ANIMATION_END, ({ event, entityId }) => {
    const action = animations[event.animationName]

    if (action) {
      action(entityId)
    }
  })

  on(events.FIGHT, entityId => {
    emit(events.END_TURN, fightReducer(state)(entityId))
  })

  on(events.ENTITY_DESTROYED, entityId => {
    emit(events.UPDATE_STATE, entityDestroyedReducer(state)(entityId))
  })

  on(events.SAIL, direction => {
    emit(events.END_TURN, sailReducer(state)(direction))
  })

  on(events.END_TURN, newState => {
    console.log('+++++++++ TURN END +++++++++')

    emit(events.NPC_TURN, newState)
    // emit(events.WORLD_TURN, newState)
  })

  on(events.NPC_TURN, newState => {
    emit(events.UPDATE_STATE, newState)

    console.log('-------- NPC TURN -------')
      // todo: npc random movement
    emit(events.START_TURN)
  })

  on(events.START_TURN, () => {
    console.log('+++++++++ TURN START +++++++++')
    //cleanup
    const newState = {
      actions: playerActions({ state }),
    }
    emit(events.UPDATE_STATE, newState)
  })

  on(events.UPDATE_STATE, newState => {
    state = { ...state, ...newState }

    emit(events.STATE_CHANGED, state)
  })

  on(events.STATE_CHANGED, newState => {
    console.log('========== STATE', newState)
    rootEl.innerHTML = renderView({
      state: newState,
      config
    })
  })
}
