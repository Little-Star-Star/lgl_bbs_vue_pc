<template>
  <div class="important">
    <div class="title" v-show="showMostHotNews">
      <div class="tip">
        校园要闻
        <img :src="i_next_arrow">
      </div>
      <div class="time">{{curTime}}</div>
    </div>
    <div class="main" v-show="showMostHotNews">
      <Item
        :itemData="mostHotNews"
        :followList="followList"
        :likeList="likeList"
        @showReport="showReportAndParams"
      >
        <HotTopic slot="hot-topic"/>
      </Item>
    </div>
    <div class="title" v-show="showMostHotNews">
      <div class="tip">
        最新资讯
        <img :src="i_next_arrow">
      </div>
    </div>
    <div class="main">
      <!-- 使用短的分割线 -->
      <Item
        :split="true"
        :itemData="mostNewNews"
        :needHot="false"
        :followList="followList"
        :likeList="likeList"
        @showReport="showReportAndParams"
      >
        <Feedback slot="feedback"/>
      </Item>
    </div>
    <Report v-show="showReport" @closeReport="showReport=false" :reportContent="reportContent"/>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
import HotTopic from "@/components/HotTopic.vue";
import Feedback from "@/components/Feedback.vue";
import Report from "@/components/Report.vue";
import { i_news } from "@/assets/img.js";
import { mapState, mapActions } from "vuex";
import dayjs from "dayjs";
const win = window;
window.dayjj = dayjs;
export default {
  data() {
    return {
      i_next_arrow: i_news.nextArrow,
      pageIndex: 1,
      showReport: false,
      reportContent: {}
    };
  },
  computed: {
    ...mapState("news", [
      "mostHotNews",
      "mostNewNews",
      "mostNewPage",
      "havaNoData",
      "followList",
      "likeList",
      "showMostHotNews",
      "newsKeyword"
    ]),
    curTime() {
      return (
        dayjs().format("YYYY年MM月DD日") +
        "  " +
        new Date().toLocaleTimeString() +
        "  " +
        ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][
          dayjs().day()
        ]
      );
    }
  },
  methods: {
    ...mapActions("news", [
      "get_getMostHotNews",
      "post_getMostNewNews",
      "post_searchNews",
      "get_followList",
      "get_likeList"
    ]),
    showReportAndParams(data) {
      this.reportContent = data;
      this.showReport = true;
    },
    scroll() {
      win.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + win.innerHeight >
          document.documentElement.offsetHeight - 1000;
        console.log(bottomOfWindow);
        if (bottomOfWindow && !this.havaNoData && this.$route.name === 'news') {
          if (this.newsKeyword) {
            this.post_searchNews({
              pageIndex: this.pageIndex,
              pageSize: 6,
              keyword: this.newsKeyword
            });
          } else {
            this.post_getMostNewNews({
              pageIndex: this.pageIndex,
              pageSize: 6
            });
          }
          this.pageIndex++;
        }
      };
    }
  },
  components: {
    Item,
    HotTopic,
    Feedback,
    Report
  },
  created() {
    this.get_getMostHotNews();
    if (this.newsKeyword) {
      this.post_searchNews({
        pageIndex: this.pageIndex,
        pageSize: 6,
        keyword: this.newsKeyword
      });
    } else {
      this.post_getMostNewNews({
        pageIndex: this.pageIndex,
        pageSize: 6
      });
    }
    this.pageIndex++;

    this.get_followList();
    this.get_likeList();
  },
  mounted() {
    this.scroll();
  },
  watch: {
    newsKeyword: function(newVal, oldVal) {
      this.pageIndex = 1;
      console.log("set pageIndex 1");
      if (this.newsKeyword) {
        this.post_searchNews({
          pageIndex: this.pageIndex,
          pageSize: 6,
          keyword: this.newsKeyword
        });
      } else {
        this.post_getMostNewNews({
          pageIndex: this.pageIndex,
          pageSize: 6
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./css/important.less");
</style>
