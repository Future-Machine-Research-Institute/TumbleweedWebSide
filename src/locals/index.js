import { createI18n } from "vue-i18n";
import zh from "./zh"
import en from "./en"
import { read } from "../third-party/persistence/persistence";

const messages = {
    en,
    zh
}

const language = (navigator.language || 'en').toLocaleLowerCase()
const i18n = createI18n({
    legacy: true,
    locale: read('lang') || language.split('-')[0] || 'en',
    fallbackLocale: 'en',
    messages
})

export default i18n