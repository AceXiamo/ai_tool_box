import { host, request } from "@/js/request";

const login = (params, toast) => {
    return request.post(host + "/wx/login", params, null, toast)
}
const updateUserInfo = (data, toast) => {
    return request.post(host + "/wx/update", null, data, toast)
}
const aiSend = (data, toast) => {
    return request.post(host + "/ai/send", null, data, toast)
}
const history = (params, toast) => {
    return request.post(host + "/ai/history", params, null, toast)
}
const getConfig = (params, toast) => {
    return request.post(host + "/another/config", params, null, toast)
}

export {
    login,
    updateUserInfo,
    aiSend,
    history,
    getConfig
}
