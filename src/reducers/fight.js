const { roundOutcome } = require('../game')
const { playerEntity } = require('../enitity')

module.exports = (state) => entityId => {
  const player = playerEntity(state.entities)
  const enemy = state.entities[entityId]
  const { hp1, armor1, hp2, armor2 } = roundOutcome(player, enemy);

  if (hp1 <= 0) {
    console.log('X ==> Your ship has sunk')
  }

  if (hp2 <= 0) {
    console.log('X ==> Enemy ship has sunk')
  }
  const lootedCannons = hp2 <= 0 ? Math.floor(enemy.damage / 10) : 0

  console.log('battle round results', hp1, armor1, hp2, armor2)

  return {
    // enemyId: entityId,
    gameOver: hp1 <= 0,
    entities: {
      ...state.entities,
      [player.id]: {
        ...player,
        hp: hp1,
        armor: armor1,
        damage: player.damage + lootedCannons
      },
      [entityId]: {
        ...enemy,
        hp: hp2,
        armor: armor2
      }
    }
  }
}
