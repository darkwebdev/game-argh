'use strict'

const { toWebAudio, paramsFromArray } = require('../lib/sfxr')

module.exports = AudioContext => {
  const audioContext = new AudioContext()

  return {
    play(sounds) {
      if (!sounds || !sounds.length) return

      const randomNumber = Math.floor(Math.random() * sounds.length)
      const randomSound = sounds[randomNumber]
      console.log('>>>>>>>>> Playing sound', randomNumber)
      const synthDef = paramsFromArray(randomSound)
      synthDef.sample_rate = 44100 // 5512 / 11025 / 22050 / 44100 Hz
      synthDef.sample_size = 8 // 8 / 16 bit
      synthDef.sound_vol = 0.25 // dB???

      try {
        const audioSource = toWebAudio(synthDef, audioContext)
        audioSource.connect(audioContext.destination)
        audioSource.start(0)
      } catch (e) {
        console.log(e.message)
      }
    },

    sounds: {
      sample: [
        // '8LRswFKDeFFf39j22Lk2Lqig5NhmAfjMPUm9LdmNVtEnwbrCwRBkfj24X7ZvWcr6r789NHzHYKcMCbUFv1DPtbSEEEH793v18jV7UyG3s2UzpchfUK27nmXwP'
        // 'WzEsMCwwLDAsMCwyMiwyNywxMjcsNjIsMCwwLDAsMCwxODAsNDgsMTgxLDYyLDE3NSw4Niw2NCw2MywxNTgsMTIxLDI0MSw2Miw0MCw0Niw4MCwxOTAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDQ3LDEyNyw0OSw2MywxNzgsMjUwLDcxLDE5MCwwLDAsMCwwLDUsMTM0LDQsNjAsMTAzLDE2NCwyMDksMTg5LDAsMCwxMjgsNjMsMCwwLDAsMCwwLDAsMCwwLDMzLDE1MCwxMTIsNjEsMCwwLDAsMF0=',
        [1, -1014, 3715, 348, -226, 5450, 0, 125, 2, -300, 26, -616, -2159, 7653, 15, -6249, -39, -5898, 9881, -3658, 4576, 0, -1689,],
      ],
      cannons: [
        // '7BMHBGBJ6bscWsHt7wGWZbLGUDoqh6XQEEdz2ixukRLxVHA82mjFEfNLdFpsCYm9dX6gYnYUJXwRFDkLAMb4bxczo2u8wytjE9pfXSAbzEiA61SQzzz9dYaC7',
        [3, 0, 3857, 7713, 4644, 2560, 0, -3745, 0, 0, 0, 0, 0, 0, 0, 0, -2487, -706, 10000, 0, 0, 0, 0],
        // '8QPPt4FBohDkny7g4UThfogmAfTEjhPUBb9DFmkXrux95mLpQyGG1HaYFxSsVzxX2ds5DsYYhyTXYgzgozc5TyJxCA3pfKon6Hzm5GJEFGQVg3pQ11VHGucUZ',
        [3, -347, 4114, 7713, 4483, 2707, 0, -3723, 235, 90, 0, 0, 0, -723, 328, 117, -2487, -788, 10000, 834, 134, -469, 17],
      ],
      sail: [
        // 8LRswFKDeFFf39j22Lk2Lqig5NhmAfjMPUm9LdmNVtEnwbrCwRBkfj24X7ZvWcr6r789NHzHYKcMCbUFv1DPtbSEEEH793v18jV7UyG3s2UzpchfUK27nmXwP',
        // longer sound:
        // [3, 4800, 6640, 2880, 5580, 7340, 2340, 1606, 7722, 1720, 7970, 4230, -2700, -312, 759, 0, -5470, -4700, 9670, 3850, 2010, -624, 9,],
        // shorter sound:
        [3, 4580, 3940, 2390, 4510, 7340, 2340, 1606, 7722, 1720, 7970, 4230, -2700, -312, 759, 0, -5470, -4700, 9670, 3850, 2010, -624, 9],
      ],
      sink: [
        // 5TLE25xwdvDxkZW4Rt3tQjTMpGYyhKdEBahFnHRKNUiMNXsBYxaYezwVVUA9NSLEbZX5oE4fiFkERKEu3izD489vE333RXAHHH5EYZNo6BuHBR3UEoCAuNxRj
        [2, 421, 3900, -795, 5890, 580, 0, 10000, -600, 790, 3500, -4900, 3530, 3876, 1788, 3260, 1580, -4490, 2110, -100, 1550, 1650, 2210],
      ],
      gameOver: [
        // 111119svMh4CzDVY24XFh2oEcYVDAf9PynnHQnyvNsqN2ih6bTzkCSjcxbwr9Pj7ZWJkBPnC7EqoSEBFjK3yB5Anqd1FmyFzv79kbc7B6jZJs7FgHPgzVMwd
        [0, 0, 7129, 6465, 9411, 1737, 0, 0, 0, 0, 0, -3162, 4938, 2048, 0, 0, 0, 0, 10000, 344, 9718, 0, 0],
      ]
    },
  }
}
