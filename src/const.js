module.exports = {
  gameName: "Aaaarrrrrgggghhh!!1",

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
    T: 'KeyT',
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
