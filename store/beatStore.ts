import { create } from 'zustand';
import { BeatGrid, PlaybackState, SavedBeat } from '@/types/beat';
import { createEmptyGrid, generateId } from '@/lib/beatUtils';

const STORAGE_KEY = 'beat-maker-saved-beats';

interface BeatState {
  grid: BeatGrid;
  tempo: number;
  playbackState: PlaybackState;
  currentStep: number;
  savedBeats: SavedBeat[];

  // Grid actions
  toggleCell: (instrument: string, step: number) => void;
  clearGrid: () => void;
  setGrid: (grid: BeatGrid) => void;

  // Tempo
  setTempo: (bpm: number) => void;

  // Playback
  setPlaybackState: (state: PlaybackState) => void;
  setCurrentStep: (step: number) => void;

  // Saved beats
  saveBeat: (name: string) => void;
  loadBeat: (id: string) => void;
  deleteBeat: (id: string) => void;
  loadSavedBeats: () => void;
}

export const useBeatStore = create<BeatState>((set, get) => ({
  grid: createEmptyGrid(),
  tempo: 120,
  playbackState: 'stopped',
  currentStep: -1,
  savedBeats: [],

  toggleCell: (instrument, step) => {
    set((state) => ({
      grid: {
        ...state.grid,
        [instrument]: state.grid[instrument].map((val, i) =>
          i === step ? !val : val
        ),
      },
    }));
  },

  clearGrid: () => {
    set({ grid: createEmptyGrid(), currentStep: -1 });
  },

  setGrid: (grid) => {
    set({ grid });
  },

  setTempo: (bpm) => {
    set({ tempo: bpm });
  },

  setPlaybackState: (state) => {
    set({ playbackState: state });
    if (state === 'stopped') {
      set({ currentStep: -1 });
    }
  },

  setCurrentStep: (step) => {
    set({ currentStep: step });
  },

  saveBeat: (name) => {
    const { grid, tempo, savedBeats } = get();
    const newBeat: SavedBeat = {
      id: generateId(),
      name,
      grid: JSON.parse(JSON.stringify(grid)),
      tempo,
      createdAt: Date.now(),
    };

    const updated = [...savedBeats, newBeat];
    set({ savedBeats: updated });
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  },

  loadBeat: (id) => {
    const { savedBeats } = get();
    const beat = savedBeats.find((b) => b.id === id);
    if (beat) {
      set({ grid: beat.grid, tempo: beat.tempo, playbackState: 'stopped', currentStep: -1 });
    }
  },

  deleteBeat: (id) => {
    const updated = get().savedBeats.filter((b) => b.id !== id);
    set({ savedBeats: updated });
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  },

  loadSavedBeats: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as SavedBeat[];
          set({ savedBeats: parsed });
        } catch {
          // ignore
        }
      }
    }
  },
}));
