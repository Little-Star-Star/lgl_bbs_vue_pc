<template>
  <div id="app">
    <Header/>
    <router-view/>
    <ToTop/>
    <Footer/>
  </div>
</template>
<script>
import "@/utils/js/rem.min.js";
import Header from "@/components/Header.vue";
import ToTop from "@/components/ToTop.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    ToTop,
    Footer
  },
  mounted() {
    // this.$router.push({name:'home'})
    // console.log(process.env.VUE_APP_MYMODE)
  }
};
</script>

<style lang="less">
@import url("./assets/css/global.less");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
