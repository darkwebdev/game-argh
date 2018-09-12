const { roundOutcome } = require('../game')
const { playerEntity } = require('../entity')

module.exports = (state) => entityId => {
  const player = playerEntity(state.entities)
  const enemy = state.entities[entityId]
  const { hp1, armor1, hp2, armor2 } = roundOutcome(player, enemy);

  const lootedCannons = hp2 <= 0 ? Math.floor(enemy.damage / 10) : 0

  console.log('BATTLE round results', hp1, armor1, hp2, armor2)
  lootedCannons && console.log('LOOT', lootedCannons)

  return {
    enemyId: enemy.hp > 0 ? entityId : undefined,
    gameOver: hp1 <= 0,
    entities: {
      ...state.entities,
      [player.id]: {
        ...player,
        hp: hp1,
        armor: armor1,
        damage: player.damage + lootedCannons
      },
      [enemy.id]: {
        ...enemy,
        hp: hp2,
        armor: armor2
      }
    }
  }
}
