const healedHp = ({ hp, maxHp }, hpPerTurn) => hp < maxHp ? Math.min(hp + hpPerTurn, maxHp) : hp

module.exports = ({ player = {}, config }) => {
  return player.hp > 0 ? {
    [player.id]: {
      ...player,
      hp: healedHp(player, config.hpPerTurn),
    },
  } : {}
}
