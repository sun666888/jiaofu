// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false
//包引用------start
//0.引入babel-polyfill,兼容Ie,将es6转为es5
import 'babel-polyfill'


//1.引入element-ui
import ElementUI from 'element-ui'
//默认样式
// import 'element-ui/lib/theme-chalk/index.css'
//自定义样式
import "../static/theme/theme-blue/index.css";
Vue.use(ElementUI)
//后引入路由,组件内样式可以覆盖elementui样式
import router from './router'

//2.引入axios
import axios from 'axios';
Vue.prototype.$http=axios;//将axios改写到vue原型属性,调用方式例如this.$http.post(xxx)
//3.引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

import audio from 'vue-mobile-audio'
Vue.use(audio)

// import BaiduMap from 'vue-baidu-map'
// // 百度地图
// Vue.use(BaiduMap, {
//   /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
//   ak: '0bv0bHO6rUhovY5DfwXPIzGx'
// })

import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '5d07f19b66c0d7b2e2a781de2b3698d5',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',  'AMap.polygon','AMap.PolyEditor', 'AMap.CircleEditor', 'Geocoder', 'DistrictSearch'],
  v: '1.4.4'
})

import Viewer from 'v-viewer' // 图片预览
import 'viewerjs/dist/viewer.css'
// // 使用图片预览
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    loop: false
  }
})

//4.引入ckeditor
// import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'

//5.引入moment,表格日期格式化
import moment from 'moment'
Vue.prototype.$moment=moment;//设置到vue原型属性,调用方式this.$moment(date).format("YYYY-MM-DD HH:mm:ss");


//包引用------end

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
