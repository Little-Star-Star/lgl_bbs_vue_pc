<template>
  <div class="items" :class="{'split-short':split}">
    <ul v-if="itemData">
      <li class="item" v-for="(val,index) in itemData" :key="index">
        <div class="part-1">
          <div class="user">
            <div class="left">
              <img :src="cover(val.user.avatar)">
            </div>
            <div class="right">
              <div class="nick-name">{{val.user.name}}</div>
              <div class="edit-time">{{"发布于:"+releaseTime(val.createTime)}}</div>
            </div>
          </div>
          <div :class="follow(val.userId)" @click="followUser(val.userId)">关&nbsp;注</div>
          <div class="number">
            <div class="view">
              <img :src="i_view" alt>
              {{val.statics.view}}
            </div>
            <div class="comment">
              <img :src="i_comment" @click="$router.push('/news/detail/'+val._id+'#comment')" alt>
              {{val.statics.comment}}
            </div>
            <div class="like">
              <img :src="like(val._id,val)" @click="likeNews(val._id,val)" alt>
              {{val.statics.like}}
            </div>
            <div class="collect">
              <img :src="collect(val._id,val)" @click="collectNews(val._id,val)" alt>
              {{val.statics.collect}}
            </div>
            <!-- <div class="share"><img :src="i_share" alt="">{{5}}</div> -->
          </div>
        </div>
        <div class="part-2">
          <div class="left" @click="toNewsDetail(val._id)">
            <img :src="cover(val.cover)" alt>
          </div>
          <div class="right">
            <div class="item-1">
              <div class="title">
                <span class="hot" v-if="needHot">
                  <img :src="i_hot" alt>
                </span>
                <span class="type">{{val.kind}}</span>
                <span class="title-1" @click="toNewsDetail(val._id)">{{val.title}}</span>
              </div>
            </div>
            <div class="item-2">
              <div class="tip">关键字：</div>
              <div class="keywords">
                <div
                  class="item"
                  v-for="(val1,j) in val.keyword"
                  :key="j"
                  @click="searchNews(val1)"
                >{{val1}}</div>
              </div>
              <div class="report">
                <img :src="i_report" alt @click="$emit('showReport',val)">
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <slot name="hot-topic"></slot>
    <slot name="feedback"></slot>
  </div>
</template>
<script>
import { imgHeader } from "@/utils/js/config.js";
import { i_news } from "@/assets/img.js";
import { formatTime } from "@/utils/js/tool.js";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      headImg: imgHeader + "lij_rect_logo.png",
      i_view: i_news.view,
      i_collect: i_news.collect,
      i_collected: i_news.collected,
      i_comment: i_news.comment,
      i_share: i_news.share,
      i_like: i_news.like,
      i_liked: i_news.liked,
      i_hot: i_news.hot,
      i_report: i_news.report
    };
  },

  props: {
    split: {
      type: Boolean,
      default: false
    },
    itemData: {
      type: Array
    },
    needHot: {
      type: Boolean,
      default: true
    },
    followList: {
      type: Array,
      default: []
    },
    likeList: {
      type: Array
    }
  },
  computed: {
    ...mapState("account", ["user"]),
    cover() {
      return function(cover) {
        return imgHeader + cover;
      };
    },
    releaseTime() {
      return function(time) {
        return formatTime(time);
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
    },
    like() {
      return function(newsId, val) {
        let liked = this.likeList.length
          ? this.likeList.some(d => d.news === newsId && d.like)
          : false;
        this.$set(val, "addLike", !liked);
        return liked ? this.i_liked : this.i_like;
      };
    },
    collect() {
      return function(newsId, val) {
        let collected = this.likeList.length
          ? this.likeList.some(d => d.news === newsId && d.collect)
          : false;
        this.$set(val, "addCollect", !collected);
        return collected ? this.i_collected : this.i_collect;
      };
    }
  },
  methods: {
    ...mapActions("news", ["get_follow", "get_like", "get_collect"]),
    ...mapMutations("news", [
      "GET_MOST_NEW_NEWS",
      "SET_SHOW_MOST_HOT_NEWS",
      "SET_KEYWORD_SEARCH"
    ]),

    toNewsDetail(newsId) {
      this.$router.push({ name: "news_detail", params: { newsId } });
    },
    // 关注\取消关注
    followUser(userFollowed) {
      this.get_follow(userFollowed);
    },
    // 点赞资讯
    async likeNews(newsId, val) {
      await this.get_like(newsId);
      if (this.user) val.addLike ? --val.statics.like : ++val.statics.like;
    },
    // 收藏资讯
    async collectNews(newsId, val) {
      await this.get_collect(newsId);
      if (this.user)
        val.addCollect ? --val.statics.collect : ++val.statics.collect;
    },
    // 点击关键字收搜
    searchNews(keyword) {
      this.GET_MOST_NEW_NEWS({ data: [], page: { pageIndex: 1, pageSize: 6 } });
      this.SET_KEYWORD_SEARCH(keyword);
      this.SET_SHOW_MOST_HOT_NEWS(false);
      document.getElementById('search-key').value  = keyword
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
@import url("./css/item.less");
</style>

