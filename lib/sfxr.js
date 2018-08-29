const { SoundEffect, normalized } = require('./sound-effect')

const paramsOrder = [
  'wave_type',
  'p_env_attack',
  'p_env_sustain',
  'p_env_punch',
  'p_env_decay',
  'p_base_freq',
  'p_freq_limit',
  'p_freq_ramp',
  'p_freq_dramp',
  'p_vib_strength',
  'p_vib_speed',
  'p_arp_mod',
  'p_arp_speed',
  'p_duty',
  'p_duty_ramp',
  'p_repeat_speed',
  'p_pha_offset',
  'p_pha_ramp',
  'p_lpf_freq',
  'p_lpf_ramp',
  'p_lpf_resonance',
  'p_hpf_freq',
  'p_hpf_ramp',
]

exports.paramsFromArray = arr => arr.reduce((obj, value, key) => ({
  ...obj,
  [paramsOrder[key]]: paramsOrder[key] === 'wave_type' ? value : value / 10000
}), {})

exports.toWebAudio = (synthdef, audiocontext) => {
  if (!synthdef || !audiocontext) return

  const { getRawBuffer, bitsPerChannel, sampleRate } = SoundEffect(synthdef)
  const sfxBuffer = normalized(getRawBuffer().buffer, bitsPerChannel)
  const aCtxBuffer = audiocontext.createBuffer(1, sfxBuffer.length, sampleRate)
  const nowBuffering = aCtxBuffer.getChannelData(0)
  sfxBuffer.forEach((b, i) => {
    nowBuffering[i] = b
  })
  const proc = audiocontext.createBufferSource()
  proc.buffer = aCtxBuffer

  return proc
}
