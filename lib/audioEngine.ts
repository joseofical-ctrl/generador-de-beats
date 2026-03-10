'use client';

import * as Tone from 'tone';
import { BeatGrid, InstrumentName } from '@/types/beat';

// ─── Mutable live grid ref ────────────────────────────────────────────────────
// The Sequence reads from this on every step, so changes made while playing
// are reflected immediately without restarting the sequence.
let liveGrid: BeatGrid = {};

// ─── Synths ───────────────────────────────────────────────────────────────────
let synths: Record<InstrumentName, Tone.MembraneSynth | Tone.NoiseSynth | Tone.MetalSynth | null> = {
  kick: null,
  snare: null,
  hihat: null,
  clap: null,
};

let sequence: Tone.Sequence | null = null;
let isInitialized = false;

// ─── Init ─────────────────────────────────────────────────────────────────────
export async function initAudio(): Promise<void> {
  if (isInitialized) return;

  await Tone.start();

  // Kick drum — deep punchy bass
  synths.kick = new Tone.MembraneSynth({
    pitchDecay: 0.08,
    octaves: 6,
    envelope: { attack: 0.001, decay: 0.3, sustain: 0, release: 0.3 },
  }).toDestination();

  // Snare — white noise burst
  synths.snare = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { attack: 0.001, decay: 0.15, sustain: 0, release: 0.05 },
  }).toDestination();
  (synths.snare as Tone.NoiseSynth).volume.value = -6;

  // Hi-Hat — short metallic
  synths.hihat = new Tone.MetalSynth({
    frequency: 400,
    envelope: { attack: 0.001, decay: 0.06, release: 0.01 },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5,
  }).toDestination();
  (synths.hihat as Tone.MetalSynth).volume.value = -12;

  // Clap — pink noise burst
  synths.clap = new Tone.NoiseSynth({
    noise: { type: 'pink' },
    envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.05 },
  }).toDestination();
  (synths.clap as Tone.NoiseSynth).volume.value = -8;

  isInitialized = true;
}

// ─── Live grid sync ─────────────────────────────────────────────────────────
/** Call this whenever the grid changes so the running sequence stays in sync. */
export function setLiveGrid(grid: BeatGrid): void {
  liveGrid = grid;
}

// ─── Tempo ────────────────────────────────────────────────────────────────────
/** Update the Tone.js Transport BPM in real time (works while playing). */
export function setTransportTempo(bpm: number): void {
  Tone.getTransport().bpm.value = bpm;
}

// ─── Trigger (preview on cell click) ─────────────────────────────────────────
function _fire(instrument: InstrumentName, time?: number): void {
  const synth = synths[instrument];
  if (!synth) return;
  const t = time ?? Tone.now();

  if (instrument === 'kick') {
    (synth as Tone.MembraneSynth).triggerAttackRelease('C1', '8n', t);
  } else if (instrument === 'snare' || instrument === 'clap') {
    (synth as Tone.NoiseSynth).triggerAttackRelease('8n', t);
  } else if (instrument === 'hihat') {
    (synth as Tone.MetalSynth).triggerAttackRelease('16n', t);
  }
}

/**
 * Trigger a single sound preview.
 * Audio must already be initialized via initAudio() before calling this.
 */
export function triggerSound(instrument: InstrumentName): void {
  if (!isInitialized) return;
  _fire(instrument);
}

// ─── Sequence ─────────────────────────────────────────────────────────────────
export function startSequence(tempo: number, onStep: (step: number) => void): void {
  stopSequence();

  Tone.getTransport().bpm.value = tempo;

  sequence = new Tone.Sequence(
    (time, step) => {
      // Read liveGrid on every tick — reflects real-time cell changes
      const instruments = Object.keys(liveGrid) as InstrumentName[];
      instruments.forEach((inst) => {
        if (liveGrid[inst]?.[step as number]) {
          _fire(inst, time);
        }
      });

      Tone.getDraw().schedule(() => {
        onStep(step as number);
      }, time);
    },
    Array.from({ length: 16 }, (_, i) => i),
    '16n'
  );

  sequence.start(0);
  Tone.getTransport().start();
}

export function pauseSequence(): void {
  Tone.getTransport().pause();
}

export function resumeSequence(): void {
  // The sequence callback and onStep closure are still alive — just resume transport
  Tone.getTransport().start();
}

export function stopSequence(): void {
  if (sequence) {
    sequence.stop();
    sequence.dispose();
    sequence = null;
  }
  Tone.getTransport().stop();
  Tone.getTransport().position = 0;
}
