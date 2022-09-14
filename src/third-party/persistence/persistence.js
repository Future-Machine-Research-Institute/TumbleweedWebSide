

const store = (keyString, valueString) => {
    if(!window.localStorage) {
        
    } else {
        window.localStorage.setItem(keyString, valueString)
    }
}

const read = (keyString) => {
    if(!window.localStorage) {
        return null
    } else {
        return window.localStorage.getItem(keyString)
    }
}

const remove = (keyString) => {
    if(!window.localStorage) {
        
    } else {
        window.localStorage.removeItem(keyString)
    }
}

export {store, read, remove}