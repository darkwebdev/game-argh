const subscribers = {}

const subscribe = (event, cb) => {
  subscribers[event] = (subscribers[event] || []).concat([cb])
}

module.exports = {
  EVENTS: {
    INTRO: 'intro',
    NEW_GAME: 'new-game',
    END_TURN: 'end-turn',
    WORLD_TURN: 'world-turn',
    START_TURN: 'next-turn',
    KEY_PRESSED: 'key-pressed',
    UPDATE_STATE: 'update-state',
    SET_STATE: 'set-state',
    STATE_CHANGED: 'state-changed',
    SAIL: 'sail',
    REPAIR: 'repair',
    UPGRADE: 'upgrade',
    BOMB: 'bomb',
  },

  on(event, cb) {
    subscribe(event, cb);
  },

  emit(event, data) {
    console.log('EMIT', event, data);
    (subscribers[event] || []).forEach(cb => cb(data))
  }
}
