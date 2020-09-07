<template>
  <el-header class="_header">
    <div class="left">
      <ul>
        <li class="collapse-btn" @click="navChangeShow">
          <i class="el-icon-menu"></i>
        </li>
        <li class="nohover">交付智能管理平台</li>
      </ul>
    </div>
    <div class="center">
      {{ position }}
    </div>
    <div class="right">
      <div></div>
      <ul>
          <el-dropdown class="white font" trigger="click" placement="bottom" @command="handleCommand">
            <span class="el-dropdown-link">
              {{username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </ul>
    </div>
  </el-header>
</template>
<script>
import bus from "../common/bus";
export default {
  data() {
    return {
      token: '',
      price: '',
      navShow: false, //左侧导航是否折叠
      fullscreen: false, //全屏
      position:'',//职位
      username:'',//用户名
    };
  },
  mounted(){
    this.token = sessionStorage.getItem('token')
    this.position=sessionStorage.getItem('position');
    this.username=sessionStorage.getItem('account');
  },
  methods: {
    navChangeShow() {
      //切换左侧导航展示/折叠
      this.navShow = !this.navShow;
      bus.$emit("navShowChange", this.navShow);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    //下拉框事件
     handleCommand(command) {
       if(command=='loginout'){
         sessionStorage.removeItem('token');
         this.$router.replace('/login');
       }
      }
  }
};
</script>

<style lang="scss">
._header {
  padding: 0px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  color: #000;
  ul {
    list-style: none;
    li {
      float: left;
      line-height: 60px;
      height: 60px;
      text-align: center;
      padding: 0 10px;
      cursor: pointer;
    }
    li:hover {
      background-color: #434a50;
    }
    i {
      line-height: 60px;
    }
  }
  .nohover {
    pointer-events: none; //禁用hover
  }
  .left {
    .collapse-btn {
      width: 45px;
    }
    .title {
      font-size: 18px;
    }
  }
  .center {
    width: 60%;
    float: right;
    text-align: right;
    line-height: 60px;
  }
  .right {
    margin-right: 60px;
    .fullscreen {
      transform: rotate(45deg); //旋转45度
      font-size: 22px;
      width: 40px;
    }
    .notice {
      width: 40px;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #000;
      padding: 22px 0px;
    }
  }
}
</style>
