'use client';

import React, { useEffect } from 'react';
import { useBeatStore } from '@/store/beatStore';
import { useLanguageStore } from '@/store/languageStore';
import { t } from '@/lib/translations';
import { initAudio, triggerSound, setLiveGrid } from '@/lib/audioEngine';
import { INSTRUMENTS, NUM_STEPS, getInstrumentColor } from '@/lib/beatUtils';
import { InstrumentName } from '@/types/beat';
import BeatCell from './BeatCell';

export default function BeatGrid() {
  const { grid, toggleCell, currentStep } = useBeatStore();
  const { language } = useLanguageStore();

  // ── Keep audio engine in sync with the live grid ────────────────────────────
  // This ensures cell changes made WHILE playing are heard immediately.
  useEffect(() => {
    setLiveGrid(grid);
  }, [grid]);

  // ── Instrument labels (translated) ──────────────────────────────────────────
  const instrumentLabels: Record<InstrumentName, string> = {
    kick:  t(language, 'kick'),
    snare: t(language, 'snare'),
    hihat: t(language, 'hihat'),
    clap:  t(language, 'clap'),
  };

  // ── Click handler — init audio first so sound plays even before Play ────────
  const handleCellClick = async (instrument: InstrumentName, step: number) => {
    await initAudio();
    toggleCell(instrument, step);
    triggerSound(instrument);
  };

  return (
    <div className="w-full overflow-x-auto pb-1">
      <div className="min-w-[580px]">

        {/* ── Step number header ──────────────────────────────────────────── */}
        <div className="flex mb-3 ml-[100px] gap-0.5">
          {Array.from({ length: NUM_STEPS }, (_, i) => {
            const isGroupStart = i % 4 === 0;
            return (
              <React.Fragment key={i}>
                {isGroupStart && i > 0 && <div className="w-1.5 shrink-0" />}
                <div
                  className={`
                    flex-1 text-center text-[10px] font-mono font-bold leading-none py-1
                    transition-all duration-75
                    ${currentStep === i
                      ? 'text-white scale-110'
                      : isGroupStart
                        ? 'text-gray-400'
                        : 'text-gray-600'
                    }
                  `}
                >
                  {i + 1}
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* ── Instrument rows ─────────────────────────────────────────────── */}
        <div className="space-y-1.5">
          {INSTRUMENTS.map((instrument) => (
            <div key={instrument.id} className="flex items-center gap-2">

              {/* Label */}
              <div
                className="w-[100px] shrink-0 flex items-center justify-end gap-2 pr-3"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: getInstrumentColor(instrument.id as InstrumentName) }}
                />
                <span
                  className="text-xs font-bold tracking-widest uppercase truncate"
                  style={{ color: getInstrumentColor(instrument.id as InstrumentName) }}
                >
                  {instrumentLabels[instrument.id as InstrumentName]}
                </span>
              </div>

              {/* Cells with group separators */}
              <div className="flex flex-1 gap-0.5">
                {Array.from({ length: NUM_STEPS }, (_, step) => {
                  const isGroupStart = step % 4 === 0;
                  return (
                    <React.Fragment key={step}>
                      {isGroupStart && step > 0 && (
                        <div className="w-1.5 shrink-0" />
                      )}
                      <BeatCell
                        instrument={instrument}
                        step={step}
                        isActive={grid[instrument.id]?.[step] ?? false}
                        isCurrentStep={currentStep === step}
                        onClick={() =>
                          handleCellClick(instrument.id as InstrumentName, step)
                        }
                      />
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
