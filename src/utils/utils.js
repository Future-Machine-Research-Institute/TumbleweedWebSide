import { store, read, remove } from "../third-party/persistence/persistence";

const accountKey = "AccountKey"
const passwordKey = "PasswordKey"
const tokenKey = "TokenKey"

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

const storeTokenKey = (valueString) => {
    store(tokenKey, valueString)
}

const readTokenKey = () => {
    return read(tokenKey)
}

const removeTokenKey = () => {
    remove(tokenKey)
}

export {
    storeAccount, 
    readAccount, 
    removeAccount, 
    storePassword, 
    readPassword, 
    removePassword,
    storeTokenKey,
    readTokenKey,
    removeTokenKey
}



