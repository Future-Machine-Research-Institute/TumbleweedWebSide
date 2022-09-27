import axios from "axios";

axios.defaults.baseURL = "https://192.168.1.3"
axios.defaults.timeout = 30000;

const testUrl = "/users/test"
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

// const accountKey = "account"
// const passwordKey = "password"
// const tokenKey = "token"

class NetApi {

    constructor() {
        
    }

    test(data) {
        return new Promise(async (resolve, reject) => {
            try {
                axios.post(testUrl, data).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        })
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
                console.log("data: ", data)
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

}

const NetApiShareInstance = new NetApi()
export default NetApiShareInstance