<template>
  <div class="news-detail">
    <Share :commentTop="commentTop"/>
    <div class="main" v-if="newsDetail">
      <div class="title">{{newsDetail.title}}</div>
      <div class="author">
        <div class="user">
          <img :src="cover(newsDetail.user.avatar)" alt>
          <div class="name">{{newsDetail.user.name}}</div>
        </div>
        <div :class="follow(newsDetail.user._id)"  @click="followUser(newsDetail.user._id)">关注</div>
        <div class="time">发布时间：{{releaseTime(newsDetail.createTime)}}</div>
      </div>
      <div class="content-article" v-html="newsDetail.content"></div>
      <div class="news-footer">
        <div class="keyword">
          <ul>
            <img :src="i_label" alt>
            <li v-for="(keyword,index) in newsDetail.keyword" :key="index">{{keyword}}</li>
          </ul>
        </div>
        <div class="operate">
          <div class="collect">
            收藏&nbsp;&nbsp;
            <img :src="collect(newsDetail._id)" @click="collectNews(newsDetail._id)" alt>
          </div>
          <div class="report" @click="showReportAndParams(newsDetail)">
            举报&nbsp;&nbsp;
            <img :src="i_report" alt>
          </div>
        </div>
      </div>
      <!-- comment -->
      <Comment id="comment" @commentoffsettop="setCommentOffsetTop"/>
    </div>
    <ElseNews/>
    <Report v-show="showReport" @closeReport="showReport=false" :reportContent="reportContent"/>
  </div>
</template>

<script>
import Share from "@/components/Share.vue";
import Comment from "@/components/Comment.vue";
import ElseNews from "@/views/news/ElseNews.vue";
import { i_news_detail } from "@/assets/img.js";
import { mapState, mapActions } from "vuex";
import { imgHeader } from "@/utils/js/config.js";
import { formatTime } from "@/utils/js/tool.js";
import Report from "@/components/Report.vue";

export default {
  name: "newsDetail",
  data() {
    return {
      i_collect: i_news_detail.collect,
      i_collected: i_news_detail.collected,
      i_report: i_news_detail.report,
      i_label: i_news_detail.label,
      showReport: false,
      commentTop: 0,
       reportContent: {}
    };
  },
  props: {
    newsId: {
      type: String
    }
  },
  computed: {
    ...mapState("news", ["newsDetail","followList","likeList"]),
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
    collect() {
      return function(newsId) {
        let collected = this.likeList.length
          ? this.likeList.some(d =>{return d.news === newsId && d.collect})
          : false;
          console.log(collected,this.i_collect,this.i_collected)
        return collected ? this.i_collected : this.i_collect;
      };
    }
  },
  methods: {
    ...mapActions("news", ["get_getNewsDetail","get_followList",'get_follow',"get_collect"]),
    setCommentOffsetTop(data) {
      this.commentTop = data;
    },
     // 关注\取消关注
    followUser(userFollowed) {
      this.get_follow(userFollowed);
    },
    showReportAndParams(data) {
      this.reportContent = data;
      this.showReport = true;
    },
    // 收藏资讯
    async collectNews(newsId) {
      await this.get_collect(newsId);
    },
  },
  components: {
    Share,
    ElseNews,
    Comment,
    Report
  },
  created() {
    this.get_getNewsDetail({ newsId: this.newsId });
    this.get_followList()
  },
  watch:{
    "$route":function(newVal,oldVal){
      this.get_getNewsDetail({ newsId: this.newsId });
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./css/newsDetail.less");
</style>
