const OVERSAMPLING = 8
const masterVolume = 1

const SHAPE_SQUARE = 0
const SHAPE_SAWTOOTH = 1
const SHAPE_SINE = 2
const SHAPE_NOISE = 3

const STAGE_ATTACK = 0
const STAGE_SUSTAIN = 1
const STAGE_DECAY = 2

exports.SoundEffect = ps => {
  let elapsedSinceRepeat
  let period
  let periodMax
  let enableFrequencyCutoff
  let periodMult
  let periodMultSlide
  let dutyCycle
  let dutyCycleSlide
  let arpeggioMultiplier
  let arpeggioTime

  function initForRepeat() {
    elapsedSinceRepeat = 0

    period = 100 / (ps.p_base_freq * ps.p_base_freq + 0.001)
    periodMax = 100 / (ps.p_freq_limit * ps.p_freq_limit + 0.001)
    enableFrequencyCutoff = (ps.p_freq_limit > 0)
    periodMult = 1 - Math.pow(ps.p_freq_ramp, 3) * 0.01
    periodMultSlide = -Math.pow(ps.p_freq_dramp, 3) * 0.000001

    dutyCycle = 0.5 - ps.p_duty * 0.5
    dutyCycleSlide = -ps.p_duty_ramp * 0.00005

    if (ps.p_arp_mod >= 0)
      arpeggioMultiplier = 1 - Math.pow(ps.p_arp_mod, 2) * .9
    else
      arpeggioMultiplier = 1 + Math.pow(ps.p_arp_mod, 2) * 10
    arpeggioTime = Math.floor(Math.pow(1 - ps.p_arp_speed, 2) * 20000 + 32)
    if (ps.p_arp_speed === 1)
      arpeggioTime = 0
  }

  initForRepeat()

  // Waveform shape
  let waveShape = parseInt(ps.wave_type)

  // Filter
  let fltw = Math.pow(ps.p_lpf_freq, 3) * 0.1
  let enableLowPassFilter = (ps.p_lpf_freq !== 1)
  let fltw_d = 1 + ps.p_lpf_ramp * 0.0001
  let fltdmp = 5 / (1 + Math.pow(ps.p_lpf_resonance, 2) * 20) * (0.01 + fltw)
  if (fltdmp > 0.8) fltdmp = 0.8
  let flthp = Math.pow(ps.p_hpf_freq, 2) * 0.1
  let flthp_d = 1 + ps.p_hpf_ramp * 0.0003

  // Vibrato
  let vibratoSpeed = Math.pow(ps.p_vib_speed, 2) * 0.01
  let vibratoAmplitude = ps.p_vib_strength * 0.5

  // Envelope
  let envelopeLength = [
    Math.floor(ps.p_env_attack * ps.p_env_attack * 100000),
    Math.floor(ps.p_env_sustain * ps.p_env_sustain * 100000),
    Math.floor(ps.p_env_decay * ps.p_env_decay * 100000),
  ]
  let envelopePunch = ps.p_env_punch

  // Flanger
  let flangerOffset = Math.pow(ps.p_pha_offset, 2) * 1020
  if (ps.p_pha_offset < 0) flangerOffset = -flangerOffset
  let flangerOffsetSlide = Math.pow(ps.p_pha_ramp, 2) * 1
  if (ps.p_pha_ramp < 0) flangerOffsetSlide = -flangerOffsetSlide

  // Repeat
  let repeatTime = Math.floor(Math.pow(1 - ps.p_repeat_speed, 2) * 20000 + 32)
  if (ps.p_repeat_speed === 0) repeatTime = 0

  const gain = Math.exp(ps.sound_vol) - 1

  const sampleRate = ps.sample_rate
  const bitsPerChannel = ps.sample_size

  return {
    getRawBuffer() {
      // const time = Date.now()
      // console.log('getRawBuffer start', time)
      let fltp = 0
      let fltdp = 0
      let fltphp = 0

      let noise_buffer = Array(32).fill().map(() => Math.random() * 2 - 1)

      let envelopeStage = 0
      let envelopeElapsed = 0

      let vibratoPhase = 0

      let phase = 0
      let ipp = 0
      let flanger_buffer = Array(1024).fill(0)

      let clipped = 0

      const buffer = []

      let sample_sum = 0
      let num_summed = 0
      let summands = Math.floor(44100 / sampleRate)

      for (let t = 0; ; ++t) {

        // Repeats
        if (repeatTime !== 0 && ++elapsedSinceRepeat >= repeatTime)
          initForRepeat()

        // Arpeggio (single)
        if (arpeggioTime !== 0 && t >= arpeggioTime) {
          arpeggioTime = 0
          period *= arpeggioMultiplier
        }

        // Frequency slide, and frequency slide slide!
        periodMult += periodMultSlide
        period *= periodMult
        if (period > periodMax) {
          period = periodMax
          if (enableFrequencyCutoff)
            break
        }

        // Vibrato
        let rfperiod = period
        if (vibratoAmplitude > 0) {
          vibratoPhase += vibratoSpeed
          rfperiod = period * (1 + Math.sin(vibratoPhase) * vibratoAmplitude)
        }
        let iperiod = Math.floor(rfperiod)
        if (iperiod < OVERSAMPLING) iperiod = OVERSAMPLING

        // Square wave duty cycle
        dutyCycle += dutyCycleSlide
        if (dutyCycle < 0) dutyCycle = 0
        if (dutyCycle > 0.5) dutyCycle = 0.5

        // Volume envelope
        if (++envelopeElapsed > envelopeLength[envelopeStage]) {
          envelopeElapsed = 0
          if (++envelopeStage > 2)
            break
        }

        let env_vol
        let envf = envelopeElapsed / envelopeLength[envelopeStage]

        switch (envelopeStage) {
          case STAGE_ATTACK:
            env_vol = envf
            break

          case STAGE_SUSTAIN:
            env_vol = 1 + (1 - envf) * 2 * envelopePunch
            break

          case STAGE_DECAY:
            env_vol = 1 - envf
            break
        }

        // Flanger step
        flangerOffset += flangerOffsetSlide
        let iphase = Math.abs(Math.floor(flangerOffset))
        if (iphase > 1023) iphase = 1023

        if (flthp_d !== 0) {
          flthp *= flthp_d
          if (flthp < 0.00001) flthp = 0.00001
          if (flthp > 0.1) flthp = 0.1
        }

        // 8x oversampling
        let sample = 0
        for (let si = 0; si < OVERSAMPLING; ++si) {
          let sub_sample = 0
          phase++
          if (phase >= iperiod) {
            phase %= iperiod
            if (waveShape === SHAPE_NOISE)
              for (let i = 0; i < 32; ++i)
                noise_buffer[i] = Math.random() * 2 - 1
          }

          // Base waveform
          const fp = phase / iperiod

          switch (waveShape) {
            case SHAPE_SQUARE:
              sub_sample = fp < dutyCycle ? 0.5 : -0.5
              break

            case SHAPE_SAWTOOTH:
              sub_sample = fp < dutyCycle ? -1 + 2 * fp / dutyCycle : 1 - 2 * (fp - dutyCycle) / (1 - dutyCycle)
              break

            case SHAPE_SINE:
              sub_sample = Math.sin(fp * 2 * Math.PI)
              break

            case SHAPE_NOISE:
              sub_sample = noise_buffer[Math.floor(phase * 32 / iperiod)]
              break

            default:
              // throw 'ERROR: Bad wave type: ' + waveShape
          }

          // Low-pass filter
          let pp = fltp
          fltw *= fltw_d
          if (fltw < 0) fltw = 0
          if (fltw > 0.1) fltw = 0.1
          if (enableLowPassFilter) {
            fltdp += (sub_sample - fltp) * fltw
            fltdp -= fltdp * fltdmp
          } else {
            fltp = sub_sample
            fltdp = 0
          }
          fltp += fltdp

          // High-pass filter
          fltphp += fltp - pp
          fltphp -= fltphp * flthp
          sub_sample = fltphp

          // Flanger
          flanger_buffer[ipp & 1023] = sub_sample
          sub_sample += flanger_buffer[(ipp - iphase + 1024) & 1023]
          ipp = (ipp + 1) & 1023

          // final accumulation and envelope application
          sample += sub_sample * env_vol
        }

        // Accumulate samples appropriately for sample rate
        sample_sum += sample
        if (++num_summed < summands) continue

        num_summed = 0
        sample = sample_sum / summands
        sample_sum = 0

        sample = sample / OVERSAMPLING * masterVolume
        sample *= gain

        if (bitsPerChannel === 8) {
          // Rescale [-1, 1) to [0, 256)
          sample = Math.floor((sample + 1) * 128)
          if (sample > 255) {
            sample = 255
            ++clipped
          } else if (sample < 0) {
            sample = 0
            ++clipped
          }
          buffer.push(sample)
        } else {
          // Rescale [-1, 1) to [-32768, 32768)
          sample = Math.floor(sample * (1 << 15))
          if (sample >= (1 << 15)) {
            sample = (1 << 15) - 1
            ++clipped
          } else if (sample < -(1 << 15)) {
            sample = -(1 << 15)
            ++clipped
          }
          buffer.push(sample & 0xFF)
          buffer.push((sample >> 8) & 0xFF)
        }
      }

      // console.log('getRawBuffer end', Date.now() - time)

      return {
        buffer,
        clipped,
      }
    },

    bitsPerChannel,
    sampleRate,
  }
}

exports.normalized = (buffer, bitsPerChannel) => buffer.map(b => 2.0 * b / Math.pow(2, bitsPerChannel) - 1.0)
