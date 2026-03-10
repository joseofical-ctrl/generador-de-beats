'use client';

import React from 'react';
import PlayButton from './PlayButton';
import TempoControl from './TempoControl';
import SoundSelector from './SoundSelector';

export default function Controls() {
  return (
    <div className="flex flex-col gap-3">
      {/* ── Playback + Tempo row ──────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 rounded-xl bg-gray-800/30 border border-gray-700/40">
        <PlayButton />
        <TempoControl />
      </div>

      {/* ── Beat management row ───────────────────────────────────────────── */}
      <div className="px-5 py-4 rounded-xl bg-gray-800/30 border border-gray-700/40">
        <SoundSelector />
      </div>
    </div>
  );
}
