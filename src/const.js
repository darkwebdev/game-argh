module.exports = {
  gameName: "Aaaarrrrrgggghhh!!1",

  animations: {
    SINK: 'sink'
  },

  keys: {
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    A: 65,
    N: 78,
    T: 84,
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
