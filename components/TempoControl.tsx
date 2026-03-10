'use client';

import React from 'react';
import { useBeatStore } from '@/store/beatStore';
import { useLanguageStore } from '@/store/languageStore';
import { t } from '@/lib/translations';
import { setTransportTempo } from '@/lib/audioEngine';

export default function TempoControl() {
  const { tempo, setTempo, playbackState } = useBeatStore();
  const { language } = useLanguageStore();

  const handleTempoChange = (bpm: number) => {
    setTempo(bpm);
    // Apply immediately to Tone.js Transport (works while playing)
    if (playbackState === 'playing') {
      setTransportTempo(bpm);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* BPM display */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
          {t(language, 'tempo')}
        </span>
        <div className="flex items-baseline gap-1 bg-gray-950/60 px-3 py-1.5 rounded-lg border border-gray-700/60 min-w-[90px] justify-center">
          <span className="text-2xl font-black text-white tabular-nums leading-none">
            {tempo}
          </span>
          <span className="text-xs text-gray-500 font-semibold">
            {t(language, 'bpm')}
          </span>
        </div>
      </div>

      {/* Slider + controls */}
      <div className="flex items-center gap-2.5 w-full min-w-[200px]">
        <button
          onClick={() => handleTempoChange(Math.max(40, tempo - 5))}
          aria-label="Decrease tempo by 5"
          className="w-7 h-7 rounded-full bg-gray-700/80 hover:bg-gray-600 border border-gray-600/60 hover:border-gray-500 flex items-center justify-center text-white text-sm font-bold transition-all duration-150 hover:scale-110 active:scale-95 shrink-0"
        >
          −
        </button>

        <input
          type="range"
          min={40}
          max={200}
          value={tempo}
          onChange={(e) => handleTempoChange(Number(e.target.value))}
          className="flex-1 tempo-slider"
          aria-label="Tempo slider"
          id="slider-tempo"
        />

        <button
          onClick={() => handleTempoChange(Math.min(200, tempo + 5))}
          aria-label="Increase tempo by 5"
          className="w-7 h-7 rounded-full bg-gray-700/80 hover:bg-gray-600 border border-gray-600/60 hover:border-gray-500 flex items-center justify-center text-white text-sm font-bold transition-all duration-150 hover:scale-110 active:scale-95 shrink-0"
        >
          +
        </button>
      </div>

      {/* BPM presets */}
      <div className="flex gap-1.5">
        {[80, 100, 120, 140, 160].map((bpm) => (
          <button
            key={bpm}
            onClick={() => handleTempoChange(bpm)}
            aria-label={`Set tempo to ${bpm} BPM`}
            className={`
              px-2.5 py-1 rounded-lg text-[11px] font-bold
              border transition-all duration-150 hover:scale-105 active:scale-95
              ${tempo === bpm
                ? 'bg-violet-600 text-white border-violet-500 shadow-sm shadow-violet-500/40'
                : 'bg-gray-800/60 text-gray-400 border-gray-700/40 hover:bg-gray-700/80 hover:text-gray-200 hover:border-gray-600'
              }
            `}
          >
            {bpm}
          </button>
        ))}
      </div>
    </div>
  );
}
