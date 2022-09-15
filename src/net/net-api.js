import axios from "axios";

axios.defaults.baseURL = "https://192.168.1.3"
axios.defaults.timeout = 30000;

const testUrl = "/users/test"
const checkTokenUrl = "/users/authorize"

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
                let data = {"account": account, "token": token}
                axios.post(checkTokenUrl, data).then((res) => {
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