<template>
  <div class="index-follow">
    <div class="title">我的关注</div>
    <div class="content">
      <ul v-if="personalFollowList">
        <div class="no-more" v-if="!personalFollowList.length">暂无更多数据</div>
        <li v-for="(item, index) in personalFollowList" :key="index">
          <div class="number">{{index+1+'.'}}</div>
          <div class="left">
            <img :src="cover(item.userFollowed.avatar)" alt>
          </div>
          <div class="right">
            <div class="name">{{item.userFollowed.name}}</div>
            <div class="btn" @click="cancelFollow(item.userFollowed._id,index)">取消关注</div>
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
  name: "Follow",
  data() {
    return {
      moreFollow: true
    };
  },
  computed: {
    ...mapState("personal", ["personalFollowList","followTotal","followPageIndex"]),
    cover() {
      return function(cover) {
        return imgHeader + cover;
      };
    },
    hasMore() {
      return (this.moreNews = this.followTotal > this.followPageIndex * 20);
    }
  },
  methods: {
    ...mapActions("personal", ["post_personalFollowList"]),
    ...mapMutations("personal", ["ADD_FOLLOW_PAGEINDEX","CLEAR_PERSONAL_FOLLOW_LIST"]),
    async cancelFollow(userId, index) {
      await api_get_follow(userId);
      this.personalFollowList.splice(index, 1);
    },
    more() {
      if (!this.moreFollow) return;
      this.ADD_FOLLOW_PAGEINDEX();
      this.post_personalFollowList({
        pageIndex: this.followPageIndex,
        pageSize: 20,
      });
    }
  },
  created() {
    this.ADD_FOLLOW_PAGEINDEX(false);
    this.CLEAR_PERSONAL_FOLLOW_LIST();
    this.post_personalFollowList({
      pageIndex: this.followPageIndex,
      pageSize: 20,
    });
  }
};
</script>

<style lang="less" scoped>
@import url("./css/follow.less");
</style>

