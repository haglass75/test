import i18n, { SUPPORTED_LANGUAGES } from "./index.js";

export function changeLanguage(lang) {
  if (SUPPORTED_LANGUAGES.includes(lang)) {
    i18n.global.locale.value = lang;

    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  }
}
