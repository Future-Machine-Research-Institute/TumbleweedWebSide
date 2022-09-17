import { store, read, remove } from "../third-party/persistence/persistence";
import md5 from "js-md5";

const accountKey = "AccountKey"
const passwordKey = "PasswordKey"
const tokenKey = "TokenKey"
const languageKey = "LanguageKey"

const storeAccount = (valueString) => {
    store(accountKey, valueString)
}

const readAccount = () => {
    return read(accountKey)
}

const removeAccount = () => {
    remove(accountKey)
}

const storePassword = (valueString) => {
    store(passwordKey, valueString)
}

const readPassword = () => {
    return read(passwordKey)
}

const removePassword = () => {
    remove(passwordKey)
}

const storeToken = (valueString) => {
    store(tokenKey, valueString)
}

const readToken = () => {
    return read(tokenKey)
}

const removeToken = () => {
    remove(tokenKey)
}

const md5HashSync = (rawString) => {
    return md5(rawString)
}

const storeLanguage = (valueString) => {
    store(languageKey, valueString)
}

const readLanguage = () => {
    return read(languageKey)
}

const removeLanguage = () => {
    remove(languageKey)
}

export {
    storeAccount, 
    readAccount, 
    removeAccount, 
    storePassword, 
    readPassword, 
    removePassword,
    storeToken,
    readToken,
    removeToken,
    md5HashSync,
    storeLanguage,
    readLanguage,
    removeLanguage
}



