import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import zhCN from "./locales/zh-CN.json";

const storedLang = localStorage.getItem("lang");
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
