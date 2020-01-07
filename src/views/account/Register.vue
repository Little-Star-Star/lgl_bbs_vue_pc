<template>
  <div class="register">
    <div class="bbs_logo">
      <img :src="brand" alt="lij">
    </div>
    <div class="register-wrapper">
      <div class="register-main">
        <div class="register-content">
          <form action class="register-form">
            <p class="title">注册校园BBS账号</p>
            <div class="register-account">
              <label for="input-email">邮箱/手机号</label>
              <input
                type="email"
                name="email"
                id="input-email"
                v-model.trim="account"
                placeholder="请输入邮箱或手机号"
                @blur="accountExisted"
              >
            </div>
            <div class="register-code">
              <label for="input-code">
                <input type="text" id="input-code" v-model.trim="code" placeholder="请输入6位验证码" maxlength="6">
                <span
                  :class="{'send-code':!leftT,'sent':leftT}"
                  @click="sendCode"
                >{{leftT ? leftT+'s':'发送验证码'}}</span>
              </label>
            </div>
            <div class="register-pwd">
              <label for="input-email">密码</label>
              <input
                type="password"
                name="pwd"
                id="input-pwd"
                v-model.trim="psw"
                placeholder="请输入密码"
              >
            </div>
            <div class="register-pwd-again">
              <label for="input-email">确认密码</label>
              <input
                type="password"
                name="pwd-again"
                id="input-pwd-again"
                v-model.trim="pswAgain"
                placeholder="请再次输入密码"
                @keyup.enter="register"
              >
            </div>
            <div class="register-btn" @click="register">注册新账号</div>
            <div class="checkout-login">
              已有BBS账号。
              <span class="click-login">
                <a href="/account/login">登录</a>
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
import { warnTip, isPhoneOrMail, isMail,isCaptcha,encode } from "@/utils/js/tool";
import {
  api_post_send_mail_code,
  api_post_registerWithMail,
  api_get_account_existed
} from "@/api/account";
import { setTimeout, setInterval, clearInterval } from "timers";
import { mapActions, mapState } from 'vuex';
export default {
  name: "Register",
  data() {
    return {
      brand: i_account.bbs_brand,
      account: "",
      code: "",
      psw: "",
      pswAgain: "",
      time: null,
      leftT: 0 //验证码剩余秒数
    };
  },
  computed: {
    ...mapState('account',['user'])
  },
  methods: {
    ...mapActions('account',['post_registerWithMail']),
    async sendCode() {
      if (this.leftT) {
        return;
      } else {
        await api_post_send_mail_code(this.account);
        this.leftT = 60;
        this.time = setInterval(() => {
          this.leftT--;
        }, 1000);
      }
    },
    async register() {
      if (!isMail(this.account)) {
        warnTip("暂时仅仅支持邮箱注册");
        return;
      }
      if(!isCaptcha(this.code)){
        warnTip('验证码格式错误')
        return
      }
      if (this.psw !== this.pswAgain) {
        warnTip("两次密码不相同");
        return;
      }
      if (this.psw.length < 6) {
        warnTip("密码长度至少6位");
        return;
      }
      this.post_registerWithMail({
        account:this.account,
        code:this.code,
        password:encode(this.psw,this.account)
      })
    },
    async accountExisted(){
      api_get_account_existed(this.account)
    },
  },
  watch: {
    leftT: function(newVal, oldVal) {
      if (newVal == 0) {
        clearInterval(this.time);
      }
    },
    user:function(newVal,oldVal){
      newVal?setTimeout(()=> {this.$router.push({name:'home'})},1000):''
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./css/register.less");
</style>
