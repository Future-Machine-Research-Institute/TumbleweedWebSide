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
            reader.readAsArrayBuffer(file)
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
    const date = new Date(localTimeStamp)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0'+ (date.getMonth()+1):date.getMonth()+1) + '-'
    const D = (date.getDate() < 10 ? '0'+ date.getDate():date.getDate()) + ' '
    const h = (date.getHours() < 10 ? '0'+ date.getHours():date.getHours()) + ':'
    const m = (date.getMinutes() < 10 ? '0'+ date.getMinutes():date.getMinutes()) + ':'
    const s = date.getSeconds() < 10 ? '0'+ date.getSeconds():date.getSeconds()
    return Y + M + D + h + m + s
}

// ios === 0 android === 1 pc === 2
const platform = () => {
    const u = navigator.userAgent
    // const isPc = u.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    let isPc = true
    let agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
    for (let i in agents) {
        if (u.indexOf(agents[i]) > -1) {
            isPc = false
            break
        }
    }
    const isIos = (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) ||  (u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1) || (u.indexOf("iPad") > -1)
    if(isPc === true) {
        return 2
    } else {
        if(isIos === true) {
            return 0
        } else {
            return 1
        }
    }
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
    transformUTCTimeStampToLocalTime,
    platform
}



