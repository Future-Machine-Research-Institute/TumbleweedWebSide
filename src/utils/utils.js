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

const md5FromFile = async (file) => {
    return new Promise(async (resolve, reject) => {
        try {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file, 'utf-8')
            reader.onload = (e) => {
                return resolve(md5(e.target.result))
            }
        } catch (error) {
            return reject(error)
        }
    })
}

const getUTCTimeStamp = () => {
    const time = new Date()
    const localTimeStamp = time.getTime()
    const localOffset = time.getTimezoneOffset() * 60000
    const utcTimeStamp = localTimeStamp + localOffset
    return utcTimeStamp
}

const transformUTCTimeStampToLocalTime = (utcTimeStamp) => {
    const time = new Date()
    const localOffset = time.getTimezoneOffset() * 60000
    const localTimeStamp = utcTimeStamp - localOffset
    const date = new Date(localTimeStamp);
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
    const D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
    const h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
    const m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
    const s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
    return Y + M + D + h + m + s
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
    removeLanguage,
    md5FromFile,
    getUTCTimeStamp,
    transformUTCTimeStampToLocalTime
}



