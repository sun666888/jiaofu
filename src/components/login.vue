<template>
  <!--login外框-->
  <div class="_login">
    <!--login内框-->
    <div class="login_inner">
      <el-form class="form" ref="form" :model="formLogin">
        <el-form-item>
          <h2 class="title">交付智能管理平台</h2>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formLogin.account" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formLogin.passwd" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登陆</el-button>
          <div v-show="this.errorInfo.isShowError" class="error">{{this.errorInfo.text}}</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss">
._login {
  // border:1px solid red;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('./../assets/timg.jpg') no-repeat;
  background-size: 100%;
  .login_inner {
    // border:1px solid green;
    border-radius: 10px;
    width: 460px;
    height: 300px;
    margin-top: -150px;
    display: flex;
    justify-content: center;
    box-shadow: 0 0 30px #ccc;
    .form {
      // border:1px solid blue;
      width: 300px;
      margin-top: 30px;
      text-align: center;
      .title {
        color: #505458;
      }
    }
    .error {
      color: red;
    }
  }
}
</style>
<script>
export default {
  name: "login",
  data() {
    return {
      formLogin: {
        account: "",
        passwd: ""
      },
      errorInfo: {
        text: "登陆失败,请重试",
        isShowError: false //显示错误提示
      }
    };
  },
   mounted() {
        document.onkeydown = (event) => {
            var router=this.$route.path;
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13&&this.$route.path=='/login') { // enter 键
                this.login();
                // console.log('111')
            }
        };
    },
  methods: {
    login() {
      this.$http
        .post("/api/login", this.formLogin)
        .then(res => {
          if (res.code == 0) { 
            //保存登陆信息
            //登陆成功跳转主页
            sessionStorage.setItem("token", res.data.token); //token
            sessionStorage.setItem("account", res.data.account); //用户
            sessionStorage.setItem("position", res.data.role); //用户
            let role = res.data.role;
            switch (role) {
              case '审核':
                this.$router.replace({ path: "/examine" });
                break;
              case '调度':
                this.$router.replace({ path: "/dispatch" });
                break;
              case '实名制':
                this.$router.replace({ path: "/scalping" });
                break;
              case '固网综调':
                this.$router.replace({ path: "/fixedNetwork" });
                break;
              default:
                this.$router.replace({ path: "/examine" });
                break;
            }
            this.$message.success('登陆成功')
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.$message.error('网络错误')
        });
    }
  }
};
</script>
