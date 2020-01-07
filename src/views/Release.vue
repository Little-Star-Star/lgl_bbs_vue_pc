<template>
  <div class="release">
    <ReleaseHeader :actived="actived" @setActived="setActived"/>
    <router-view></router-view>
  </div>
</template>
<script>
import ReleaseHeader from "@/views/release/ReleaseHeader.vue";
export default {
  components: {
    ReleaseHeader
  },
  data() {
    return {
      actived: 1
    };
  },
  methods: {
      setActived(d){
          this.actived = d
      }
  },
  mounted() {
    if (this.$route.path.includes("news")) {
      this.actived = 1;
    } else if (this.$route.path.includes("second")) {
      this.actived = 2;
    } else if (this.$route.path.includes("activity")) {
      this.actived = 3;
    } else {
      this.actived = 1;
    }
  }
};
</script>

