const { STAGES } = require('../const')

module.exports = ({ entities, terrain, width }) => ({
  stage: STAGES.WORLD,
  entities,
  world: {
    terrain,
    width
  }
})
