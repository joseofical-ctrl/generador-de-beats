export type Language = 'es' | 'en';

export const translations = {
  es: {
    appTitle: 'Beat Maker',
    appSubtitle: 'Generador de Beats',
    // Playback
    play: 'Reproducir',
    pause: 'Pausa',
    stop: 'Detener',
    playing: 'Reproduciendo',
    paused: 'Pausado',
    stopped: 'Detenido',
    // Tempo
    tempo: 'Tempo',
    bpm: 'BPM',
    // Beats
    saveBeat: 'Guardar Beat',
    loadBeat: 'Cargar Beat',
    savedBeats: 'Beats Guardados',
    beatName: 'Nombre del Beat',
    save: 'Guardar',
    cancel: 'Cancelar',
    load: 'Cargar',
    delete: 'Eliminar',
    noSavedBeats: 'No hay beats guardados',
    noSavedBeatsHint: 'Crea un ritmo y guárdalo para empezar.',
    clearGrid: 'Limpiar',
    // Instruments
    instruments: 'Instrumentos',
    steps: 'Pasos',
    kick: 'Bombo',
    snare: 'Caja',
    hihat: 'Hi-Hat',
    clap: 'Palmas',
    // Feedback
    beatSaved: '¡Beat guardado!',
    beatLoaded: '¡Beat cargado!',
    confirmDelete: '¿Eliminar este beat?',
    enterBeatName: 'Escribe un nombre...',
  },
  en: {
    appTitle: 'Beat Maker',
    appSubtitle: 'Beat Generator',
    // Playback
    play: 'Play',
    pause: 'Pause',
    stop: 'Stop',
    playing: 'Playing',
    paused: 'Paused',
    stopped: 'Stopped',
    // Tempo
    tempo: 'Tempo',
    bpm: 'BPM',
    // Beats
    saveBeat: 'Save Beat',
    loadBeat: 'Load Beat',
    savedBeats: 'Saved Beats',
    beatName: 'Beat Name',
    save: 'Save',
    cancel: 'Cancel',
    load: 'Load',
    delete: 'Delete',
    noSavedBeats: 'No saved beats',
    noSavedBeatsHint: 'Create a rhythm and save it to get started.',
    clearGrid: 'Clear',
    // Instruments
    instruments: 'Instruments',
    steps: 'Steps',
    kick: 'Kick',
    snare: 'Snare',
    hihat: 'Hi-Hat',
    clap: 'Clap',
    // Feedback
    beatSaved: 'Beat saved!',
    beatLoaded: 'Beat loaded!',
    confirmDelete: 'Delete this beat?',
    enterBeatName: 'Enter a name...',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(lang: Language, key: TranslationKey): string {
  return translations[lang][key];
}
