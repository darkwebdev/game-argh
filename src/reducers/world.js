const bombReducer = require('./bomb')
const portReducer = require('./port')
const sinkReducer = require('./sink')
const followReducer = require('./follow')
const sailReducer = require('./sail-npc')
const fightReducer = require('./fight-npc')
const healReducer = require('./heal')

const combinedReducers = (obj = {}, cbs = []) =>
  cbs.reduce((res, cb) => ({ ...res, ...cb(res) }), obj)

module.exports = ({ oldState, state, config }) =>
  combinedReducers(
    {
      ...oldState,
      ...state
    },
    [
      s => sinkReducer({ state: s, oldState }),
      portReducer,
      bombReducer,
      s => followReducer({ state: s, oldState }),
      fightReducer,
      sailReducer,
      s => healReducer({ state: s, config }),
    ],
  )

module.exports.combinedReducers = combinedReducers
