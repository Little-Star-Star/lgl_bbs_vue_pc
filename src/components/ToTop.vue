<template>
  <div class="to-top" @click="toTop">
    <img :src="i_toTop" alt>
  </div>
</template>

<script>
import { i_to_top } from "@/assets/img.js";
export default {
  data() {
    return {
      i_toTop: i_to_top.toTop
    };
  },
  methods: {
    toTop() {
        document.documentElement.scrollTop = 0
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./css/toTop.less");
</style>
