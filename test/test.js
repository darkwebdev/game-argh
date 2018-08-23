const { b58decode, toWebAudio } = require('../lib/sfxr')

const synthDef = b58decode(randomSound)
synthDef.sample_rate = 44100 // 5512 / 11025 / 22050 / 44100 Hz
synthDef.sample_size = 8 // 8 / 16 bit
synthDef.sound_vol = 0.25 // dB???
const audioSource = toWebAudio(synthDef)
