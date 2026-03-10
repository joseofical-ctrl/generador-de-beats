'use client';

import React, { useState } from 'react';
import { useBeatStore } from '@/store/beatStore';
import { useLanguageStore } from '@/store/languageStore';
import { t } from '@/lib/translations';
import { stopSequence } from '@/lib/audioEngine';

export default function SoundSelector() {
  const {
    savedBeats,
    saveBeat,
    loadBeat,
    deleteBeat,
    clearGrid,
    setPlaybackState,
    setCurrentStep,
  } = useBeatStore();
  const { language } = useLanguageStore();

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadPanel, setShowLoadPanel] = useState(false);
  const [beatName, setBeatName] = useState('');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = () => {
    if (!beatName.trim()) return;
    saveBeat(beatName.trim());
    setBeatName('');
    setShowSaveModal(false);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2500);
  };

  const handleLoad = (id: string) => {
    stopSequence();
    setPlaybackState('stopped');
    setCurrentStep(-1);
    loadBeat(id);
    setShowLoadPanel(false);
  };

  const handleClear = () => {
    stopSequence();
    setPlaybackState('stopped');
    setCurrentStep(-1);
    clearGrid();
  };

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleString(language === 'es' ? 'es-ES' : 'en-US', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="flex flex-col gap-3">
      {/* ── Action buttons ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">

        {/* Save */}
        <button
          onClick={() => setShowSaveModal(true)}
          id="btn-save-beat"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold
            bg-emerald-600/15 border border-emerald-500/35 text-emerald-400
            hover:bg-emerald-600/25 hover:border-emerald-500/55
            hover:scale-[1.02] active:scale-95
            transition-all duration-200"
        >
          <SaveIcon />
          {t(language, 'saveBeat')}
        </button>

        {/* Load */}
        <button
          onClick={() => setShowLoadPanel(!showLoadPanel)}
          id="btn-load-beat"
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold
            border transition-all duration-200 hover:scale-[1.02] active:scale-95
            ${showLoadPanel
              ? 'bg-cyan-600/20 border-cyan-500/55 text-cyan-300'
              : 'bg-cyan-600/10 border-cyan-700/35 text-cyan-500 hover:bg-cyan-600/20 hover:border-cyan-500/45'
            }
          `}
        >
          <LoadIcon />
          {t(language, 'loadBeat')}
          {savedBeats.length > 0 && (
            <span className="ml-0.5 bg-cyan-500 text-gray-950 text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none">
              {savedBeats.length}
            </span>
          )}
        </button>

        {/* Clear */}
        <button
          onClick={handleClear}
          id="btn-clear"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold
            bg-gray-700/30 border border-gray-600/35 text-gray-400
            hover:bg-gray-600/40 hover:text-gray-200 hover:border-gray-500/55
            hover:scale-[1.02] active:scale-95
            transition-all duration-200"
        >
          <ClearIcon />
          {t(language, 'clearGrid')}
        </button>

        {/* Saved feedback */}
        {savedFeedback && (
          <span className="text-emerald-400 text-sm font-bold flex items-center gap-1 animate-pulse">
            <CheckIcon />
            {t(language, 'beatSaved')}
          </span>
        )}
      </div>

      {/* ── Load panel ───────────────────────────────────────────────────── */}
      {showLoadPanel && (
        <div className="rounded-xl bg-gray-950/70 border border-gray-700/50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700/50 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
              {t(language, 'savedBeats')}
            </h3>
            {savedBeats.length > 0 && (
              <span className="text-xs text-gray-600 tabular-nums">
                {savedBeats.length} beat{savedBeats.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {savedBeats.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500 text-sm font-medium">{t(language, 'noSavedBeats')}</p>
              <p className="text-gray-600 text-xs mt-1">{t(language, 'noSavedBeatsHint')}</p>
            </div>
          ) : (
            <div className="max-h-52 overflow-y-auto divide-y divide-gray-800/60">
              {savedBeats.map((beat) => (
                <div
                  key={beat.id}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-800/40 group transition-colors duration-150"
                >
                  <div className="min-w-0 mr-3">
                    <p className="text-sm font-bold text-white truncate group-hover:text-violet-300 transition-colors">
                      {beat.name}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {beat.tempo} BPM · {formatDate(beat.createdAt)}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleLoad(beat.id)}
                      className="px-3 py-1 rounded-lg text-xs font-bold
                        bg-violet-600/25 border border-violet-500/35 text-violet-300
                        hover:bg-violet-600/45 hover:scale-105 active:scale-95
                        transition-all duration-150"
                    >
                      {t(language, 'load')}
                    </button>
                    <button
                      onClick={() => deleteBeat(beat.id)}
                      className="px-3 py-1 rounded-lg text-xs font-bold
                        bg-red-500/10 border border-red-500/25 text-red-400
                        hover:bg-red-500/20 hover:scale-105 active:scale-95
                        transition-all duration-150"
                    >
                      {t(language, 'delete')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Save modal ───────────────────────────────────────────────────── */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-700/80 rounded-2xl p-6 w-full max-w-sm shadow-2xl shadow-black/60">
            <h3 className="text-lg font-black text-white mb-1">
              {t(language, 'beatName')}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {t(language, 'enterBeatName')}
            </p>
            <input
              autoFocus
              type="text"
              value={beatName}
              onChange={(e) => setBeatName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') { setShowSaveModal(false); setBeatName(''); }
              }}
              placeholder={t(language, 'enterBeatName')}
              className="w-full bg-gray-800/80 border border-gray-600/60 rounded-xl px-4 py-2.5
                text-white placeholder-gray-600 text-sm mb-4
                focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30
                transition-colors duration-150"
              id="input-beat-name"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={!beatName.trim()}
                className="flex-1 py-2.5 rounded-xl bg-violet-600 text-white font-bold text-sm
                  hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed
                  hover:scale-[1.02] active:scale-95
                  transition-all duration-150"
              >
                {t(language, 'save')}
              </button>
              <button
                onClick={() => { setShowSaveModal(false); setBeatName(''); }}
                className="flex-1 py-2.5 rounded-xl bg-gray-700/80 text-gray-300 font-bold text-sm
                  hover:bg-gray-600 hover:scale-[1.02] active:scale-95
                  transition-all duration-150"
              >
                {t(language, 'cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────────
function SaveIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  );
}
function LoadIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  );
}
function ClearIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
