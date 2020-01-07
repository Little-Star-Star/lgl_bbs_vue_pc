<template>
  <div class="person-header">
    <div class="content" v-if="user">
      <div class="head-img">
        <img :src="headImg(user.avatar)" alt>
      </div>
      <div class="name">{{user.name}}</div>
    </div>
  </div>
</template>

<script>
import { i_person_header } from "@/assets/img.js";
import { imgHeader } from "@/utils/js/config.js";
import { mapState } from 'vuex';

export default {
  data() {
    return {
      i_user: 'lij_circle_logo.png',
    };
  },
  computed: {
    ...mapState('account',['user']),
    headImg() {
      return function(avatar){
        return avatar ? imgHeader + avatar : imgHeader + i_user
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./css/personHeader.less");
</style>
