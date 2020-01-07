<template>
  <div class="left-nav">
    <div class="user" v-if="user">
      <img :src="cover(user.avatar)" alt>
      <span>{{user.name}}</span>
    </div>
    <div class="nav" v-if="leftNav">
      <router-link v-for="(nav,key,index) in leftNav" :key="index" :to="nav.router">{{nav.name}}</router-link>
      <div class="split" v-if="user&&user.account&&user.account.type ==='admin'"></div>
      <router-link v-if="leftNavRun&&user&&user.account&&user.account.type==='admin'" v-for="(nav,key,index) in leftNavRun" :key="key" :to="nav.router">{{nav.name}}</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { imgHeader } from "@/utils/js/config.js";

export default {
  computed: {
    ...mapState(["leftNav","leftNavRun"]),
    ...mapState("account", ["user"]),
    cover() {
      return function(avatar) {
        return avatar ? imgHeader + avatar : imgHeader + "lij_circle_logo.png";
      };
    }
  },
};
</script>
<style lang="less" scoped>
@import url("./css/leftNav.less");
</style>
