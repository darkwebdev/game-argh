module.exports = state => entityId => ({
  entities: {
    ...state.entities,
    [entityId]: {
      ...state.entities[entityId],
      visible: false
    }
  }
})
