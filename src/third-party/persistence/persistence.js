

const store = (keyString, valueString) => {
    if(!window.localStorage) {
        throw new Error("window.localStorage is undefined")
    } else {
        window.localStorage.setItem(keyString, valueString)
    }
}

const read = (keyString) => {
    if(!window.localStorage) {
        throw new Error("window.localStorage is undefined")
        // return null
    } else {
        return window.localStorage.getItem(keyString)
    }
}

const remove = (keyString) => {
    if(!window.localStorage) {
        throw new Error("window.localStorage is undefined")
    } else {
        window.localStorage.removeItem(keyString)
    }
}

export {store, read, remove}