'use client';

import React, { useEffect } from 'react';
import { useBeatStore } from '@/store/beatStore';
import { useLanguageStore } from '@/store/languageStore';
import { t } from '@/lib/translations';
import BeatGrid from '@/components/BeatGrid';
import Controls from '@/components/Controls';
import LanguageToggle from '@/components/LanguageToggle';

export default function Home() {
  const { loadSavedBeats, playbackState, currentStep } = useBeatStore();
  const { language } = useLanguageStore();

  useEffect(() => {
    loadSavedBeats();
  }, [loadSavedBeats]);

  // Status display
  const statusKey =
    playbackState === 'playing' ? 'playing' :
    playbackState === 'paused'  ? 'paused'  : 'stopped';

  const statusColor =
    playbackState === 'playing' ? 'text-emerald-400' :
    playbackState === 'paused'  ? 'text-amber-400'   : 'text-gray-500';

  const dotColor =
    playbackState === 'playing' ? 'bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/60' :
    playbackState === 'paused'  ? 'bg-amber-400'   : 'bg-gray-600';

  return (
    <main className="min-h-screen bg-gray-950 relative overflow-hidden">

      {/* Background — grid dots */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff0a 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-violet-700/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[240px] bg-cyan-700/8 blur-[90px] rounded-full pointer-events-none" />

      {/* ── Main container ────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 py-8 md:py-12">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="flex items-center justify-between mb-8 gap-4">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center shadow-lg shadow-violet-700/40 shrink-0">
              <DrumIcon />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent leading-tight">
                {t(language, 'appTitle')}
              </h1>
              <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase">
                {t(language, 'appSubtitle')}
              </p>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Status pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900/60 border border-gray-700/50 text-xs font-bold">
              <span className={`w-2 h-2 rounded-full ${dotColor} transition-all duration-300`} />
              <span className={`${statusColor} transition-colors duration-300`}>
                {t(language, statusKey)}
              </span>
            </div>
            <LanguageToggle />
          </div>
        </header>

        {/* ── Drum machine card ────────────────────────────────────────────── */}
        <div className="rounded-2xl bg-gray-900/70 border border-gray-700/50 backdrop-blur-md shadow-2xl shadow-black/50 overflow-hidden">

          {/* Card title bar */}
          <div className="flex items-center gap-3 px-5 py-3.5 bg-gray-800/40 border-b border-gray-700/40">
            {/* macOS-style dots */}
            <div className="flex gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            </div>

            {/* Title */}
            <div className="flex-1 text-center">
              <span className="text-[11px] font-mono font-bold text-gray-500 tracking-[0.25em] uppercase">
                16 · STEP · SEQUENCER
              </span>
            </div>

            {/* Mini step visualizer */}
            <div className="hidden sm:flex gap-px shrink-0" aria-hidden="true">
              {Array.from({ length: 16 }, (_, i) => (
                <div
                  key={i}
                  className={`
                    w-[5px] rounded-sm transition-all duration-75
                    ${currentStep === i
                      ? 'h-5 bg-violet-400 shadow-sm shadow-violet-400/60'
                      : Math.floor(i / 4) % 2 === 0 ? 'h-3 bg-gray-700' : 'h-3 bg-gray-800'
                    }
                  `}
                />
              ))}
            </div>
          </div>

          {/* Beat grid */}
          <div className="px-5 pt-5 pb-4">
            <BeatGrid />
          </div>

          {/* Divider */}
          <div className="mx-5 border-t border-gray-700/40" />

          {/* Controls */}
          <div className="p-5">
            <Controls />
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <footer className="mt-8 text-center">
          <p className="text-xs text-gray-700 font-medium tracking-wide">
            Built with{' '}
            <span className="text-gray-600">Next.js</span>
            {' · '}
            <span className="text-gray-600">Tone.js</span>
            {' · '}
            <span className="text-gray-600">Zustand</span>
          </p>
        </footer>
      </div>
    </main>
  );
}

function DrumIcon() {
  return (
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 3C7.03 3 3 4.34 3 6v12c0 1.66 4.03 3 9 3s9-1.34 9-3V6c0-1.66-4.03-3-9-3zm0 2c4.08 0 7 1.06 7 2s-2.92 2-7 2-7-1.06-7-2 2.92-2 7-2zM5 9.5c1.45.87 3.8 1.5 7 1.5s5.55-.63 7-1.5V12c0 .94-2.92 2-7 2s-7-1.06-7-2V9.5zM5 14.5c1.45.87 3.8 1.5 7 1.5s5.55-.63 7-1.5V17c0 .94-2.92 2-7 2s-7-1.06-7-2v-2.5z" />
    </svg>
  );
}
