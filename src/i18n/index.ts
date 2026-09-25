import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";

export const SUPPORTED_LANGUAGES = ["en", "fr", "de"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
    },
    lng: "en",
    fallbackLng: "en",
    supportedLngs: [...SUPPORTED_LANGUAGES],
    returnObjects: true,
    returnEmptyString: false,
    initAsync: false,

    react: { useSuspense: false },
    interpolation: { escapeValue: false },
  });
}

/**
 * French and German dictionaries are ~55 kB each. They are code-split so the
 * first visit only downloads the language actually being displayed.
 */
const loaders: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
  fr: () => import("./locales/fr.json"),
  de: () => import("./locales/de.json"),
};

const inflight = new Map<string, Promise<void>>();

export async function loadLanguage(lng: string) {
  if (lng === "en" || i18n.hasResourceBundle(lng, "translation")) return;
  const loader = loaders[lng];
  if (!loader) return;
  let pending = inflight.get(lng);
  if (!pending) {
    pending = loader().then((mod) => {
      i18n.addResourceBundle(lng, "translation", mod.default, true, true);
    });
    inflight.set(lng, pending);
  }
  await pending;
}

export async function setLanguage(lng: SupportedLanguage) {
  await loadLanguage(lng);
  if (i18n.resolvedLanguage !== lng) await i18n.changeLanguage(lng);
  if (typeof document !== "undefined") document.documentElement.lang = lng;
}

export function syncStoredLanguage() {
  if (typeof window === "undefined") return;

  const stored = window.localStorage.getItem("linguasupra-lang");
  const nextLanguage = (SUPPORTED_LANGUAGES as readonly string[]).includes(stored ?? "")
    ? (stored as SupportedLanguage)
    : "en";

  void setLanguage(nextLanguage);
}

export default i18n;
