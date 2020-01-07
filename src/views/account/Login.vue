<template>
  <div class="login">
    <div class="bbs_logo">
      <img :src="brand" alt="lij">
    </div>
    <div class="login-wrapper">
      <div class="login-main">
        <div class="login-content">
          <form action class="login-form">
            <p class="title">登录到校园BBS</p>
            <div class="login-account">
              <label for="input-email">邮箱/手机号</label>
              <input
                type="email"
                name="email"
                id="input-email"
                v-model.trim="account"
                placeholder="请输入邮箱或手机号"
              >
            </div>
            <div class="login-password">
              <label for="input-password">
                密码
                <a href="/account/forgetPassword" class="forget-password">忘记密码？</a>
              </label>
              <input
                type="password"
                name="password"
                id="input-password"
                v-model.trim="password"
                placeholder="请输入密码"
                @keyup.enter="loginWithPassword"
              >
            </div>
            <div class="login-btn" @click="loginWithPassword">登录</div>
            <div class="checkout-register">
              没有BBS账号？
              <span class="click-register">
                <a href="/account/register">注册新账号</a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { i_account } from "@/assets/img.js";
import { warnTip, isPhoneOrMail } from "@/utils/js/tool";
import { mapActions, mapState } from 'vuex';
import { setTimeout } from 'timers';
export default {
  name:'Login',
  data() {
    return {
      brand: i_account.bbs_brand,
      account: "",
      password: ""
    };
  },
  computed:{
    ...mapState('account',['user'])
  },
  methods: {
    ...mapActions('account',['post_loginWithPassword']),
    loginWithPassword() {
      // 判断账号以及密码的正确性
      if (!isPhoneOrMail(this.account)) {
        warnTip("账号格式不正确");
        return;
      }
      if (this.password.length < 6) {
        warnTip("密码格式不正确");
        return
      }
      this.post_loginWithPassword({password:this.password,account: this.account});
    }
  },
  watch:{
    user:function(newVal,oldVal){
      newVal?setTimeout(()=> {this.$router.push({name:'home'})},1000):''
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./css/login.less");
</style>
