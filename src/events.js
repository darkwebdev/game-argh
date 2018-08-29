const subscribers = {}

const subscribe = (event, cb) => {
  subscribers[event] = (subscribers[event] || []).concat([cb])
}

module.exports = {
  EVENTS: {
    INTRO: 'intro',
    NEW_GAME: 'new-game',
    END_TURN: 'end-turn',
    NPC_TURN: 'npc-turn',//not implemented
    WORLD_TURN: 'world-turn',
    START_TURN: 'next-turn',
    KEY_PRESSED: 'key-pressed',
    UPDATE_STATE: 'update-state',
    SET_STATE: 'set-state',
    STATE_CHANGED: 'state-changed',
    // ENTITY_SINKING: 'entity-sinking',
    ENTITY_DESTROYED: 'entity-destroyed',
    SAIL: 'sail',
    REPAIR: 'repair',
    UPGRADE: 'upgrade',
    TRADE: 'trade',//not implemented
    FIGHT: 'fight',
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
