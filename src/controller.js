'use strict'

const { emit, on, events } = require('./events')
const renderView = require('./views')
const hotkeys = require('./hotkeys')
const animations = require('./animations')

const fightReducer = require('./reducers/fight')
const sailReducer = require('./reducers/sail')
const worldReducer = require('./reducers/world')
const startTurnReducer = require('./reducers/start-turn')
const gameOverReducer = require('./reducers/game-over')
const newGameReducer = require('./reducers/new-game')
const entityDestroyedReducer = require('./reducers/entity-destroyed')

let state = {}

module.exports = ({ config, root, world, sound }) => {
  const { sounds, play } = sound
  const rootEl = document.querySelector(root)

  document.addEventListener('keydown', event => {
    emit(events.KEY_PRESSED, event.code)
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

  on(events.NEW_GAME, () => {
    emit(events.SET_STATE, newGameReducer(world))
    emit(events.START_TURN)
  })

  on(events.FIGHT, entityId => {
    play(sounds.cannons)
    emit(events.END_TURN, fightReducer(state)(entityId))
  })

  on(events.ENTITY_DESTROYED, entityId => {
    emit(events.UPDATE_STATE, entityDestroyedReducer(state)(entityId))
  })

  on(events.SAIL, direction => {
    play(sounds.sail)
    emit(events.END_TURN, sailReducer(state)(direction))
  })

  on(events.END_TURN, newState => {
    if (newState.gameOver) {
      console.log('!!!!!!!!! GAME OVER !!!!!!!!')
      play(sounds.gameOver)
      emit(events.UPDATE_STATE, gameOverReducer(newState))
    } else {
      console.log('+++++++++ TURN END +++++++++')

      // emit(events.NPC_TURN, newState)
      emit(events.WORLD_TURN, newState)
    }
  })

  on(events.WORLD_TURN, newState => {
    emit(events.UPDATE_STATE, newState)

    console.log('-------- WORLD TURN -------')
    emit(events.UPDATE_STATE, worldReducer({ state: newState, config }))

    emit(events.START_TURN)
  })

  on(events.START_TURN, () => {
    console.log('+++++++++ TURN START +++++++++')
    emit(events.UPDATE_STATE, startTurnReducer(state))
  })

  on(events.SET_STATE, newState => {
    state = { ...newState }

    emit(events.STATE_CHANGED, state)
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
