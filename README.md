# Aaarrrrggg!!

[![Build Status](https://travis-ci.org/darkwebdev/game-argh.svg?branch=master)](https://travis-ci.org/darkwebdev/game-argh)

[-=[ PLAY ]=-](https://js13kgames.com/entries/aaarrrrggg)

Life of the pirate means always stepping out of(f) line. Crush, kill and loot fire power from other ships so that you can finally hunt down the greatest pirate in these waters and sink his big-ass ship. AAARRRRGGG!!

![AAARRRRGGG!! gameplay](https://i.snag.gy/BFUWmX.jpg)

## User manual

### Ships
You are the captain of the pirate ship (the black one), green ships are your allies, red-sailed ones are your enemies.
If you escape the battle your enemy will pursue you until one of you is dead or someone else distracts your opponent.

Hint: two enemies cannot pursue you, one of them will eventually stop.

BTW: Two ships cannot reside at the same location (cell).

### Ports
You can repair/upgrade at the friendly ports (green roofs). You cannot repair during the battle.
Hostile ports (red roofs) can be blown up either by cannons or by using the time bomb (barrel with explosives). After overtaking the port it becomes your ally.
Ports that have upgrades for your ship are marked with 'U'.

Hint: try not to be around if you've set up the explosives

All the ships and ports attack their enemies on sight (their sight is pretty limited though - just one cell in 4 directions).

### Stats
Hint: you can see any ship or port stats by hovering with a mouse

#### Damage
Ship's damage power depends on the cannons on board, by sinking other ships you loot 10% of their cannons. The yellow bar on top of the screen indicates your total damage. When it reaches 100% your ship receives the next level and gains HP. All ships and ports can have 3 levels.
You start at level 1 of course.

#### HP
Hitpoints are your ship and crew health. If your HPs are not at maximum they will start replenishing with each turn.

#### Armor
Armor is your ship's protection, it receives the first blows from the enemies. Additional armor is gained by upgrading at the allied ports.

### Goal
Your aim is to find another pirate on the map (ship with black sails) and feed him to the sharks. That would prove that you're the greatest outlaw in the area.

### Controls
Arrows - move the ship

B - drop the time bomb

R - repair at the friendly port

U - upgrade your armor if available at the friendly port

Space - skip turn

## Tested in following browsers
Chrome, Safari, Firefox

## Developer manual

Game is created using vanilla JS and DOM, without canvas. Map created with [Tiled Map Editor](https://www.mapeditor.org).

### Install dependencies
```yarn```

### Test
```yarn test```

### Build minified version
```yarn min```

### Build zip archive
```yarn zip```

## Attribution and links
All graphics of the icons and tiles was done by my fellow designer [Alisa Vitaleva](https://www.linkedin.com/in/alisa-vitaleva-0b5a1156)

[Tentacles skull icon](https://game-icons.net/lorc/originals/tentacles-skull.html) by [Lorc](http://lorcblog.blogspot.com) under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0)
