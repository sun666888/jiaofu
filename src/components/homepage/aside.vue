<template>
  <!-- 没用el-aside因为自带300宽度 -->
  <div class="_aside">
    <el-menu
      :default-active="onRoutes"
      :collapse="navShow"
      class="el-menu-vertical-demo menu"
      unique-opened
      router
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-for="(menu_one,i) in menuData">
        <el-submenu v-if="getPermitMenus(menu_one.subs).length>0"  :key="i" :index="menu_one.path">
          <template slot="title">
            <i :class="menu_one.icon"></i>
            <span>{{menu_one.title}}</span>
          </template>

          <el-menu-item
            v-for="(menu_two,i) in getPermitMenus(menu_one.subs)"
            :key="i"
            :index="menu_two.path"
          >
            <i :class="menu_two.icon"></i>
            <span>{{menu_two.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<style lang="scss">
._aside {
  .menu {
    height: 100%;
  }
  .menu:not(.el-menu--collapse) {
    //设置才可以有折叠特效
    width: 200px;
  }
}
</style>

<script>
import bus from "../common/bus";
export default {
  data() {
    return {
      navShow: false, //导航是否折叠
      menuData: [
        {
          icon: "el-icon-star-on",
          path: "p_examine",
          title: "审核管理",
          subs: [
            {
              page: true,
              path: "examine",
              title: "订单列表",
              icon: "el-icon-document"
            },
            {
              page: true,
              path: "examine-batch",
              title: "批量审核",
              icon: "el-icon-document"
            },
            {
              page: true,
              path: "examine-finance",
              title: "审核台账",
              icon: "el-icon-document"
            },
          ]
        },
        {
          icon: "el-icon-star-on",
          path: "p_dispatch",
          title: "调度管理",
          subs: [
            {
              page: true,
              path: "dispatch",
              title: "订单列表",
              icon: "el-icon-document"
            },
            {
              page: true,
              path: "diaodu",
              title: "订单调度",
              icon: "el-icon-document"
            },
            {
              page: true,
              path: "taizhang",
              title: "调度台账",
              icon: "el-icon-document"
            },
          ]
        },
        {
          icon: "el-icon-star-on",
          path: "p_realName",
          title: "实名制管理",
          subs: [
            {
              page: true,
              path: "scalping",
              title: "刷单列表",
              icon: "el-icon-document"
            },
            {
              page: true,
              path: "realName",
              title: "实名制",
              icon: "el-icon-document"
            },
          ]
        },
        {
          icon: "el-icon-star-on",
          path: "p_fixedNetwork",
          title: "固网综调",
          subs: [
            {
              page: true,
              path: "fixedNetwork",
              title: "固网综调台账",
              icon: "el-icon-document"
            },
          ]
        },
      ]
    };
  },
  created() {
    var permitPathList = this.getPermitPathList();
    this.setMenuPermit(this.menuData, permitPathList); //注意:必须写到created中,先初始化menuData值再渲染页面
    bus.$on("navShowChange", navShow => {
      this.navShow = navShow;
    });
  },
  mounted() {},
  methods: {
    //获取带权限的菜单
    getPermitMenus(menuList) {
      return menuList.filter(item => {
        return item.hasPermit == true;
      });
    },
    //给菜单设置权限
    setMenuPermit(menuList, permitPathList) {
      for (var i = 0; i < menuList.length; i++) {
        var menu = menuList[i];
        if (menu.page && menu.path) {
          //如果打开页面的菜单
          var hasPermit = permitPathList.some(permitPath => {
            return permitPath == "/" + menu.path;
          });
          menu.hasPermit = hasPermit;
        }
        if (menu.subs) {
          this.setMenuPermit(menu.subs, permitPathList);
        }
      }
    },
    //获取有权限的path集合
    getPermitPathList() {
      var ruleList = this.getRuleList();
      var homeChilds = this.getHomeChilds();
      var pathList = []; //有权限的path
      for (var i = 0; i < homeChilds.length; i++) {
        var route = homeChilds[i];
        if (route.meta && route.meta.role) {
          var routeRoles = route.meta.role;
          var hasPermission = ruleList.some(item => {
            return routeRoles.includes(item);
          });
          if (hasPermission && !pathList.includes(route.path)) {
            pathList.push(route.path);
          }
        }
      }
      return pathList;
    },
    //获取子路由
    getHomeChilds() {
      var routes = this.$router.options.routes;
      var homeRoute = routes.find(item => {
        return item.path == "/home";
      });
      return homeRoute.children;
    },
    //获取登陆的角色集合
    getRuleList() {
      var ruleList = []; //角色数组
      var strRule = sessionStorage.getItem("position");
      if (strRule.indexOf("|") != -1) {
        ruleList = strRule.split("|");
      } else {
        ruleList.push(strRule);
      }
      return ruleList;
    }
  },
  computed: {
    onRoutes() {
      //监听路由,设置默认激活项目
      return this.$route.path.replace("/", "");
    }
  }
};
</script>
