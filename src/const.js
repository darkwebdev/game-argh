module.exports = {
  gameName: "Aaarrrrggg!!",

  animations: {
    SINK: 'sink'
  },

  keys: {
    ARROW_LEFT: 'ArrowLeft',
    ARROW_UP: 'ArrowUp',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_DOWN: 'ArrowDown',
    A: 'KeyA',
    N: 'KeyN',
    R: 'KeyR',
    T: 'KeyT',
    U: 'KeyU',
  },

  directions: {
    NORTH: 'north',
    EAST: 'east',
    SOUTH: 'south',
    WEST: 'west'
  },

  terrains: {
    gids: {
      WATER: 1,
      LAND: 2
    }
  },

  entities: {
    gids: {
      ENEMY: 3,
      ALLY: 4,
      PLAYER: 5,
      PORT: 6
    }
  }
}
