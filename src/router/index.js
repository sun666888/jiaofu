import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/components/login.vue'),
      meta: { title: '登录页' }
    },
    {
      path: '/home',
      component: () => import('@/components/homepage/homepage.vue'),
      meta: {
        title: '母版页'
      },
      children: [
        /**
         * 调度管理
         */
        {
          path: '/dispatch',
          name: '订单列表',
          component: () => import('@/components/dispatch/dispatch'),
          meta: {
            title: '订单列表',
            role: ['管理','调度']
          }
        },
        {
          path: '/diaodu',
          name: '订单调度',
          component: () => import('@/components/dispatch/diaodu'),
          meta: {
            title: '订单调度',
            role: ['管理','调度']
          }
        },
        {
          path: '/taizhang',
          name: '调度台账',
          component: () => import('@/components/dispatch/taizhang'),
          meta: {
            title: '调度台账',
            role: ['管理','调度']
          }
        },
        /**
         * 审核管理
         */
        {
          path: '/examine',
          name: '订单审核',
          component: () => import('@/components/examine/examine'),
          meta: {
            title: '订单审核', 
            role: ['管理','审核']
          }
        },
        {
          path: '/examine-batch',
          name: '批量审核',
          component: () => import('@/components/examine/examine-batch'),
          meta: {
            title: '批量审核',
            role: ['管理','审核']
          }
        },
        {
          path: '/examine-finance',
          name: '审核台账',
          component: () => import('@/components/examine/examine-finance'),
          meta: {
            title: '审核台账',
            role: ['管理','审核']
          }
        },
        /**
         * 实名制
         */
        {
          path: '/scalping',
          name: '刷单列表',
          component: () => import('@/components/realName/scalping'),
          meta: {
            title: '刷单列表',
            role: ['管理','实名制']
          }
        },
        {
          path: '/realName',
          name: '实名制管理',
          component: () => import('@/components/realName/realName'),
          meta: {
            title: '实名制',
            role: ['管理','实名制']
          }
        },
        /**
         * 审核管理
         */
        {
          path: '/fixedNetwork',
          name: '固网综调',
          component: () => import('@/components/fixedNetwork/fixedNetwork'),
          meta: {
            title: '固网综调台账',
            role: ['管理','固网综调']
          }
        },
      ]
    },
    {
      name: '404',
      path: '/404',
      component: () => import('@/components/homepage/404.vue'),
      meta: { title: '路由不存在' }
    },
    {
      name: '403',
      path: '/403',
      component: () => import('@/components/homepage/403.vue'),
      meta: { title: '资源不可访问' }
    },
    // {
    //   path: '*',
    //   redirect: '/404'
    // }
  ],
  mode: 'hash'
})
/**
 * 全局路由守卫
 */
const rightPathList = ['/login', '/404', '/403'];//直接可以进入的页面
router.beforeEach((to, from, next) => {
  // debugger
  // console.log('跳转到:', to.fullPath);
  var token = sessionStorage.getItem('token');
  if (!token && to.path != '/login') {//登陆认证校验,没登录则跳转/login
    next({ path: '/login' })
  }
  else {//权限认证
    if (rightPathList.includes(to.path)) {
      next();
    }
    else if (hasPermit(to)) {
      next();
    }
    else {
      next('403');
    }
  }
})
/**
 * 请求拦截器,添加请求头token
 */
axios.interceptors.request.use(
  config => {
    // console.log(config)
    // console.log('>>>请求url:',config.url);
    var headers = config.headers;
    if (sessionStorage.getItem("token")) {
      headers.token = sessionStorage.getItem("token");
    }
    return config;
  },
  error => {
    // console.log('>>>请求异常:',error.message);
    return Promise.reject(error);
  });
//接口请求超时设置
axios.defaults.timeout=15000;//毫秒
/**
 * 应答拦截器,添加请求头token
 */
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // console.log(response.data);
  return response.data;
}, error=> {
  // Do something with response error
  // console.log('<<<异常信息:',error.message);
  return Promise.reject(error);
});


//获取当前路由是否有权限访问
function hasPermit(to) {
  var hasPermit = false;
  if (to.meta && to.meta.role) {
    var ruleList = getRuleList();
    hasPermit = ruleList.some(rule => {
      return to.meta.role.includes(rule);
    });
  }
  return hasPermit;

}
//获取登陆的角色集合
function getRuleList() {
  var ruleList = []; //角色数组
  var strRule = sessionStorage.getItem("position");
  if (strRule.indexOf("|") != -1) {
    ruleList = strRule.split("|");
  } else {
    ruleList.push(strRule);
  }
  return ruleList;
}

export default router
