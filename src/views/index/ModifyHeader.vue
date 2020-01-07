<template>
  <div class="modify-header">
    <div class="content">
      <div class="title">{{modifyTitle}}</div>
      <div class="left-circle"></div>
      <div class="right-circle"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    modifyTitle: String
  }
};
</script>

<style lang="less" scoped>
@import url("./css/modifyHeader.less");
</style>

