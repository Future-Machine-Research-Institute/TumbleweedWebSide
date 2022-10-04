import axios from "axios";

const CancelToken = axios.CancelToken

axios.defaults.baseURL = "https://192.168.1.3"
axios.defaults.timeout = 30000;

axios.interceptors.response.use(response => {

}, error => {
    if (error.message === 'interrupt') {
        return new Promise(() => { })
    }
    return Promise.reject(error)
})

const tokenCheckUrl = "/users/authorize"
const userLoginUrl = "/users/login"

const packageUploadUrl = "/package/upload"
const packageObtainUrl = "/package/obtain"
const packageDeleteUrl = "/package/delete"
const packageUpdateUrl = "/package/update"

const userAddUrl = "/users/add"
const userDeleteUrl = "/users/delete"
const userListUrl = "/users/list"
const userUpdatePermissionUrl = "/users/updatePermission"

const userInformationUrl = "/users/information"

// const accountKey = "account"
// const passwordKey = "password"
// const tokenKey = "token"

class NetApi {

    #requestCancelTokenArray
    constructor() {
        this.#requestCancelTokenArray = []
    }

    cancel() {
        this.#requestCancelTokenArray.forEach((item) => {
            item('interrupt');
        })
    }

    checkToken(account, token) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {account: account, token: token}
                const config  = {
                    cancelToken: new CancelToken((cancel) => {
                        this.#requestCancelTokenArray.push(cancel)
                    })
                }
                axios.post(tokenCheckUrl, data, config).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    userLogin(account, password) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {account: account, password: password}
                const config  = {
                    cancelToken: new CancelToken((cancel) => {
                        this.#requestCancelTokenArray.push(cancel)
                    })
                }
                axios.post(userLoginUrl, data, config).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    packageUpload(formData, progressCallback) {
        return new Promise(async (resolve, reject) => {
            try {
                const config  = {
                    headers: {'Content-Type': 'multipart/form-data'},
                    timeout: 3600000,
                    cancelToken: new CancelToken((cancel) => {
                        this.#requestCancelTokenArray.push(cancel)
                    }),
                    onUploadProgress: (progressEvent) => {
                        if(progressEvent.lengthComputable && (progressCallback && typeof progressCallback === "function")) {
                            progressCallback(progressEvent.loaded / progressEvent.total)
                        }
                    }
                }
                axios.post(packageUploadUrl, formData, config).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    packageObtain(account, token, requiredCount, obtainedCount, queryConditions) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {
                    account: account, 
                    token: token,
                    requiredCount: requiredCount,
                    obtainedCount: obtainedCount,
                    queryConditions: queryConditions
                }
                const config  = {
                    cancelToken: new CancelToken((cancel) => {
                        this.#requestCancelTokenArray.push(cancel)
                    })
                }
                axios.post(packageObtainUrl, data, config).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    packageDelete(account, token, appIdArray) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {
                    account: account, 
                    token: token,
                    appIdArray: appIdArray
                }
                const config  = {
                    cancelToken: new CancelToken((cancel) => {
                        this.#requestCancelTokenArray.push(cancel)
                    })
                }
                axios.post(packageDeleteUrl, data, config).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    packageUpdate(formData, progressCallback) {
        return new Promise(async (resolve, reject) => {
            try {
                const config  = {
                    headers: {'Content-Type': 'multipart/form-data'},
                    timeout: 3600000,
                    cancelToken: new CancelToken((cancel) => {
                        this.#requestCancelTokenArray.push(cancel)
                    }),
                    onUploadProgress: (progressEvent) => {
                        if(progressEvent.lengthComputable && (progressCallback && typeof progressCallback === "function")) {
                            progressCallback(progressEvent.loaded / progressEvent.total)
                        }
                    }
                }
                axios.post(packageUpdateUrl, formData, config).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    userAdd(account, token, newName, newAccount, newPassword, permission) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {
                    account: account, 
                    token: token,
                    newName: newName,
                    newAccount: newAccount,
                    newPassword: newPassword,
                    permission: permission
                }
                const config  = {
                    cancelToken: new CancelToken((cancel) => {
                        this.#requestCancelTokenArray.push(cancel)
                    })
                }
                axios.post(userAddUrl, data, config).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    userDelete(account, token, accountArray) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {
                    account: account, 
                    token: token, 
                    accountArray: accountArray
                }
                const config  = {
                    cancelToken: new CancelToken((cancel) => {
                        this.#requestCancelTokenArray.push(cancel)
                    })
                }
                axios.post(userDeleteUrl, data, config).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    userList(account, token, queryConditions) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {
                    account: account, 
                    token: token, 
                    queryConditions: queryConditions
                }
                const config  = {
                    cancelToken: new CancelToken((cancel) => {
                        this.#requestCancelTokenArray.push(cancel)
                    })
                }
                axios.post(userListUrl, data, config).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    userUpdatePermission(account, token, updateAccount, updatePermission) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {
                    account: account, 
                    token: token, 
                    updateAccount: updateAccount,
                    updatePermission: updatePermission
                }
                const config  = {
                    cancelToken: new CancelToken((cancel) => {
                        this.#requestCancelTokenArray.push(cancel)
                    })
                }
                axios.post(userUpdatePermissionUrl, data, config).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    userInformation(account, token) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {account: account, token: token}
                const config  = {
                    cancelToken: new CancelToken((cancel) => {
                        this.#requestCancelTokenArray.push(cancel)
                    })
                }
                axios.post(userInformationUrl, data, config).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

}

const NetApiShareInstance = new NetApi()
export default NetApiShareInstance