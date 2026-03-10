'use client';

import React from 'react';
import { useLanguageStore } from '@/store/languageStore';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguageStore();

  return (
    <button
      onClick={toggleLanguage}
      aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      className="relative flex items-center gap-1 px-3 py-1.5 rounded-full
        bg-gray-800/70 border border-gray-700/50
        hover:border-gray-500/70 hover:bg-gray-700/60
        transition-all duration-200 text-sm font-bold tracking-wider
        overflow-hidden select-none"
    >
      <span className={`relative z-10 transition-colors duration-200 ${language === 'es' ? 'text-white' : 'text-gray-500'}`}>
        ES
      </span>
      <span className="relative z-10 text-gray-600 mx-0.5">|</span>
      <span className={`relative z-10 transition-colors duration-200 ${language === 'en' ? 'text-white' : 'text-gray-500'}`}>
        EN
      </span>

      {/* Sliding highlight pill */}
      <span
        className={`
          absolute top-0.5 bottom-0.5 w-7 rounded-full bg-violet-600/40
          transition-all duration-300 ease-out
          ${language === 'es' ? 'left-0.5' : 'left-[calc(100%-1.875rem)]'}
        `}
      />
    </button>
  );
}
