// Procedural Web Audio API sound synthesizer for Diwali Magic
// Completely self-contained: No external audio file downloads required!

let audioCtx = null;
let ambientOscillators = [];
let ambientGainNode = null;
let isAmbientPlaying = false;
let isMuted = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMuted(muted) {
  isMuted = muted;
  if (muted && isAmbientPlaying) {
    stopAmbientMusic();
  }
}

export function getMuted() {
  return isMuted;
}

// 1. Rocket Launch Whistle
export function playLaunchSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(1100, now + 0.55);

  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.18, now + 0.1);
  gain.gain.linearRampToValueAtTime(0.01, now + 0.55);

  // Bandpass noise for wind whistle effect
  const bufferSize = ctx.sampleRate * 0.55;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.exponentialRampToValueAtTime(2200, now + 0.55);
  filter.Q.value = 4;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.01, now);
  noiseGain.gain.linearRampToValueAtTime(0.12, now + 0.15);
  noiseGain.gain.linearRampToValueAtTime(0.001, now + 0.55);

  osc.connect(gain);
  gain.connect(ctx.destination);
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  osc.start(now);
  noise.start(now);
  osc.stop(now + 0.56);
  noise.stop(now + 0.56);
}

// 2. Firework Explosion Boom & Thud
export function playExplosionSound(intensity = 1) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 0.8 * intensity;

  // Low frequency thud oscillator
  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  subOsc.type = 'triangle';
  subOsc.frequency.setValueAtTime(140, now);
  subOsc.frequency.exponentialRampToValueAtTime(30, now + duration);

  subGain.gain.setValueAtTime(0.35 * intensity, now);
  subGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  subOsc.connect(subGain);
  subGain.connect(ctx.destination);
  subOsc.start(now);
  subOsc.stop(now + duration);

  // Burst Noise
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.exponentialRampToValueAtTime(120, now + duration);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.4 * intensity, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  whiteNoise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  whiteNoise.start(now);
  whiteNoise.stop(now + duration);
}

// 3. Crackling Sparks
export function playCrackleSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const count = 5 + Math.floor(Math.random() * 6);

  for (let i = 0; i < count; i++) {
    const delay = Math.random() * 0.4;
    const crackleTime = now + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1800 + Math.random() * 1200, crackleTime);

    gain.gain.setValueAtTime(0.08, crackleTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, crackleTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(crackleTime);
    osc.stop(crackleTime + 0.045);
  }
}

// 4. Temple Bell / Ghanti Sound (Pure harmonic chime)
export function playBellSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const baseFreq = 784; // G5
  const harmonics = [1, 2.01, 3.03, 4.2];
  const gains = [0.25, 0.15, 0.08, 0.03];

  harmonics.forEach((h, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq * h, now);

    const decay = 2.2 / (idx + 1);
    gain.gain.setValueAtTime(gains[idx], now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + decay);
  });
}

// 5. Diya Light / Match Spark Sound
export function playDiyaLightSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Gentle pleasant chord swell (F# major: F#, A#, C#)
  const freqs = [370, 466.16, 554.37, 740];
  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.04);

    gain.gain.setValueAtTime(0.001, now + idx * 0.04);
    gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), now + idx * 0.04 + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.04);
    osc.stop(now + 1.25);
  });
}

// 6. Shimmer / Golden Sparkle Sound
export function playSparkleSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [1046.5, 1318.5, 1567.98, 2093.0]; // C6, E6, G6, C7
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.07);

    gain.gain.setValueAtTime(0.08, now + i * 0.07);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.07);
    osc.stop(now + i * 0.07 + 0.4);
  });
}

// 7. Ambient Festive Drone (Tanpura & Serene Indian Classical Ambience)
export function toggleAmbientMusic() {
  if (isAmbientPlaying) {
    stopAmbientMusic();
    return false;
  } else {
    startAmbientMusic();
    return true;
  }
}

export function isAmbientMusicActive() {
  return isAmbientPlaying;
}

export function startAmbientMusic() {
  if (isMuted || isAmbientPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  ambientGainNode = ctx.createGain();
  ambientGainNode.gain.setValueAtTime(0.01, now);
  ambientGainNode.gain.linearRampToValueAtTime(0.12, now + 1.5);
  ambientGainNode.connect(ctx.destination);

  // Tanpura strings: Pa (G2: 98Hz), Sa (C3: 130.81Hz), Sa (C3: 130.81Hz), Sa (C2: 65.41Hz)
  const tanpuraFrequencies = [98.0, 130.81, 131.2, 65.41, 196.0];

  ambientOscillators = tanpuraFrequencies.map((freq, index) => {
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const oscGain = ctx.createGain();

    osc.type = index % 2 === 0 ? 'sawtooth' : 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm low-pass filter to sound organic
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320 + index * 60, now);

    // Subtle natural chorusing LFO
    lfo.frequency.setValueAtTime(0.2 + index * 0.05, now);
    lfoGain.gain.setValueAtTime(1.5, now);
    lfo.connect(osc.frequency);

    oscGain.gain.setValueAtTime(0.08 / tanpuraFrequencies.length, now);

    osc.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(ambientGainNode);

    lfo.start(now);
    osc.start(now);

    return { osc, lfo };
  });

  isAmbientPlaying = true;
}

export function stopAmbientMusic() {
  if (!isAmbientPlaying) return;
  const ctx = getAudioContext();
  if (ctx && ambientGainNode) {
    const now = ctx.currentTime;
    ambientGainNode.gain.linearRampToValueAtTime(0.001, now + 1.0);
    setTimeout(() => {
      ambientOscillators.forEach(({ osc, lfo }) => {
        try {
          osc.stop();
          lfo.stop();
          osc.disconnect();
          lfo.disconnect();
        } catch (e) {}
      });
      ambientOscillators = [];
      isAmbientPlaying = false;
    }, 1100);
  } else {
    isAmbientPlaying = false;
  }
}

