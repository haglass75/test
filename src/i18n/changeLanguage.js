import i18n, { SUPPORTED_LANGUAGES } from "./index.js";

export function changeLanguage(lang) {
  try {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      console.log("changeLanguage 함수 호출:", lang);

      // i18n locale 변경
      i18n.global.locale.value = lang;

      // localStorage 저장
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("language", lang);
      }

      console.log("changeLanguage 완료:", lang);
    } else {
      console.warn(`Unsupported language: ${lang}`);
    }
  } catch (error) {
    console.error("changeLanguage 오류:", error);
  }
}
