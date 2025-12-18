import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Traducciones (las crearemos en el siguiente paso)
import en from "./locales/en.json";
import es from "./locales/es.json";

export const resources = {
    en: {
        translation: en,
    },
    es: {
        translation: es,
    },
} as const;

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "es",          // idioma por defecto
        fallbackLng: "en",  // si falla, usa inglés
        interpolation: {
            escapeValue: false, // React ya escapa XSS
        },
    });

export default i18n;
