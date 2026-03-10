'use client';

import React from 'react';
import { Instrument } from '@/types/beat';

interface BeatCellProps {
  instrument: Instrument;
  step: number;
  isActive: boolean;
  isCurrentStep: boolean;
  onClick: () => void;
}

const ACTIVE_STYLES: Record<string, string> = {
  kick:  'bg-violet-500 shadow-md shadow-violet-500/60 border-violet-400/80',
  snare: 'bg-cyan-400   shadow-md shadow-cyan-400/60   border-cyan-300/80',
  hihat: 'bg-emerald-400 shadow-md shadow-emerald-400/60 border-emerald-300/80',
  clap:  'bg-rose-400   shadow-md shadow-rose-400/60   border-rose-300/80',
};

const GROUP_INACTIVE = 'bg-gray-800/90 border-gray-600/50 hover:bg-gray-700/80 hover:border-gray-500/70';
const PLAIN_INACTIVE = 'bg-gray-800/50 border-gray-700/30 hover:bg-gray-700/60 hover:border-gray-600/50';

export default function BeatCell({
  instrument,
  step,
  isActive,
  isCurrentStep,
  onClick,
}: BeatCellProps) {
  const isGroupStart = step % 4 === 0;
  const activeStyle = ACTIVE_STYLES[instrument.id] ?? 'bg-gray-400 border-gray-300';

  let cellClass = '';

  if (isActive) {
    cellClass = `${activeStyle} ${isCurrentStep ? 'ring-2 ring-white/60 ring-offset-1 ring-offset-gray-950 scale-[1.08]' : ''}`;
  } else if (isCurrentStep) {
    cellClass = 'bg-gray-600/80 border-gray-400/60 ring-1 ring-white/20';
  } else if (isGroupStart) {
    cellClass = GROUP_INACTIVE;
  } else {
    cellClass = PLAIN_INACTIVE;
  }

  return (
    <button
      onClick={onClick}
      className={`
        flex-1 h-9 min-w-0 rounded-md border
        transition-all duration-75
        cursor-pointer
        active:scale-90
        ${cellClass}
      `}
      aria-label={`${instrument.id} step ${step + 1} ${isActive ? 'active' : 'inactive'}`}
      aria-pressed={isActive}
    />
  );
}
