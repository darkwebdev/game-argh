const { stages } = require('../const')
const { playerActions } = require('../game')

module.exports = () => ({
  stage: stages.INTRO,
  actions: playerActions(),
})
