<template>
  <div class="index-report">
    <div class="title">管理所有举报</div>
    <div class="content">
      <ul v-if="adminReportList">
        <div class="no-more" v-if="!adminReportList.length">暂无更多数据</div>
        <!-- <div class="delete-all-view" @click="clearAllViews()" v-if="adminReportList.length">
          <img :src="i_delete" title="清除全部举报信息">
        </div> -->
        <li v-for="(item,index) in adminReportList" :key="index">
          <div class="number">{{index + 1 +"."}}</div>
          <div class="right">
            <div class="time">
              举报的时间:
              <span>{{releaseTime(item.updateTime)}}</span>
            </div>
            <div class="work">
              举报的作品:
              <span>{{item.news? '(校园资讯) ':'(二手物品) '}}{{(item.news&&item.news.title)||(item.secondhand&&item.secondhand.title)}}</span>
            </div>
            <div class="user">
              相关的作者:
              <span>{{(item.secondhand&&item.secondhand.user.name)||(item.news&item.news.userId.name)}}</span>
            </div>
            <div class="text">
              举报的内容:
              <span>{{item.description}}</span>
            </div>
          </div>
        </li>
        <div class="more" @click="more">{{hasMore?"查看更多":"见底儿了..."}}</div>
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
import { i_logos, i_header, i_comment, i_personal } from "@/assets/img.js";

const win = window;
export default {
  name: "RunReport",
  data() {
    return {
      keyword: "",
      i_delete: i_personal.delete,
      moreNews:true
    };
  },
  computed: {
    ...mapState("personal", ["adminReportList","adminReportTotal","adminReportPageIndex"]),
    cover() {
      return function(cover) {
        return imgHeader + cover;
      };
    },
    releaseTime() {
      return function(time) {
        return formatTime01(time);
      };
    },
    hasMore() {
      return (this.moreNews = this.adminReportTotal > this.adminReportPageIndex * 20);
    }
  },
  methods: {
    ...mapActions("personal", [
      "post_adminReportList",
    ]),
    ...mapMutations("personal",["ADD_ADMIN_REPORT_PAGEINDEX"]),
    clearAllViews() {},
    more(){
      if (!this.moreNews) return;
      this.ADD_ADMIN_REPORT_PAGEINDEX();
      this.post_adminReportList({
        pageIndex: this.adminReportPageIndex,
        pageSize: 20,
      });
    }
  },
  created() {
    this.post_adminReportList({
      pageIndex: 1,
      pageSize: 20
    });
  }
};
</script>

<style lang="less" scoped>
@import url("./css/report.less");
</style>

