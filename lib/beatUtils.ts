import { BeatGrid, InstrumentName, Instrument } from '@/types/beat';

export const INSTRUMENTS: Instrument[] = [
  {
    id: 'kick',
    label: 'Kick',
    color: 'bg-violet-900/40',
    activeColor: 'bg-violet-500',
    glowColor: 'shadow-violet-500/60',
  },
  {
    id: 'snare',
    label: 'Snare',
    color: 'bg-cyan-900/40',
    activeColor: 'bg-cyan-400',
    glowColor: 'shadow-cyan-400/60',
  },
  {
    id: 'hihat',
    label: 'Hi-Hat',
    color: 'bg-emerald-900/40',
    activeColor: 'bg-emerald-400',
    glowColor: 'shadow-emerald-400/60',
  },
  {
    id: 'clap',
    label: 'Clap',
    color: 'bg-rose-900/40',
    activeColor: 'bg-rose-400',
    glowColor: 'shadow-rose-400/60',
  },
];

export const NUM_STEPS = 16;

export function createEmptyGrid(): BeatGrid {
  const grid: BeatGrid = {};
  INSTRUMENTS.forEach((inst) => {
    grid[inst.id] = new Array(NUM_STEPS).fill(false);
  });
  return grid;
}

export function generateId(): string {
  return `beat_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/** Returns the hex accent color for an instrument ID */
export function getInstrumentColor(id: InstrumentName): string {
  switch (id) {
    case 'kick':  return '#a78bfa'; // violet-400
    case 'snare': return '#22d3ee'; // cyan-400
    case 'hihat': return '#34d399'; // emerald-400
    case 'clap':  return '#fb7185'; // rose-400
    default:      return '#9ca3af';
  }
}
