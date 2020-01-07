<template>
  <div class="banner" v-if="activityList">
    <swiper :options="swiperOption">
      <swiper-slide  v-for="(item, index) in activityList" :key="index">
        <a style="display:block" :href="'/activity/'+item._id" :title="item.title"><img class="banner-img" :src="bannerCover(item.navCover)" alt></a>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev">
        <div class="my-pre"></div>
      </div>
      <div class="swiper-button-next" slot="button-next">
        <div class="my-next"></div>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { imgHeader } from "@/utils/js/config.js";

export default {
  data() {
    return {
      swiperOption: {
        spaceBetween: 100,
        centeredSlides: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          bulletClass: "my-pagination-bullet ",
          bulletActiveClass: "my-pagination-bullet-active"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
        // loop: true
      }
    };
  },
  name: "banner-play",
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    ...mapState("activity", ["activityList"]),
    bannerCover(){
      return function(cover){
        return imgHeader + cover
      }
    }
  },
  methods: {
    ...mapActions("activity", ["get_activityList"])
  },
  mounted() {
    this.get_activityList();
  }
};
</script>
<style lang="less" scoped>
</style>
<style lang="less">
@import url("./css/banner.less");
</style>

