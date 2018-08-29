const { STAGES } = require('../const')
const { playerActions } = require('../game')

module.exports = () => ({
  stage: STAGES.INTRO,
  actions: playerActions(),
})
