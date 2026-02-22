import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import pl from "./locales/pl.json";
import en from "./locales/en.json";

export const LANGUAGES = [
  { code: "pl", name: "Polski" },
  { code: "en", name: "English" },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pl: { translation: pl },
      en: { translation: en },
    },
    fallbackLng: "pl",
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

i18n.on("languageChanged", (lng) => {
  if (typeof document !== "undefined" && document.documentElement) {
    document.documentElement.lang = lng?.split("-")[0] || "pl";
  }
});

if (typeof document !== "undefined" && document.documentElement) {
  document.documentElement.lang = i18n.language?.split("-")[0] || "pl";
}

export default i18n;
