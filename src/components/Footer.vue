<template>
  <div class="footer">
    <div class="part-1" @click="$router.push('/home')">
        <img :src="i_logo" alt>
        大学校园论坛
    </div>
    <div class="part-2">
      此网站仅用于学习，有疑问请联系作者:
      <span class="author">Light</span>
      邮箱：<span class="emai">2319513900@qq.com</span>
    </div>
  </div>
</template>
<script>
import { i_logos } from "@/assets/img.js";
export default {
  data() {
    return {
      i_logo:i_logos.rect_logo
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./css/footer.less");
</style>
