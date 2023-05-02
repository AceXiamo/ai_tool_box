import { host, request, wsHost } from "@/js/request";

const login = (params) => {
    return request.post(host + "/wx/login", params)
}
const updateUserInfo = (data) => {
    return request.post(host + "/wx/update", '', data)
}
const aiSend = (data) => {
    return request.post(host + "/ai/send", '', data)
}
const history = (data) => {
    return request.post(host + "/ai/history", data)
}
const getConfig = (data) => {
    return request.post(host + "/another/config", data)
}

export {
    login,
    updateUserInfo,
    aiSend,
    history,
    getConfig
}
