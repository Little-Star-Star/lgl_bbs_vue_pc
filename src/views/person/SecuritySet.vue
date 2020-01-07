<template>
  <div class="security-set">
    <div class="content" v-if="account">
      <div class="login_password">
        <div class="tip">登录密码</div>
        <div class="modify">
            <div class="left">当前密码：<span>已设置</span></div>
            <div class="right" @click="$router.push({name:'person_modify_password'})">修改</div>
        </div>
      </div>
      <div class="phone_bind">
        <div class="tip">手机绑定</div>
        <div class="modify">
            <div class="left">当前手机：<span>{{hideAccount(account.mobile)}}</span></div>
            <div class="right" @click="modifyIphone()">修改</div>
        </div>
      </div>
      <div class="email_bind">
        <div class="tip">邮箱绑定</div>
        <div class="modify">
            <div class="left">当前邮箱：<span>{{hideAccount(account.email)}}</span></div>
            <div class="right" @click="$router.push({name:'person_modify_email_step_one'})">修改</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { i_person_header } from "@/assets/img.js";
import { warnTip} from "@/utils/js/tool.js";
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      i_user: i_person_header.user
    };
  },
  computed: {
    ...mapState('account',{
      account:state => state.user?state.user.account : ''
    }),
    hideAccount(){
      return function(val){
        return val.replace(/(?<=.{4}).{4}/,'****')
      }
    }
  },
  methods: {
    modifyIphone(){
      warnTip('暂不支持手机相关操作')
    }
  },
};
</script>
<style lang="less" scoped>
@import url("./css/securitySet.less");
</style>
