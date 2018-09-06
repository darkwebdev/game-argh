const bombReducer = require('./bomb')
const portReducer = require('./port')
const sinkReducer = require('./sink')
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
      fightReducer,
      sailReducer,
      s => healReducer({ state: s, config }),
    ],
  )

module.exports.combinedReducers = combinedReducers
