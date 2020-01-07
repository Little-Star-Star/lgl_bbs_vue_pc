<template>
  <div class="index">
    <div class="wrapper">
      <LeftNav/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftNav from "./index/LeftNav.vue";
export default {
  components: {
    LeftNav
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/css/flex.less");

.index {
  border-top: 2px solid @c_grey6;
  box-shadow: 0 2px 10px 2px @c_grey6;
  padding-top: 20px;
  .wrapper {
    max-width: 1200px;
    margin: 0 auto;
    .myflex();
    justify-content: space-between;
  }
}
</style>


