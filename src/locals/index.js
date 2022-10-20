import { createI18n } from "vue-i18n";
import zh from "./zh"
import en from "./en"
import { readLanguage, storeLanguage } from "../utils/utils";

const messages = {
    en,
    zh
}

const language = () => {
    if(readLanguage() !== null) {
        return readLanguage()
    }
    if(["en", "zh"].indexOf(navigator.language.toLocaleLowerCase().split('-')[0]) > -1) {
        storeLanguage(navigator.language.toLocaleLowerCase().split('-')[0])
        return navigator.language.toLocaleLowerCase().split('-')[0]
    } else {
        storeLanguage('en')
        return 'en'
    }
}
const i18n = createI18n({
    legacy: true,
    globalInjection: true,
    locale: language(),
    fallbackLocale: 'en',
    messages
})

export default i18n