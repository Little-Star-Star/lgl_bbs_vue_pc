<template>
  <div class="index-news">
    <div class="title">我的浏览</div>
    <div class="content">
      <ul v-if="personalViewList">
        <div class="no-more" v-if="!personalViewList.length">暂无更多数据</div>
        <div class="delete-all-view" @click="clearAllViews()" v-if="personalViewList.length">
          <img :src="i_delete" title="清除全部浏览记录">
        </div>
        <li v-for="(item,index) in personalViewList" :key="index">
          <div class="number">{{index + 1 +"."}}</div>
          <div class="left">
            <img
              :src="cover(item.covers||item.cover)"
              @click="toDetail(item._id,item.kind&&item.cover)"
            >
          </div>
          <div class="right">
            <div class="title" @click="toDetail(item._id,item.kind&&item.cover)">
              <span class="type">{{item.type||item.kind}}</span>
              {{item.title}}
            </div>
            <div class="time">
              发布时间:
              <span>{{releaseTime(item.createTime)}}</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="more" @click="more">{{hasMore?"查看更多":"见底儿了..."}}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { formatTime01 } from "@/utils/js/tool";
import { api_get_deleteSecondHand } from "../../api/secondHand";
import { api_get_deletePersonalViewList } from "../../api/personal";
import { imgHeader } from "@/utils/js/config";
import { i_personal } from "@/assets/img.js";
export default {
  name: "MyView",
  data() {
    return {
      keyword: "",
      moreView: true,
      i_delete: i_personal.delete
    };
  },
  computed: {
    ...mapState("personal", ["personalViewList", "viewPageIndex", "viewTotal"]),
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
      return (this.moreView = this.viewTotal > this.viewPageIndex * 20);
    }
  },
  methods: {
    ...mapActions("personal", ["post_personalViewList"]),
    ...mapMutations("personal", [
      "ADD_VIEW_PAGEINDEX",
      "CLEAR_PERSONAL_VIEW_LIST"
    ]),
    toDetail(itemId, isNews) {
      isNews
        ? this.$router.push({
            name: "news_detail",
            params: { newsId: itemId }
          })
        : this.$router.push({
            name: "item_detail",
            params: { itemId: itemId }
          });
    },
    more() {
      if (!this.moreView) return;
      this.ADD_VIEW_PAGEINDEX();
      this.CLEAR_PERSONAL_VIEW_LIST();
      this.post_personalViewList({
        pageIndex: this.viewPageIndex,
        pageSize: 20
      });
    },
    clearAllViews() {
      api_get_deletePersonalViewList();
      this.CLEAR_PERSONAL_VIEW_LIST();
    }
  },
  created() {
    this.ADD_VIEW_PAGEINDEX(false);
    this.CLEAR_PERSONAL_VIEW_LIST();
    this.post_personalViewList({
      pageIndex: this.viewPageIndex,
      pageSize: 20
    });
  }
};
</script>

<style lang="less" scoped>
@import url("./css/news.less");
</style>


