<template>
  <div class="release-header">
    <div class="content">
      <div :class="{'news':true,'nav-actived':actived === 1}" @click="toReleaseNews">发布资讯</div>
      <div
        :class="{'secondhand':true,'nav-actived':actived === 2}"
        @click="toReleaseSecondHand"
      >发布二手物品</div>
      <div :class="{'activity':true,'nav-actived':actived === 3}" @click="toActivity" v-if="user&&user.account&&user.account.type === 'admin'">发布校园活动</div>
      <div class="left-circle"></div>
      <div class="right-circle"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    actived: {
      type: Number,
      default: 1
    }
  },
  computed:{
    ...mapState('account',['user']),
  },
  methods: {
    toReleaseNews() {
      this.$emit("setActived", 1);
      this.$router.push({ name: "release_news" });
    },
    toReleaseSecondHand() {
      this.$emit("setActived", 2);
      this.$router.push({ name: "release_secondHand" });
    },
    toActivity() {
      this.$emit("setActived", 3);
      this.$router.push({ name: "release_activity" });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./css/releaseHeader.less");
</style>
