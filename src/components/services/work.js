import axios from 'axios';
export default {

/**
* 管理员
*/
    // 管理员列表
    authList(data) {
        return axios({
            url: "/api/authUserList",
            method: "get",
            params: data
        }).then();
    },

    // 管理员列表
    roleList(token) {
        return axios({
            url: "/api/role_search",
            method: "get",
            params: {
                token
            }
        }).then();
    },

    // 管理员列表
    userSearch(data) {
        return axios({
            url: "/api/user/search",
            method: "post",
            data: data
        }).then();
    },
    
    // 管理员新增
    userCreate(data) {
        return axios({
            url: "/api/user/create",
            method: "post",
            data: data
        }).then();
    },

    // 管理员删除
    userRemove(id, token) {
        return axios({
            url: "/api/user/remove",
            method: "get",
            params: {
                id,
                token
            }
        }).then();
    },

/**
* 工时管理
*/
    // 员工新增
    employeeCreate(data) {
        return axios({
            url: "/api/employee/create",
            method: "post",
            data: data
        }).then();
    },

    // 员工列表
    employeeList(data) {
        return axios({
            url: "/api/employee/search",
            method: "post",
            data: data
        }).then();
    },

    // 工时登记 
    workingCreate(data) {
        return axios({
            url: "/api/working/create",
            method: "post",
            data: data
        }).then();
    },

    // 工时列表
    workingList(data) {
        return axios({
            url: "/api/working/search",
            method: "post",
            data: data
        }).then();
    },

    // 工时列表 导出
    workingExport(data) {
        return axios({
            url: "/api/working/export",
            method: "get",
        }).then();
    },

    // 排班列表
    scheduleList(data) {
        return axios({
            url: "/api/schedule/search",
            method: "post",
            data: data
        }).then();
    },

    // 排班提交
    scheduleCreate(data) {
        return axios({
            url: "/api/schedule/create",
            method: "post",
            data: data
        }).then();
    },

    // 小组列表
    groupSearch(token) {
        return axios({
            url: "/api/group/search",
            method: "post",
            data: {
                token
            }
        }).then();
    },

    // 小组详情
    groupDetail(id,token) {
        return axios({
            url: "/api/group/detail",
            method: "get",
            params: {
                id,
                token
            }
        }).then();
    },

    // 小组添加/编辑
    groupSave(data) {
        return axios({
            url: "/api/group/save",
            method: "post",
            data: data
        }).then();
    },

    // 小组删除
    groupRemove(id,token) {
        return axios({
            url: "/api/group/remove",
            method: "get",
            params: {
                id,
                token
            }
        }).then();
    },





/**
 * 报表管理
 */

  /**
   * 生产报表
   */
    
    // 个人统计
    productGeSearch(data) {
        return axios({
            url: "/api/product/search",
            method: "post",
            data: data
        }).then();
    },

    // 小时
    productHourSearch(data) {
        return axios({
            url: "/api/product/hour",
            method: "post",
            data: data
        }).then();
    },

    // 业务完成
    productBusinessSearch(data) {
        return axios({
            url: "/api/product/business",
            method: "post",
            data: data
        }).then();
    },

  /**
   * 财务报表
   */
    
    // 财务报表
    financeSearch(data) {
        return axios({
            url: "/api/account/search",
            method: "post",
            data: data
        }).then();
    },

  /**
   * 质检报表
   */
    
    // 质检报表
    qualitySearch(data) {
        return axios({
            url: "/api/quality/search",
            method: "post",
            data: data
        }).then();
    },

  /**
   * 全业务外呼
   */
    
    // 汇总
    businessSearch(data) {
        return axios({
            url: "/api/business/search",
            method: "post",
            data: data
        }).then();
    },

    // 单业务
    businessSingleSearch(data) {
        return axios({
            url: "/api/business/single",
            method: "post",
            data: data
        }).then();
    },

    // 成功明细
    businessSuccessSearch(data) {
        return axios({
            url: "/api/business/success",
            method: "post",
            data: data
        }).then();
    },

}