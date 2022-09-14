import { store, read, remove } from "../third-party/persistence/persistence";

const accountKey = "AccountKey"
const passwordKey = "PasswordKey"

const storeAccount = (valueString) => {
    store(accountKey, valueString)
}

const readAccount = () => {
    read(accountKey)
}

const removeAccount = () => {
    remove(accountKey)
}

const storePassword = (valueString) => {
    store(passwordKey, valueString)
}

const readPassword = () => {
    read(passwordKey)
}

const removePassword = () => {
    remove(passwordKey)
}

export {storeAccount, readAccount, removeAccount, storePassword, readPassword, removePassword}



