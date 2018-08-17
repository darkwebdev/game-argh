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
  },

  directions: {
    NORTH: 'north',
    SOUTH: 'south',
    EAST: 'east',
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
