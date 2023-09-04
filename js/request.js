import qs from 'qs'
import { getLoginUser, loginHandle } from "@/js/global";

const domain = "openai.xiamoqwq.com"
const host = "https://" + domain

// const domain = "localhost:8080"
// const host = "http://" + domain

const setAuth = (options) => {
    let user = getLoginUser()
    if (user) options.header = {
        Authorization: user.token,
        'Content-Type': 'application/json'
    }
}

let apiFlag = {}

const flagHandle = (url) => {
    apiFlag[url] = true
    setTimeout(() => {
        apiFlag[url] = false
    }, 500)
}



const request = {
    qs: qs,
    get: (url, params, toast) => {
        return new Promise(resolve => {
            if (apiFlag[url]) resolve({})
            let options = {
                url: '',
                method: "GET",
                success: res => {
                    flagHandle()
                    if (res.data.code == 401) {
                        loginHandle().then(() => {
                            setAuth(options)
                            uni.request(options)
                        })
                    } else {
                        resolve(res.data)
                    }
                }
            }
            setAuth(options)
            if (params) url = url + '?' + request.qs.stringify(params)
            options.url = url
            uni.request(options)
        })
    },
    post: (url, params, data, toast) => {
        return new Promise((resolve, reject) => {
            if (apiFlag[url]) resolve({})
            let options = {
                url: '',
                method: "POST",
                success: res => {
                    flagHandle()
                    if (res.data.code == 401) {
                        loginHandle().then(() => {
                            setAuth(options)
                            uni.request(options)
                        })
                    } else {
                        if (res.data.code === 500) {
                            toast.show({
                                text: res.data.msg
                            })
                            reject()
                        } else resolve(res.data)
                    }
                }
            }
            setAuth(options)
            if (params) url = url + '?' + request.qs.stringify(params)
            options.url = url
            if (data) options.data = data
            uni.request(options)
        })
    }
}

export { request, host }
