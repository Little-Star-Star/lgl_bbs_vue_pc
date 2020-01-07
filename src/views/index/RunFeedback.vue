<template>
  <div class="index-report">
    <div class="title">管理所有反馈</div>
    <div class="content">
      <ul v-if="adminFeedbackList">
        <div class="no-more" v-if="!adminFeedbackList.length">暂无更多数据</div>
        <div class="delete-all-view" @click="clearAllViews()" v-if="adminFeedbackList.length">
          <img :src="i_delete" title="清除全部反馈信息">
        </div>
        <li v-for="(item,index) in adminFeedbackList" :key="index">
          <div class="number">{{index + 1 +"."}}</div>
          <div class="right">
            <div class="time">
              反馈的时间:
              <span>{{releaseTime(item.createTime)}}</span>
            </div>
            <div class="work">
              反馈的用户名称:
              <span>{{item.user&&item.name}}</span>
            </div>
            <div class="user">
              反馈的用户ID:
              <span>{{item.user&&item._id}}</span>
            </div>
            <div class="text">
              反馈的用户的联系方式:
              <span>{{item.link}}</span>
            </div>
            <div class="text">
              反馈的详细内容:
              <span>{{item.text}}</span>
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
import {api_get_deleteAdminFeedbackList} from "../../api/personal"
import { i_logos, i_header, i_comment, i_personal } from "@/assets/img.js";

const win = window;
export default {
  name: "RunFeedback",
  data() {
    return {
      keyword: "",
      i_delete: i_personal.delete,
      moreNews:true
    };
  },
  computed: {
    ...mapState("personal", ["adminFeedbackList","adminFeedbackTotal","adminFeedbackPageIndex"]),
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
      return (this.moreNews = this.adminFeedbackTotal > this.adminFeedbackPageIndex * 20);
    }
  },
  methods: {
    ...mapActions("personal", [
      "post_adminFeedbackList"
    ]),
    ...mapMutations("personal",["ADD_ADMIN_FEEDBACK_PAGEINDEX","CLEAR_ADMIN_FEEDBACK_LIST"]),
    async clearAllViews() {
      await api_get_deleteAdminFeedbackList()
      this.CLEAR_ADMIN_FEEDBACK_LIST()
    },
    more(){
      if (!this.moreNews) return;
      this.ADD_ADMIN_FEEDBACK_PAGEINDEX();
      this.post_adminFeedbackList({
        pageIndex: this.adminFeedbackPageIndex,
        pageSize: 20,
      });
    }
  },
  created() {
    this.CLEAR_ADMIN_FEEDBACK_LIST()
    this.post_adminFeedbackList({
      pageIndex: 1,
      pageSize: 20
    });
  }
};
</script>

<style lang="less" scoped>
@import url("./css/report.less");
</style>

