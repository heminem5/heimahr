<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <el-form ref="form" :model="loginForm" :rules="loginRules">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              show-password
              v-model="loginForm.password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree"
              >用户平台使用协议</el-checkbox
            >
          </el-form-item>
          <el-form-item>
            <el-button @click="login" type="primary" style="width: 350px"
              >登录</el-button
            >
          </el-form-item>
          <!-- <el-form-item label="">
            <el-button type="primary" @click="testAjax"
              >测试axios封装
            </el-button>
          </el-form-item> -->
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
// import request from "@/utils/request";
export default {
  name: "Login",
  methods: {
    login() {
      this.$refs.form.validate((isOK) => {
        if (isOK) {
          this.$store.dispatch("user/login", this.loginForm);
        }
      });
    },
    // testAjax() {
    //   request({
    //     url: "/sys/login",
    //     method: "post",
    //     data: {
    //       mobile: "13912345678",
    //       password: "123457",
    //     },
    //   });
    // },
  },

  data() {
    return {
      loginForm: {
        mobile: "",
        password: "",
        isAgree: false,
      },
      loginRules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
        isAgree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback();
              } else {
                callback(new Error("请勾选用户协议"));
              }
            },
          },
        ],
      },
    };
  },
};
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color: #606266;
    }
  }
}
</style>
