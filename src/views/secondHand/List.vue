<template>
  <div class="list">
    <!-- 二手物品列表页面 -->
    <ul v-if="secondList">
      <li v-for="(item,index) in secondList" :key="index">
        <div class="cover" @click="toDetail(item._id)">
          <img :src="cover(item.covers[0])" alt>
        </div>
        <div class="title"  @click="toDetail(item._id)">{{item.title}}</div>
        <div class="part-1">
          <div class="price">￥{{item.price}}</div>
          <div class="view-number">{{item.statics.view}}次浏览</div>
        </div>
        <div class="split"></div>
        <div class="user">
          <img :src="cover(item.user.avatar)" alt>
          <span class="name">{{item.user.name}}</span>
        </div>
      </li>
    </ul>   
  </div>
</template>

<script>
import { i_logos } from "@/assets/img.js";
import { mapState ,mapActions} from "vuex";
import { imgHeader } from "@/utils/js/config.js";

export default {
  data() {
    return {
      i_cover: i_logos.rect_logo,
      i_user: i_logos.circle_logo
    };
  },
 
  computed:{
    ...mapState('secondHand',['secondList']),
    cover() {
     return function(cover) {
       return cover ? imgHeader + cover : imgHeader + 'lij_circle_logo.png'
     };
   }
  },
  methods:{
    toDetail(itemId){
      this.$router.push({name:'item_detail',params:{itemId:itemId}})
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./css/list.less");
</style>



