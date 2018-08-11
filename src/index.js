'use strict';

this._.start = ({ Controller, game }) => {
  console.log('Starting game...');
  const { locations } = _.const
  const { emit, events } = _.events
  Controller(game)

  const initialState = {
    hp: 100,
    armor: 100,
    damage: 100,
    location: locations.HOME_PORT,
    menu: [
      events.SAIL,
      events.SHOP
    ]
  }

  emit(events.UPDATE_STATE, initialState)
}
