const { emit, on, events } = require('./events')
const MainView = require('./views/main')
const Intro = require('./views/intro')
const hotkeys = require('./hotkeys')
// const animations = require('./animations')
const { stages } = require('./const')
const soundController = require('./sound-controller')

const fightReducer = require('./reducers/fight')
const dropBombReducer = require('./reducers/drop-bomb')
const sailReducer = require('./reducers/sail')
const worldReducer = require('./reducers/world')
const startTurnReducer = require('./reducers/start-turn')
const gameOverReducer = require('./reducers/game-over')
const newGameReducer = require('./reducers/new-game')
const introReducer = require('./reducers/intro')
const entityDestroyedReducer = require('./reducers/entity-destroyed')
const repairReducer = require('./reducers/repair')
const upgradeReducer = require('./reducers/upgrade')

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

  // on(events.ANIMATION_END, ({ event, entityId }) => {
  //   const action = animations[event.animationName]
  //
  //   if (action) {
  //     action(entityId)
  //   }
  // })

  on(events.INTRO, () => {
    emit(events.SET_STATE, introReducer())
  })

  on(events.NEW_GAME, () => {
    emit(events.SET_STATE, newGameReducer(world))
    emit(events.START_TURN)
  })

  on(events.FIGHT, ({ entityId }) => {
    play(sounds.cannons)
    emit(events.END_TURN, fightReducer(state)(entityId))
  })

  on(events.BOMB, ({ x, y }) => {
    play(sounds.dropBomb)
    emit(events.END_TURN, dropBombReducer(state)(x, y))
  })

  on(events.ENTITY_DESTROYED, ({ entityId }) => {
    emit(events.UPDATE_STATE, entityDestroyedReducer(state)(entityId))
  })

  on(events.SAIL, direction => {
    play(sounds.sail)
    emit(events.END_TURN, sailReducer(state)(direction))
  })

  on(events.REPAIR, () => {
    play(sounds.repair)
    emit(events.END_TURN, repairReducer(state))
  })

  on(events.UPGRADE, ({ portId }) => {
    play(sounds.upgrade)
    emit(events.END_TURN, upgradeReducer(state)(portId))
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
    // emit(events.UPDATE_STATE, newState)

    console.log('-------- WORLD TURN -------')
    emit(events.UPDATE_STATE, worldReducer({ oldState: state, state: newState, config }))

    emit(events.START_TURN)
  })

  on(events.START_TURN, () => {
    console.log('+++++++++ TURN START +++++++++')
    emit(events.UPDATE_STATE, startTurnReducer(state))
  })

  on(events.SET_STATE, newState => {
    const oldState = state

    state = { ...newState }

    emit(events.STATE_CHANGED, { state, oldState })
  })

  on(events.UPDATE_STATE, newState => {
    const oldState = state

    state = { ...state, ...newState }

    emit(events.STATE_CHANGED, { state, oldState })
  })

  on(events.STATE_CHANGED, ({ state: newState, oldState }) => {
    console.log('========== STATE CHANGED from', oldState, 'to', newState)

    const viewFn = {
      [stages.INTRO]: Intro,
      [stages.WORLD]: MainView,
    }[newState.stage]

    rootEl.innerHTML = viewFn({ state: newState, config })

    soundController({ oldState, state: newState, sound })
  })
}
