import axios from 'axios';
export default {

/**
*  固网综调
*/
    // 列表
    guList(data) {
        return axios({
            url: "/api/fixed/search",
            method: "post",
            data: data
        }).then();
    },

    // 固网批量导入
    importData(data) {
        return axios({
            url: "/api/fixed/import",
            method: "post",
            data: data
        }).then();
    },

    // 固网编辑
    guEdit(data) {
        return axios({
            url: "/api/fixed/edit",
            method: "post",
            data: data
        }).then();
    },

    // 固网批量删除
    guDel(id, token) {
        return axios({
            url: "/api/fixed/del",
            method: "get",
            params: {id, token}
        }).then();
    },




}