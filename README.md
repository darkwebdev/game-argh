# Aaarrrrggg!!

[![Build Status](https://travis-ci.org/darkwebdev/game-argh.svg?branch=master)](https://travis-ci.org/darkwebdev/game-argh)

Life of the pirate means always stepping out of(f) line. Crush, kill and plunder cannons from other ships so that you can finally hunt down the greatest pirate in these waters and sink his huge ship. AAARRRRGGG!!

## How to play
### Ships
You are the captain of the pirate ship (the black one), green ships are your allies, red-sailed ones are your enemies.
If you escape the battle your enemy will pursue you until one of you is dead or someone else starts attacking your opponent. Two enemies cannot pursue you, one of them will eventually stop.
Two ships cannot reside at the same location (cell).

### Ports
You can repair/upgrade at the friendly ports (green roofs). Hostile ports (red roofs) can be blown up either by cannons or by using the time bomb (barrel with explosives). After overtaking the port it becomes your ally.
Ports that have upgrades for your ship are marked with 'U'.

All the ships and ports attack their enemies on sight (their sight is limited by one cell).

### Damage
Ship's damage depends on the cannons on board, by sinking other ships you loot 10% of the cannons. The yellow bar on top of the screen indicates your total damage. When it reaches 100% your ship receives the next level.

### HP
### Armor

### Goal
Your aim is to find another pirate on the map (ship with black sails) and defeat him.

### Controls
Arrows - move the ship

B - drop the time bomb

R - repair at the friendly port

U - upgrade your armor if available at the friendly port

Space - skip turn

## Tested in following browsers
Chrome, Safari, Firefox

## Development
```yarn```

## Test
```yarn test```

## Build minified version
```yarn min```

## Build zip archive
```yarn zip```

## Attribution
All graphics of the icons and tiles was done by my fellow designer [Alisa Vitaleva](https://www.linkedin.com/in/alisa-vitaleva-0b5a1156)

[Tentacles skull icon](https://game-icons.net/lorc/originals/tentacles-skull.html) by [Lorc](http://lorcblog.blogspot.com) under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0)
