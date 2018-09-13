const { emit, on, EVENTS } = require('./events')
const MainView = require('./views/main')
const Intro = require('./views/intro')
const hotkeys = require('./hotkeys')
const { STAGES, EGIDS } = require('./const')
const soundController = require('./sound-controller')

// const fightReducer = require('./reducers/fight')
const dropBombReducer = require('./reducers/drop-bomb')
const sailReducer = require('./reducers/sail')
const worldReducer = require('./reducers/world')
const startTurnReducer = require('./reducers/start-turn')
const gameOverReducer = require('./reducers/game-over')
const newGameReducer = require('./reducers/new-game')
const introReducer = require('./reducers/intro')
const repairReducer = require('./reducers/repair')
const upgradeReducer = require('./reducers/upgrade')

let state = {}

module.exports = ({ config, root, world, sound }) => {
  const { sounds, play } = sound
  const rootEl = document.querySelector(root)//app

  document.addEventListener('keydown', hotkeys.keyThrottle(keyCode => {
    emit(EVENTS.KEY_PRESSED, keyCode)
  }, config.throttleKeysMs))

  on(EVENTS.KEY_PRESSED, code => {
    const action = hotkeys[code]

    if (action) {
      action(state.actions)
    }
  })

  on(EVENTS.INTRO, () => {
    emit(EVENTS.SET_STATE, introReducer())
  })

  on(EVENTS.NEW_GAME, () => {
    emit(EVENTS.SET_STATE, newGameReducer(world))
    emit(EVENTS.START_TURN)
  })

  // on(EVENTS.FIGHT, ({ entityId }) => {
  //   play(sounds.cannons)
  //   emit(EVENTS.END_TURN, fightReducer(state)(entityId))
  // })

  on(EVENTS.BOMB, ({ x, y }) => {
    play(sounds.dropBomb)
    emit(EVENTS.END_TURN, dropBombReducer(state)(x, y))
  })

  on(EVENTS.SAIL, direction => {
    // play(sounds.sail)
    emit(EVENTS.END_TURN, sailReducer(state)(direction))
  })

  on(EVENTS.REPAIR, () => {
    play(sounds.repair)
    emit(EVENTS.END_TURN, repairReducer(state))
  })

  on(EVENTS.UPGRADE, ({ portId }) => {
    play(sounds.upgrade)
    emit(EVENTS.END_TURN, upgradeReducer(state)(portId))
  })

  on(EVENTS.END_TURN, (newState = {}) => {
    if (newState.gameOver) {
      // play(sounds.gameOver)
      emit(EVENTS.UPDATE_STATE, gameOverReducer(newState))
    } else {
      console.log('+++++++++ TURN END +++++++++')

      emit(EVENTS.WORLD_TURN, newState)
    }
  })

  on(EVENTS.WORLD_TURN, newState => {

    console.log('-------- WORLD TURN -------')
    emit(EVENTS.UPDATE_STATE, worldReducer({ oldState: state, state: newState, config, sound }))

    emit(EVENTS.START_TURN)
  })

  on(EVENTS.START_TURN, () => {
    console.log('+++++++++ TURN START +++++++++')
    emit(EVENTS.UPDATE_STATE, startTurnReducer(state))
  })

  on(EVENTS.SET_STATE, newState => {
    const oldState = state

    state = { ...newState }

    emit(EVENTS.STATE_CHANGED, { state, oldState })
  })

  on(EVENTS.UPDATE_STATE, newState => {
    const oldState = state

    state = { ...state, ...newState }

    emit(EVENTS.STATE_CHANGED, { state, oldState })
  })

  on(EVENTS.STATE_CHANGED, ({ state: newState, oldState }) => {
    console.log('========== STATE CHANGED from', oldState, 'to', newState)

    const viewFn = {
      [STAGES.INTRO]: Intro,
      [STAGES.WORLD]: MainView,
    }[newState.stage]

    rootEl.innerHTML = viewFn({ state: newState, config })

    soundController({ oldState, state: newState, sound })
  })
}
