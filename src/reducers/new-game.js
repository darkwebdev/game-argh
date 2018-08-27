const { stages } = require('../const')

module.exports = ({ entities, terrain, width }) => ({
  stage: stages.WORLD,
  entities,
  world: {
    terrain,
    width
  }
})
