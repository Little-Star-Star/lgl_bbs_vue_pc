<template>
  <div class="index-report">
    <div class="title">我的举报</div>
    <div class="content">
      <ul v-if="personalReportList">
        <div class="no-more" v-if="!personalReportList.length">暂无更多数据</div>
        <li v-for="(item,index) in personalReportList" :key="index">
          <div class="number">{{index + 1 +"."}}</div>
          <div class="right">
            <div class="time">
              举报的时间:
              <span>{{releaseTime(item.report&&item.report.time)}}</span>
            </div>
            <div class="work">
              举报的作品:
              <span>{{item.news? '(校园资讯)  ':'(二手物品)  '}}{{(item.news&&item.news.title)||(item.secondhand&&item.secondhand.title)}}</span>
            </div>
            <div class="user">
              相关的作者:
              <span>{{item.user.name}}</span>
            </div>
            <div class="text">
              举报的内容:
              <span>{{item.report&&item.report.text}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { formatTime01 } from "@/utils/js/tool";
import { imgHeader } from "@/utils/js/config";
import { api_get_like as api_get_like_news } from "../../api/news";
import { api_get_like as api_get_like_secondhand } from "../../api/secondHand";
import { i_logos, i_header, i_comment } from "@/assets/img.js";

 const win = window
export default {
  name: "Report",
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    ...mapState("personal", ["personalReportList"]),
    cover() {
      return function(cover) {
        return imgHeader + cover;
      };
    },
    releaseTime() {
      return function(time) {
        return formatTime01(time);
      };
    }
  },
  methods: {
    ...mapActions("personal", ["post_personalLikeList"]),
  },
  created() {
    this.post_personalLikeList();
  }
};
</script>

<style lang="less" scoped>
@import url("./css/report.less");
</style>

