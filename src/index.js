'use strict';

this._.start = ({ Controller, game }) => {
  console.log('Starting game...');
  const { emit, events } = _.events
  // const { steps } = this.const
  Controller(game)

  const initialState = {

    // step: steps.CHOOSE_WEAPON,
    // score: [0, 0]
  }

  emit(events.UPDATE_STATE, initialState)
}
