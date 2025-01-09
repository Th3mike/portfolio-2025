import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import pt from './pt.json';

// Obtém a língua salva do localStorage ou define 'pt' como padrão
const savedLanguage = localStorage.getItem('language') || 'pt';  // Usa 'pt' como padrão se não houver valor salvo

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    pt: {
      translation: pt,
    },
  },
  lng: savedLanguage,  // Usa o idioma salvo ou o padrão 'pt'
  fallbackLng: 'pt',   // Define 'pt' como fallback
  interpolation: {
    escapeValue: false, // React já faz escaping de forma segura
  },
});

export default i18n;
