<template>
  <div class="modify-email-step2">
    <div class="content">
      <div class="modify-email">
        <div class="tip">
          绑定新邮箱
          <span>需要给已绑定邮箱发送验证码,才能修改为本人其他邮箱</span>
        </div>
        <div class="new-email">
          <span>新邮箱:</span>
          <input
            placeholder="请输入你的新邮箱"
            type="email"
            v-model.trim="newEmail"
            class="new-email-input"
             @blur="checkEmail"
          >
          <span class="new-email-send-code" @click="sendCode" :style="cursorNotAllowed">发送验证码</span>
        </div>
        <div class="input-code">
          <span>验证码:</span>
          <input
            placeholder="请输入6位数字验证码"
            type="text"
            v-model.trim="newCode"
            class="new-code-input"
            @blur="checkCode"
          >
        </div>
        <div class="btn">
          <div class="confirm-btn" @click="updateBindedEmail">确定</div>
          <div class="cancel-btn" @click="$router.push({name:'person_security_set'})">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { warnTip, encode, isCaptcha, isMail } from "@/utils/js/tool.js";
import { api_post_send_mail_code,api_get_account_existed } from "@/api/account";
import { setTimeout } from "timers";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      newEmail: "",
      newCode: "",
      oldCode: "",
      oldEmail: ""
    };
  },
  computed: {
    cursorNotAllowed() {
      return this.ban ? { cursor: "not-allowed" } : {};
    }
  },
  methods: {
    ...mapActions("account", ["post_updatebindedemail"]),
    sendCode() {
      if (this.ban) {
        warnTip("请一分钟后重试");
        return;
      }
      if (!isMail(this.newEmail)) {
        warnTip("邮箱格式错误");
        return;
      }
      api_post_send_mail_code(this.newEmail);
      this.ban = true;
      setTimeout(() => {
        this.ban = false;
      }, 60000);
    },
    checkCode() {
      if (!isCaptcha(this.newCode)) {
        warnTip("验证码格式错误");
      }
    },
    checkEmail() {
      if (!isMail(this.newEmail)) {
        warnTip("邮箱格式错误");
      }
      api_get_account_existed(this.newEmail)
    },
    async updateBindedEmail() {
      if (!isMail(this.newEmail)) {
        warnTip("邮箱格式错误");
        return;
      }
      if (!isCaptcha(this.newCode)) {
        warnTip("验证码格式错误");
      }
      const emailExsited = await api_get_account_existed(this.newEmail)
      if(emailExsited)return
      this.post_updatebindedemail({
        newAccount: this.newEmail,
        newCode: this.newCode,
        oldAccount: this.oldEmail,
        oldCode: this.oldCode
      });
    }
  },
  mounted() {
    this.oldCode = localStorage.getItem("oldCode");
    this.oldEmail = localStorage.getItem("oldEmail");
  }
};
</script>
<style lang="less" scoped>
@import url("./css/modifyEmailStep.less");
</style>
