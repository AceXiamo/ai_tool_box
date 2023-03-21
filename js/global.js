import { host } from "@/js/request";
import { login } from "@/js/api";

const saveLoginRes = (res) => {
    uni.setStorageSync("user", res)
}

const loginVerify = () => {
    let res = getLoginUser()
    return res && res.token
}

const getLoginUser = () => {
    return uni.getStorageSync("user")
}

const updateCacheUser = (user) => {
    let res = getLoginUser()
    if (user.avatar) res.avatar = user.avatar
    res.nickname = user.nickname
    saveLoginRes(res)
}

const avatarHandle = (path) => {
    return host + '/file/view' + path
}

const loginHandle = () => {
    return new Promise(resolve => {
        uni.login({
            provider: "weixin",
            success: async (result) => {
                login({code: result.code}).then(res => {
                    saveLoginRes(res.data)
                    resolve()
                })
            },
        });
    })
}

export { saveLoginRes, loginVerify, getLoginUser, updateCacheUser, avatarHandle, loginHandle }
