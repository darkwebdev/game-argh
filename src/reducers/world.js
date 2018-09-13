const bombReducer = require('./bomb')
const portReducer = require('./port')
const cleanUpReducer = require('./clean')
const followReducer = require('./follow')
const sailReducer = require('./sail-npc')
const fightReducer = require('./fight-npc')
const healReducer = require('./heal')
const levelUpReducer = require('./level')

const combinedReducers = (obj = {}, cbs = []) =>
  cbs.reduce((res, cb) => ({ ...res, ...cb(res) }), obj)

module.exports = ({ oldState, state, config, sound }) =>
  combinedReducers(
    {
      ...oldState,
      ...state
    },
    [
      s => cleanUpReducer({ state: s, oldState }),
      bombReducer,
      s => followReducer({ state: s, oldState }),
      s => fightReducer({ state: s, sound }),
      sailReducer,
      s => levelUpReducer({ state: s, oldState, config, sound }),
      s => healReducer({ state: s, config }),
      portReducer,
    ],
  )

module.exports.combinedReducers = combinedReducers
