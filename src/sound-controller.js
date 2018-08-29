const { map } = require('./helpers')
const { entities: eConst } = require('./const')

module.exports = ({ oldState, state, sound }) => {
  console.log('sound controller', oldState, state)
  const { sounds, play, stop } = sound

  const intro = !oldState.stage
  if (intro) {
    play(sounds.intro)
    // setTimeout(() => {
    //   play(sounds.waves)
    // }, 5000)
  } else {
    if (oldState.stage !== state.stage) {
      stop()
    }
  }

  map(state.entities, ({ id, gid, hp, visible }) => {
    const oldEntity = (oldState.entities || {})[id]
    const isSinking = visible && hp !== undefined && hp <= 0
    const isExploding = oldEntity && gid === eConst.gids.BOMB && oldEntity.visible && !visible

    if (isSinking) {
      play(sounds.sink)
    }

    if (isExploding) {
      play(sounds.explode)
    }
  })
}
