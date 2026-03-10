import { create } from 'zustand';
import { Language } from '@/lib/translations';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const STORAGE_KEY = 'beat-maker-language';

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: 'es',

  setLanguage: (lang) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
    set({ language: lang });
  },

  toggleLanguage: () => {
    const current = get().language;
    const next = current === 'es' ? 'en' : 'es';
    get().setLanguage(next);
  },
}));

// Initialize from localStorage on client
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (saved === 'es' || saved === 'en') {
    useLanguageStore.setState({ language: saved });
  }
}
