'use client';

import React from 'react';
import { useBeatStore } from '@/store/beatStore';
import { useLanguageStore } from '@/store/languageStore';
import { t } from '@/lib/translations';
import {
  initAudio,
  setLiveGrid,
  startSequence,
  pauseSequence,
  resumeSequence,
  stopSequence,
} from '@/lib/audioEngine';

export default function PlayButton() {
  const { grid, tempo, playbackState, setPlaybackState, setCurrentStep } = useBeatStore();
  const { language } = useLanguageStore();

  const handlePlay = async () => {
    if (playbackState === 'playing') return;

    await initAudio();

    if (playbackState === 'paused') {
      resumeSequence();
      setPlaybackState('playing');
    } else {
      // Sync grid to engine before starting
      setLiveGrid(grid);
      startSequence(tempo, (step) => {
        setCurrentStep(step);
      });
      setPlaybackState('playing');
    }
  };

  const handlePause = () => {
    if (playbackState !== 'playing') return;
    pauseSequence();
    setPlaybackState('paused');
  };

  const handleStop = () => {
    if (playbackState === 'stopped') return;
    stopSequence();
    setPlaybackState('stopped');
    setCurrentStep(-1);
  };

  const isPlaying = playbackState === 'playing';
  const isStopped = playbackState === 'stopped';

  return (
    <div className="flex items-center gap-2">
      {/* ── Play ─────────────────────────────────────────────────────────── */}
      <button
        onClick={handlePlay}
        disabled={isPlaying}
        id="btn-play"
        aria-label={t(language, 'play')}
        className={`
          flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm
          border transition-all duration-200
          ${isPlaying
            ? 'bg-violet-600/50 border-violet-500/40 text-violet-300 cursor-not-allowed opacity-60'
            : 'bg-violet-600 border-violet-500 text-white hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/30 hover:scale-[1.02] active:scale-95'
          }
        `}
      >
        <PlayIcon animate={isPlaying} />
        {t(language, 'play')}
      </button>

      {/* ── Pause ────────────────────────────────────────────────────────── */}
      <button
        onClick={handlePause}
        disabled={!isPlaying}
        id="btn-pause"
        aria-label={t(language, 'pause')}
        className={`
          flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm
          border transition-all duration-200
          ${!isPlaying
            ? 'bg-gray-800/60 border-gray-700/40 text-gray-500 cursor-not-allowed opacity-50'
            : 'bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/25 hover:scale-[1.02] active:scale-95'
          }
        `}
      >
        <PauseIcon />
        {t(language, 'pause')}
      </button>

      {/* ── Stop ─────────────────────────────────────────────────────────── */}
      <button
        onClick={handleStop}
        disabled={isStopped}
        id="btn-stop"
        aria-label={t(language, 'stop')}
        className={`
          flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm
          border transition-all duration-200
          ${isStopped
            ? 'bg-gray-800/60 border-gray-700/40 text-gray-500 cursor-not-allowed opacity-50'
            : 'bg-red-500/15 border-red-500/40 text-red-400 hover:bg-red-500/25 hover:scale-[1.02] active:scale-95'
          }
        `}
      >
        <StopIcon />
        {t(language, 'stop')}
      </button>
    </div>
  );
}

function PlayIcon({ animate }: { animate: boolean }) {
  return (
    <svg className={`w-4 h-4 ${animate ? 'animate-pulse' : ''}`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}
function StopIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 6h12v12H6z" />
    </svg>
  );
}
