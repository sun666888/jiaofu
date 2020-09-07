import axios from 'axios';
export default {

/**
* 实名制
*/
    // 实名制列表
    realList(data) {
        return axios({
            url: "/api/real/search",
            method: "post",
            data: data
        }).then();
    },

    // 实名制编辑
    realModify(data) {
        return axios({
            url: "/api/real/modify",
            method: "post",
            data: data
        }).then();
    },

    // 实名制删除
    realRemove(id, token) {
        return axios({
            url: "/api/real/remove",
            method: "get",
            params: {id, token}
        }).then();
    },

    // 渠道
    realChannel() {
        return axios({
            url: "/api/channel",
            method: "get",
        }).then();
    },

    // 导入实名制模板
    upload(data) {
        return axios({
            url: "/api/upload",
            method: "post",
            data: data
        }).then();
    },

    // 导入实名制模板
    importData(data) {
        return axios({
            url: "/api/real/import",
            method: "post",
            data: data
        }).then();
    },

    // 导入列表
    resultData(data) {
        return axios({
            url: "/api/import/result",
            method: "post",
            data: data
        }).then();
    },

    // 导入删除
    resultDel(id, token, type) {
        return axios({
            url: "/api/import/remove",
            method: "get",
            params: {id, token, type}
        }).then();
    },

    // 刷单列表
    shuaList(data) {
        return axios({
            url: "/api/refresh/search",
            method: "post",
            data: data
        }).then();
    },  

    // 刷单处理
    shuaHandle(id, token) {
        return axios({
            url: "/api/refresh/handled",
            method: "post",
            data: {id, token}
        }).then();
    },
    



}