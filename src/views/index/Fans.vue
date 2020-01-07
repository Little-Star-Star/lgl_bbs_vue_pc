<template>
  <div class="index-fans">
    <div class="title">我的粉丝</div>
    <div class="content">
      <ul v-if="personalFanList">
        <div class="no-more" v-if="!personalFanList.length">暂无更多数据</div>
        <li v-for="(item, index) in personalFanList" :key="index">
          <div class="number">{{index+1+'.'}}</div>
          <div class="left">
            <img :src="cover(item.user.avatar)" alt>
          </div>
          <div class="right">
            <div class="name">{{item.user.name}}</div>
            <div class="btn" @click="cancelFan(item.user._id,index)">取消关注</div>
          </div>
        </li>
      </ul>
      <div class="more" @click="more">{{hasMore?"查看更多":"见底儿了..."}}</div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { imgHeader } from "@/utils/js/config";
import { api_get_follow } from "../../api/news";

export default {
  name: "Fan",
  data() {
    return {
      moreFan: true
    };
  },
  computed: {
    ...mapState("personal", ["personalFanList","fanTotal","fanPageIndex"]),
    cover() {
      return function(cover) {
        return imgHeader + cover;
      };
    },
    hasMore() {
      return (this.moreNews = this.fanTotal > this.fanPageIndex * 20);
    }
  },
  methods: {
    ...mapActions("personal", ["post_personalFanList"]),
    ...mapMutations("personal", ["ADD_FAN_PAGEINDEX","CLEAR_PERSONAL_FAN_LIST"]),
    async cancelFan(userId, index) {
      await api_get_follow(userId);
      this.personalFanList.splice(index, 1);
    },
    more() {
      if (!this.moreFan) return;
      this.ADD_FAN_PAGEINDEX();
      this.post_personalFanList({
        pageIndex: this.fanPageIndex,
        pageSize: 20,
      });
    }
  },
  created() {
    this.ADD_FAN_PAGEINDEX(false);
    this.CLEAR_PERSONAL_FAN_LIST();
    this.post_personalFanList({
      pageIndex: this.fanPageIndex,
      pageSize: 20,
    });
  }
};
</script>

<style lang="less" scoped>
@import url("./css/follow.less");
</style>

