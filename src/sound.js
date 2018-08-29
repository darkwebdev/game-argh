const { toWebAudio, paramsFromArray } = require('../lib/sfxr')
const sounds = require('../resources/sounds')

module.exports = AudioContext => {
  const audioContext = new AudioContext()
  const queue = [];

  const play = soundPack => {
    if (!soundPack || !soundPack.length) return

    const randomNumber = Math.floor(Math.random() * soundPack.length)
    const randomSound = soundPack[randomNumber]
    console.log('>>>>>>>>> Playing sound', randomNumber)
    const synthDef = paramsFromArray(randomSound)
    synthDef.sample_rate = 44100 // 5512 / 11025 / 22050 / 44100 Hz
    synthDef.sample_size = 8 // 8 / 16 bit
    synthDef.sound_vol = 0.25 // dB???

    try {
      const audioSource = toWebAudio(synthDef, audioContext)
      audioSource.connect(audioContext.destination)
      audioSource.start(0)
      queue.push(audioSource)

      audioSource.onended = () => {
        const i = queue.findIndex(as => as === audioSource)
        if (i !== -1) queue.splice(i, 1)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const stop = () => {
    queue.forEach(as => {
      as.stop()
    })
  }

  return {
    play,
    stop,
    sounds,
  }
}


