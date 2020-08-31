import axios from 'axios';
export default {
/**
* 财务管理 ----生产报送
*/
    // 财务通用项目名称
    caiName(token) {
        return axios({
            url: "/api/Finance/fina_name",
            method: "post",
            data: {
                token
            }
        }).then();
    },
    
    // 高端专属项目名称
    gaoName(token) {
        return axios({
            url: "/api/Exclusive/excl_name",
            method: "post",
            data: {
                token
            }
        }).then();
    },

    // 4G副卡项目名称
    fuName(token) {
        return axios({
            url: "/api/Subcard/sub_name",
            method: "post",
            data: {
                token
            }
        }).then();
    },
    
    // 卡槽项目名称
    cardName(token) {
        return axios({
            url: "/api/Cardslot/card_name",
            method: "post",
            data: {
                token
            }
        }).then();
    },

    // 上传文件
    upload(data) {
        return axios({
            url: "/api/upload",
            method: "post",
            data: data
        }).then();
    },

    // 导入数据
    importData(data) {
        return axios({
            url: "/api/Finance/import",
            method: "post",
            data: data
        }).then();
    },

    // 查询文件批次
    financeSearch(data) {
        return axios({
            url: "/api/Finance/search",
            method: "post",
            data: data
        }).then();
    },

    // 删除文件批次
    financeDel(data) {
        return axios({
            url: "/api/Finance/del_file",
            method: "post",
            data: data
        }).then();
    },

/**
* 财务管理 ----开户池
*/

  /**
   * 查询
   */

    // 查询开户池--账务通用
    openSearch(data) {
        return axios({
            url: "/api/Finance/fina_search",
            method: "post",
            data: data
        }).then();
    },

    // 查询开户池--卡槽
    openCardSearch(data) {
        return axios({
            url: "/api/Cardslot/card_search",
            method: "post",
            data: data
        }).then();
    },


    // 查询开户池--4G副卡
    openFuSearch(data) {
        return axios({
            url: "/api/Subcard/sub_search",
            method: "post",
            data: data
        }).then();
    },

    // 查询开户池--高端专属
    openGaoSearch(data) {
        return axios({
            url: "/api/Exclusive/excl_search",
            method: "post",
            data: data
        }).then();
    },

  /**
   * 单个录入---添加
   */

    // 单个录入--账务通用
    openSingle(data) {
        return axios({
            url: "/api/Finance/fina_single",
            method: "post",
            data: data
        }).then();
    },

    // 单个录入--卡槽
    openCardSingle(data) {
        return axios({
            url: "/api/Cardslot/card_single",
            method: "post",
            data: data
        }).then();
    },


    // 单个录入--4G副卡
    openFuSingle(data) {
        return axios({
            url: "/api/Subcard/sub_single",
            method: "post",
            data: data
        }).then();
    },

    // 单个录入--高端专属
    openGaoSingle(data) {
        return axios({
            url: "/api/Exclusive/excl_single",
            method: "post",
            data: data
        }).then();
    },

  /**
   * 删除
   */

    // 删除开户池--账务通用
     openDel(id, token) {
        return axios({
            url: "/api/Finance/del_fina",
            method: "post",
            data: {
                id,
                token
            }
        }).then();
    },

    // 删除开户池--卡槽
    openCardDel(id, token) {
        return axios({
            url: "/api/Cardslot/del_card",
            method: "post",
            data: {
                id,
                token
            }
        }).then();
    },


    // 删除开户池--4G副卡
    openFuDel(id, token) {
        return axios({
            url: "/api/Subcard/del_sub",
            method: "post",
            data: {
                id,
                token
            }
        }).then();
    },

    // 删除开户池--高端专属
    openGaoDel(id, token) {
        return axios({
            url: "/api/Exclusive/del_excl",
            method: "post",
            data: {
                id,
                token
            }
        }).then();
    },

  /**
   * 分配
   */

    // 分配开户池--账务通用
    openFen(data) {
        return axios({
            url: "/api/Finance/distribution",
            method: "post",
            data: data
        }).then();
    },

    // 分配开户池--卡槽
    openCardFen(data) {
        return axios({
            url: "/api/Cardslot/distribution",
            method: "post",
            data: data
        }).then();
    },


    // 分配开户池--4G副卡
    openFuFen(data) {
        return axios({
            url: "/api/Subcard/distribution",
            method: "post",
            data: data
        }).then();
    },

    // 分配开户池--高端专属
    openGaoFen(data) {
        return axios({
            url: "/api/Exclusive/distribution",
            method: "post",
            data: data
        }).then();
    },

  /**
   * 开户详情
   */
    
    // 开户详情--账务通用
    openInfo(id,token) {
        return axios({
            url: "/api/Finance/open_info",
            method: "post",
            data: {
                id,
                token
            }
        }).then();
    },

    // 开户详情--卡槽
    openCardInfo(id,token) {
        return axios({
            url: "/api/Cardslot/open_info",
            method: "post",
            data: {
                id,
                token
            }
        }).then();
    },


    // 开户详情--4G副卡
    openFuInfo(id,token) {
        return axios({
            url: "/api/Subcard/open_info",
            method: "post",
            data: {
                id,
                token
            }
        }).then();
    },

    // 开户详情--高端专属
    openGaoInfo(id,token) {
        return axios({
            url: "/api/Exclusive/open_info",
            method: "post",
            data: {
                id,
                token
            }
        }).then();
    },

  /**
   * 开户取消
   */
    
    // 开户取消--账务通用
    openCancel(id,token) {
        return axios({
            url: "/api/Finance/cancel_info",
            method: "post",
            data: {
                id,
                token
            }
        }).then();
    },

    // 开户取消--卡槽
    openCardCancel(id,token) {
        return axios({
            url: "/api/Cardslot/cancel_info",
            method: "post",
            data: {
                id,
                token
            }
        }).then();
    },


    // 开户取消--4G副卡
    openFuCancel(id,token) {
        return axios({
            url: "/api/Subcard/cancel_info",
            method: "post",
            data: {
                id,
                token
            }
        }).then();
    },

    // 开户取消--高端专属
    openGaoCancel(id,token) {
        return axios({
            url: "/api/Exclusive/cancel_info",
            method: "post",
            data: {
                id,
                token
            }
        }).then();
    },

  /**
   * 开户提交
   */

    // 开户提交--账务通用
    openSub(data) {
        return axios({
            url: "/api/Finance/open_fina",
            method: "post",
            data: data
        }).then();
    },

    // 开户提交--卡槽
    openCardSub(data) {
        return axios({
            url: "/api/Cardslot/open_card",
            method: "post",
            data: data
        }).then();
    },


    // 开户提交--4G副卡
    openFuSub(data) {
        return axios({
            url: "/api/Subcard/open_sub",
            method: "post",
            data: data
        }).then();
    },

    // 开户提交--高端专属
    openGaoSub(data) {
        return axios({
            url: "/api/Exclusive/open_excl",
            method: "post",
            data: data
        }).then();
    },


/**
* 财务管理 ----回访池
*/

  /**
   * 查询
   */

    // 查询回访池--账务通用
    returnSearch(data) {
        return axios({
            url: "/api/Finance/return_search",
            method: "post",
            data: data
        }).then();
    },

    // 查询回访池--卡槽
    returnCardSearch(data) {
        return axios({
            url: "/api/Cardslot/return_search",
            method: "post",
            data: data
        }).then();
    },


    // 查询回访池--4G副卡
    returnFuSearch(data) {
        return axios({
            url: "/api/Subcard/return_search",
            method: "post",
            data: data
        }).then();
    },

    // 查询回访池--高端专属
    returnGaoSearch(data) {
        return axios({
            url: "/api/Exclusive/return_search",
            method: "post",
            data: data
        }).then();
    },
    
  /**
   * 需回访 告知退单  回访提交
   */

    // 需回访 告知退单--账务通用
    returnSuba(data) {
        return axios({
            url: "/api/Finance/suba",
            method: "post",
            data: data
        }).then();
    },

    // 需回访 告知退单--卡槽
    returnCardSuba(data) {
        return axios({
            url: "/api/Cardslot/suba",
            method: "post",
            data: data
        }).then();
    },


    // 需回访 告知退单--4G副卡
    returnFuSuba(data) {
        return axios({
            url: "/api/Subcard/suba",
            method: "post",
            data: data
        }).then();
    },

    // 需回访 告知退单--高端专属
    returnGaoSuba(data) {
        return axios({
            url: "/api/Exclusive/suba",
            method: "post",
            data: data
        }).then();
    },

  /**
   * 需回访 正常回访  回访提交
   */

    // 需回访 正常回访--账务通用
    returnSubb(data) {
        return axios({
            url: "/api/Finance/subb",
            method: "post",
            data: data
        }).then();
    },

    // 需回访 正常回访--卡槽
    returnCardSubb(data) {
        return axios({
            url: "/api/Cardslot/subb",
            method: "post",
            data: data
        }).then();
    },


    // 需回访 正常回访--4G副卡
    returnFuSubb(data) {
        return axios({
            url: "/api/Subcard/subb",
            method: "post",
            data: data
        }).then();
    },

    // 需回访 正常回访--高端专属
    returnGaoSubb(data) {
        return axios({
            url: "/api/Exclusive/subb",
            method: "post",
            data: data
        }).then();
    },

  /**
   * 账务跟进  回访提交
   */

    // 账务跟进--账务通用
    returnSubc(data) {
        return axios({
            url: "/api/Finance/subc",
            method: "post",
            data: data
        }).then();
    },

    // 账务跟进--卡槽
    returnCardSubc(data) {
        return axios({
            url: "/api/Cardslot/subc",
            method: "post",
            data: data
        }).then();
    },


    // 账务跟进--4G副卡
    returnFuSubc(data) {
        return axios({
            url: "/api/Subcard/subc",
            method: "post",
            data: data
        }).then();
    },

    // 账务跟进--高端专属
    returnGaoSubc(data) {
        return axios({
            url: "/api/Exclusive/subc",
            method: "post",
            data: data
        }).then();
    },

/**
* 财务管理 ----订单拦截
*/

  /**
   * 拦截提交
   */

    // 拦截提交--账务通用
    interceptSub(data) {
        return axios({
            url: "/api/Finance/intercept_sub",
            method: "post",
            data: data
        }).then();
    },

    // 拦截提交--卡槽
    interceptCardSub(data) {
        return axios({
            url: "/api/Cardslot/intercept_sub",
            method: "post",
            data: data
        }).then();
    },

    // 拦截提交--4G副卡
    interceptFuSub(data) {
        return axios({
            url: "/api/Subcard/intercept_sub",
            method: "post",
            data: data
        }).then();
    },

    // 拦截提交--高端专属
    interceptGaoSub(data) {
        return axios({
            url: "/api/Exclusive/intercept_sub",
            method: "post",
            data: data
        }).then();
    },


/**
 * 质检管理
 */

    // 一检查询
    checkOneSearch(data) {
        return axios({
            url: "/api/check/check_search",
            method: "post",
            data: data
        }).then();
    },

    // 一检删除  
    checkDel(id, token) {
        return axios({
            url: "/api/check/del_check",
            method: "post",
            data: {
                id,
                token
            }
        }).then();
    },

    // 一检导入提交
    checkOneImport(data) {
        return axios({
            url: "/api/check/import",
            method: "post",
            data: data
        }).then();
    },

    // 手动录入提交
    checkAdd(data) {
        return axios({
            url: "/api/check/first_add ",
            method: "post",
            data: data
        }).then();
    },

    // 质检批次查询  -- 导入结果
    checkSearch(data) {
        return axios({
            url: "/api/check/search",
            method: "post",
            data: data
        }).then();
    },

    // 质检批次删除  
    checkDelFile(id, token) {
        return axios({
            url: "/api/check/del_file",
            method: "post",
            data: {
                id,
                token
            }
        }).then();
    },

    // 二检查询
    checkTwoSearch(data) {
        return axios({
            url: "/api/check/check_b_search",
            method: "post",
            data: data
        }).then();
    },

    // 质检回退查询
    checkBackSearch(data) {
        return axios({
            url: "/api/check/back_search",
            method: "post",
            data: data
        }).then();
    },

     // 回退提交
     checkBackSub(data) {
        return axios({
            url: "/api/check/back_sub",
            method: "post",
            data: data
        }).then();
    },

    // 质检总表查询
    checkTotalSearch(data) {
        return axios({
            url: "/api/check/total_search",
            method: "post",
            data: data
        }).then();
    },

    // 一检详情
    checkInfo(id, token) {
        return axios({
            url: "/api/check/check_info",
            method: "post",
            data: {
                id,
                token
            }
        }).then();
    },

    // 一检提交
    checkSub(data) {
        return axios({
            url: "/api/check/first_sub",
            method: "post",
            data: data
        }).then();
    },

    // 二检详情
    checkTwoInfo(id, token) {
        return axios({
            url: "/api/check/check_b_info",
            method: "post",
            data: {
                id,
                token
            }
        }).then();
    },

    // 二检提交
    checkTwoSub(data) {
        return axios({
            url: "/api/check/two_sub",
            method: "post",
            data: data
        }).then();
    },

   
    




}