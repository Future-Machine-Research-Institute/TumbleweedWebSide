import axios from "axios";

axios.defaults.baseURL = "https://192.168.1.3"
axios.defaults.timeout = 30000;

const testUrl = "/users/test"
const tokenCheckUrl = "/users/authorize"
const userLoginUrl = "/users/login"

const packageUploadUrl = "/package/upload"
const packageObtainUrl = "/package/obtain"

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
                    timeout: 600000,
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

}

const NetApiShareInstance = new NetApi()
export default NetApiShareInstance