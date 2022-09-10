import axios from "axios";

axios.defaults.baseURL = "https://192.168.1.3"

class NetApi {

    #testUrl = "/users/test"

    constructor() {
        
    }

    test(data) {
        return new Promise(async (resolve, reject) => {
            try {
                axios.post(this.#testUrl, data).then((res) => {
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