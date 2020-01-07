<template>
  <div class="else-news">
    <div class="content" v-if="newsDetail">
      <div class="author">
        <div class="user">
          <img :src="cover(newsDetail.user.avatar)" alt>
          <div class="name">{{newsDetail.user.name}}</div>
        </div>
        <div :class="follow(newsDetail.user._id)" @click="followUser(newsDetail.user._id)">关注</div>
      </div>
      <div class="split"></div>
      <div class="main">
        <ul v-if="taNewsList&&taNewsList.length">
          <li
            @click="toNewsDetail(val._id)"
            :style="dot"
            :title="val.title"
            v-for="(val,i) in taNewsList"
            :key="i"
          >
            <a>{{val.title}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { i_else_news } from "@/assets/img.js";
import { mapState, mapActions } from "vuex";
import { imgHeader } from "@/utils/js/config.js";

export default {
  data() {
    return {
      i_dot: i_else_news.dot
    };
  },
  computed: {
    ...mapState("news", ["newsDetail", "followList", "taNewsList"]),
    dot() {
      return {
        background: `url(${this.i_dot}) -10px -9px / 40px auto no-repeat`
      };
    },
    cover() {
      return function(avatar) {
        return avatar ? imgHeader + avatar : this.i_user;
      };
    },
    follow() {
      return function(userId) {
        let follow = this.followList.length
          ? this.followList.some(d => d.userFollowed === userId)
          : false;
        return {
          follow: !follow,
          unfollow: follow
        };
      };
    }
  },
  methods: {
    ...mapActions("news", ["get_follow", "get_taNewsList"]),
    // 关注\取消关注
    followUser(userFollowed) {
      this.get_follow(userFollowed);
    },
    toNewsDetail(newsId) {
      this.$router.push({ name: "news_detail", params: { newsId: newsId } });
    }
  },
  watch: {
    "newsDetail.user": {
      handler: function(newValue, oldValue) {
        this.get_taNewsList(newValue._id);
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./css/elseNews.less");
</style>
