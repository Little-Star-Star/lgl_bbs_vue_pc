<template>
  <div class="index-collect">
    <div class="title">我的收藏</div>
    <div class="content">
      <!-- 搜索 -->
      <div class="search">
        <input
          type="text"
          @keyup.enter="getCollectListByKeyword"
          id="news-search-key"
          placeholder="请输入标题..."
          v-model.lazy="keyword"
        >
        <label for="search-key">
          <img :src="i_search" @click="getCollectListByKeyword" alt>
        </label>
      </div>
      <ul v-if="personalCollectList">
        <div class="no-more" v-if="!personalCollectList.length">暂无更多数据</div>
        <li v-for="(item,index) in personalCollectList" :key="index">
          <div class="number">{{index + 1 +"."}}</div>
          <div class="left">
            <img
              :src="cover((item.secondhand&&item.secondhand.covers)||(item.news&&item.news.cover))"
              @click="toDetail((item.secondhand&&item.secondhand._id)||(item.news&&item.news._id),item.news)"
            >
          </div>
          <div class="right">
            <div
              class="title"
              @click="toDetail((item.secondhand&&item.secondhand._id)||(item.news&&item.news._id),item.news)"
            >
              <span
                class="type"
              >{{(item.secondhand&&item.secondhand.type)||(item.news&&item.news.kind)}}</span>
              {{(item.secondhand&&item.secondhand.title)||(item.news&&item.news.title)}}
            </div>
            <div class="time">
              发布时间:
              <span>{{releaseTime((item.secondhand&&item.secondhand.createTime)||(item.news&&item.news.createTime))}}</span>
            </div>
          </div>
          <div class="collect">
            <img
              :src="i_collected"
              @click="cancelCollect((item.secondhand&&item.secondhand._id)||(item.news&&item.news._id),item.news,index)"
              alt
            >
            <div class="tip">取消收藏</div>
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
import { api_get_collect as api_get_collect_news } from "../../api/news";
import { api_get_collect as api_get_collect_secondhand } from "../../api/secondHand";
import { i_logos, i_header, i_item_detail } from "@/assets/img.js";
export default {
  name: "Collect",
  data() {
    return {
      i_search: i_header.search,
      i_collected: i_item_detail.collected,
      keyword: ""
    };
  },
  computed: {
    ...mapState("personal", ["personalCollectList"]),
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
    async cancelCollect(itemId, isNews, index) {
      isNews
        ? await api_get_collect_news(itemId)
        : await api_get_collect_secondhand(itemId);
      this.personalCollectList.splice(index, 1);
    },
    getCollectListByKeyword() {
      this.post_personalLikeList({ keyword: this.keyword });
    }
  },
  created() {
    this.post_personalLikeList({ keyword: this.keyword });
  }
};
</script>

<style lang="less" scoped>
@import url("./css/news.less");
</style>

