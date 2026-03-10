export type InstrumentName = 'kick' | 'snare' | 'hihat' | 'clap';

export interface Instrument {
  id: InstrumentName;
  label: string;
  color: string;
  activeColor: string;
  glowColor: string;
}

export interface BeatGrid {
  [instrument: string]: boolean[];
}

export type PlaybackState = 'stopped' | 'playing' | 'paused';

export interface SavedBeat {
  id: string;
  name: string;
  grid: BeatGrid;
  tempo: number;
  createdAt: number;
}
