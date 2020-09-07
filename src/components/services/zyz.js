import axios from 'axios';
export default {
/**
 * 调度模块
 */
    // 订单列表
    dispatchList(data) {
        return axios({
            url: "/api/dispatch/search",
            method: "post",
            data: data
        }).then();
    },

    // 可领取条数
    receiveCount(token) {
        return axios({
            url: "/api/dispatch/receive_count",
            method: "post",
            data: {token}
        }).then();
    },
   
    // 提交领取
    receive(num, token) {
        return axios({
            url: "/api/dispatch/receive",
            method: "post",
            data: {num, token}
        }).then();
    },

    // 单个领取
    singleReceive(id, token) {
        return axios({
            url: "/api/dispatch/single_receive",
            method: "post",
            data: {id, token}
        }).then();
    },

    // 订单调度列表
    dispatchSearch(data) {
        return axios({
            url: "/api/dispatch/dispatch_search",
            method: "post",
            data: data
        }).then();
    },

    // 订单调度提交/ 编辑
    dispatchBtn(id, token) {
        return axios({
            url: "/api/dispatch/dispatch",
            method: "post",
            data: {id, token}
        }).then();
    },

    // 调度台账列表
    taiSearch(data) {
        return axios({
            url: "/api/dispatch/standing_book",
            method: "post",
            data: data
        }).then();
    },

    // 台账删除
    dispatchDel(id, token) {
        return axios({
            url: "/api/dispatch/del_dispatch",
            method: "post",
            data: {id, token}
        }).then();
    },

    // 操作人列表
    dispatchUser( token) {
        return axios({
            url: "/api/dispatch/userinfo",
            method: "post",
            data: { token}
        }).then();
    },



    // 获取经纬度
    getMap(address) {
        return axios({
            url: "http://restapi.amap.com/v3/geocode/geo?address=" + address +"&output=json&ak=0bv0bHO6rUhovY5DfwXPIzGx",
            method: "get",
        }).then();
    },
    //审核--订单列表
    search(data){
        return axios({
            url:"/api/examine/search",
            method:"post",
            data: data
        }).then();
    },
    //1.9 审核筛选信息
    screen_info(data){
        return axios({
            url:"/api/examine/screen_info",
            method:"post",
            data:data
        }).then();
    }
    ,
    // 可领取条数
    receive_count(token) {
        return axios({
            url: "/api/examine/receive_count",
            method: "post",
            data: {
                token
            }
        }).then();
    },

    // 提交领取
    examineReceive(data) {
        return axios({
            url: "/api/examine/receive",
            method: "post",
            data:data
        }).then();
    },
    // 提交领取
    single_receive(data) {
        return axios({
            url: "/api/examine/single_receive",
            method: "post",
            data:data
        }).then();
    },
    // 批量审核列表
    examine_search(token) {
        return axios({
            url: "/api/examine/examine_search",
            method: "post",
            data:
                token
        }).then();
    },
    // 审核--提交/编辑
    examine(data) {
        return axios({
            url: "/api/examine/examine",
            method: "post",
            data: data
        }).then();
    },
   
    // json 省市

    gettocity(){

        return axios({
            url: '../../../static/citys.json',
            method: "get",
        }).then();

    },

    // 台账列表
    standing_book(data) {
        return axios({
            url: "/api/examine/standing_book",
            method: "post",
            data: data
        }).then();
    },
    examine_info(data) {
        return axios({
            url: "/api/examine/examine_info",
            method: "post",
            data: data
        }).then();
    },

    




}