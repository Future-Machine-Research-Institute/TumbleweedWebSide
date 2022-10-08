import axios from "axios";

const CancelToken = axios.CancelToken

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

const homeObtainUrl = "/home/obtain"

// const accountKey = "account"
// const passwordKey = "password"
// const tokenKey = "token"

class NetApi {

    #requestCancelTokenArray
    constructor() {
        this.#requestCancelTokenArray = []
        axios.defaults.baseURL = "https://192.168.1.3"
        axios.defaults.timeout = 30000
        axios.interceptors.request.use(config => {
            config['cancelToken'] = new CancelToken((cancel) => {
                this.#requestCancelTokenArray.push(cancel)
            })
            return config
        })
        axios.interceptors.response.use(response => {
            return response
        }, error => {
            if (error.message === 'interrupt') {
                return new Promise(() => { })
            }
            return Promise.reject(error)
        })
    }

    cancel() {
        this.#requestCancelTokenArray.forEach((item) => {
            item('interrupt');
        })
        this.#requestCancelTokenArray = []
    }

    checkToken(account, token) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {account: account, token: token}
                axios.post(tokenCheckUrl, data).then((res) => {
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
                axios.post(userLoginUrl, data).then((res) => {
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
                axios.post(packageObtainUrl, data).then((res) => {
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
                axios.post(packageDeleteUrl, data).then((res) => {
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
                axios.post(userAddUrl, data).then((res) => {
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
                axios.post(userDeleteUrl, data).then((res) => {
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
                axios.post(userListUrl, data).then((res) => {
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
                axios.post(userUpdatePermissionUrl, data).then((res) => {
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
                axios.post(userInformationUrl, data).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    homeObtain(account, token, requiredCount, obtainedCount, queryConditions) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {
                    account: account, 
                    token: token,
                    requiredCount: requiredCount,
                    obtainedCount: obtainedCount,
                    queryConditions: queryConditions
                }
                axios.post(homeObtainUrl, data).then((res) => {
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