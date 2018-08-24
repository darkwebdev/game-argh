const subscribers = {}

const subscribe = (event, cb) => {
  subscribers[event] = (subscribers[event] || []).concat([cb])
}

module.exports = {
  events: {
    NEW_GAME: 'new-game',
    END_TURN: 'end-turn',
    NPC_TURN: 'npc-turn',
    WORLD_TURN: 'world-turn',
    START_TURN: 'next-turn',
    KEY_PRESSED: 'key-pressed',
    UPDATE_STATE: 'update-state',
    SET_STATE: 'set-state',
    STATE_CHANGED: 'state-changed',
    ENTITY_SINKING: 'entity-sinking',
    ENTITY_DESTROYED: 'entity-destroyed',
    ANIMATION_START: 'animation-start',
    ANIMATION_END: 'animation-end',
    SAIL: 'sail',
    REPAIR: 'repair',
    UPGRADE: 'upgrade',
    TRADE: 'trade',
    FIGHT: 'fight'
  },

  on(event, cb) {
    subscribe(event, cb);
  },

  off(event, cb) { // todo: simplify design
    subscribers[event] = (subscribers[event] || []).filter(ccb => ccb !== cb)
  },

  emit(event, data) {
    console.log('EMIT', event, data);
    (subscribers[event] || []).forEach(cb => cb(data))
  }
}
