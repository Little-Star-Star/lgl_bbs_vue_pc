  <template>
  <div class="person-nav">
    <div class="content">
      <div :class="{'base-info':true,'nav-actived':actived}" @click="toBaseInfo()">基本信息</div>
      <div :class="{'security-set':true,'nav-actived':!actived}" @click="toSecuritySet()">安全设置</div>
      <div class="left-circle"></div>
      <div class="right-circle"></div>
    </div>
  </div>
</template>

<script>
import { i_person_header } from "@/assets/img.js";
export default {
  data() {
    return {
      i_user: i_person_header.user,
      actived: true
    };
  },
  methods: {
    toBaseInfo() {
      this.actived = true;
      this.$router.push({ name: "person_base_info" });
    },
    toSecuritySet() {
      this.actived = false;
      this.$router.push({ name: "person_security_set" });
    }
  },
  mounted() {
    if(this.$route.fullPath.includes('modify')){
      this.actived = false
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./css/personNav.less");
</style>
