<template>
  <div class="modify-password">
    <div class="content">
      <div class="modify-pwd">
        <div class="tip">
          修改登录密码
          <span>长度在6-15字符以内，不支持空白字符特殊字符，请注意大小写区分</span>
        </div>
        <div class="input-pwd">
          <input placeholder="旧密码" type="password" name id="old-psw" v-model.trim="oldPsw">
          <input placeholder="新密码" type="password" name id="new-psw" v-model.trim="newPsw">
          <input
            placeholder="再次输入新密码"
            type="password"
            name
            id="new-psw-again"
            v-model.trim="newPswAgain"
            @keyup.enter="updatePassword"
          >
        </div>
        <div class="btn">
          <div class="confirm-btn" @click="updatePassword">确定</div>
          <div class="cancel-btn" @click="$router.push({name:'person_security_set'})">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { i_person_header } from "@/assets/img.js";
import { mapActions, mapState } from "vuex";
import { warnTip ,encode} from "@/utils/js/tool.js";

export default {
  data() {
    return {
      oldPsw: "",
      newPsw: "",
      newPswAgain: ""
    };
  },
  computed: {
    ...mapState('account',{
      account:state=>state.user.account
    })
  },
  methods: {
    ...mapActions("account", ["post_updatePassword"]),
    updatePassword() {
      if (this.newPsw.length < 6) {
        warnTip("密码长度小于6");
        return;
      }
      if (this.newPsw !== this.newPswAgain) {
        warnTip("两次输入的新密码不一致");
        return;
      }
      this.post_updatePassword({
        newPsw:encode(this.newPsw,this.account.email),
        oldPsw:encode(this.oldPsw,this.account.email)
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./css/modifyPassword.less");
</style>
