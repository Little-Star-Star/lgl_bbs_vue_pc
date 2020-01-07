<template>
  <div class="modify-email-step1">
    <div class="content">
      <div class="modify-email">
        <div class="tip">
          验证已绑定邮箱
          <span>需要给已绑定邮箱发送验证码,才能修改为本人其他邮箱</span>
        </div>
        <div class="old-email">
          邮箱地址:&nbsp;&nbsp;&nbsp;&nbsp;{{hideAccount(account.email)}}
          <span @click="sendCode" :style="cursorNotAllowed">发送验证码</span>
        </div>
        <div class="input-code">
          <span>验证码:</span>
          <input
            placeholder="请输入6位数字验证码"
            type="text"
            v-model.trim="oldCode"
            @blur="checkCode"
            @keyup.enter="toNext()"
          >
        </div>
        <div class="btn">
          <div class="confirm-btn" @click="toNext()">下一步</div>
          <div class="cancel-btn" @click="$router.push({name:'person_security_set'})">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { warnTip, encode, isCaptcha } from "@/utils/js/tool.js";
import { api_post_send_mail_code } from "@/api/account";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      oldCode: "",
      ban: false
    };
  },
  computed: {
    ...mapState("account", {
      account: state => (state.user ? state.user.account : "")
    }),
    hideAccount() {
      return function(val) {
        return val.replace(/(?<=.{4}).{4}/, "****");
      };
    },
    cursorNotAllowed() {
      return this.ban ? { cursor: "not-allowed" } : {};
    }
  },
  methods: {
    sendCode() {
      if (this.ban) {
        warnTip("请一分钟后重试");
        return;
      }
      api_post_send_mail_code(this.account.email);
      this.ban = true;
      setTimeout(() => {
        this.ban = false;
      }, 60000);
    },
    checkCode() {
      if (!isCaptcha(this.oldCode)) {
        warnTip("验证码格式错误");
      }
    },
    toNext() {
      if (!isCaptcha(this.oldCode)) {
        warnTip("验证码格式错误");
        return
      }
      localStorage.setItem('oldCode',this.oldCode)
      localStorage.setItem('oldEmail',this.account.email)
      this.$router.push({ name: "person_modify_email_step_two" });
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./css/modifyEmailStep.less");
</style>
