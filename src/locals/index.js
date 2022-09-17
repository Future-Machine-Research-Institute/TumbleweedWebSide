import { createI18n } from "vue-i18n";
import zh from "./zh"
import en from "./en"
import { readLanguage } from "../utils/utils";

const messages = {
    en,
    zh
}

const language = (navigator.language || 'en').toLocaleLowerCase()
const i18n = createI18n({
    legacy: true,
    locale: readLanguage() || language.split('-')[0] || 'en',
    fallbackLocale: 'en',
    messages
})

export default i18n