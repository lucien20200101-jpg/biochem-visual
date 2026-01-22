import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import zhCN from "./locales/zh-CN/translation.json";

const storedLang = typeof localStorage !== "undefined"
  ? localStorage.getItem("lang")
  : null;
const browserLang = typeof navigator !== "undefined" ? navigator.language : "en";
const initialLang =
  storedLang ?? (browserLang.toLowerCase().startsWith("zh") ? "zh-CN" : "en");

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    "zh-CN": { translation: zhCN },
  },
  lng: initialLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
