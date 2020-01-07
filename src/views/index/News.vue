<template>
  <div class="index-news">
    <div class="title">我的校园资讯</div>
    <div class="content">
      <!-- 搜索 -->
      <div class="search">
        <input
          type="text"
          name
          id="news-search-key"
          placeholder="请输入校园资讯标题..."
          v-model.lazy="keyword"
        >
        <label for="search-key">
          <img :src="i_search" alt>
        </label>
      </div>
      <ul v-if="personalNewsList">
        <div class="no-more" v-if="!personalNewsList.length">暂无更多数据</div>
        <li v-for="(item,index) in personalNewsList" :key="index">
          <div class="number">{{index + 1 +"."}}</div>
          <div class="left">
            <img :src="cover(item.cover)" @click="toNewsDetail(item._id)" alt>
          </div>
          <div class="right">
            <div class="title" @click="toNewsDetail(item._id)">{{item.title}}</div>
            <div class="time">
              发布时间:
              <span>{{releaseTime(item.createTime)}}</span>
            </div>
          </div>
          <div class="btns">
            <div
              class="edit-btn"
              @click="$router.push({name:'modify_news',params:{newsId:item._id}})"
            >修改</div>
            <div class="delete-btn" @click="deleteItem(index,item._id)">删除</div>
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
import { imgHeader } from "@/utils/js/config";
import { i_logos, i_header } from "@/assets/img.js";
import { api_get_deleteNews } from "../../api/news";
export default {
  data() {
    return {
      i_search: i_header.search,
      keyword: "",
      moreNews: true
    };
  },
  computed: {
    ...mapState("personal", ["personalNewsList", "newsPageIndex", "newsTotal"]),
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
      return (this.moreNews = this.newsTotal > this.newsPageIndex * 20);
    }
  },
  methods: {
    ...mapActions("personal", ["post_personalNewsList"]),
    ...mapMutations("personal", [
      "ADD_NEWS_PAGEINDEX",
      "CLEAR_PERSONAL_NEWS_LIST"
    ]),
    more() {
      if (!this.moreNews) return;
      this.ADD_NEWS_PAGEINDEX();
      this.post_personalNewsList({
        pageIndex: this.newsPageIndex,
        pageSize: 20,
        keyword: this.keyword
      });
    },
    toNewsDetail(newsId) {
      this.$router.push({ name: "news_detail", params: { newsId: newsId } });
    },
    async deleteItem(index, itemId) {
      const r = await api_get_deleteNews(itemId);
      this.personalNewsList.splice(index, 1);
    }
  },
  created() {
    this.ADD_NEWS_PAGEINDEX(false);
    this.CLEAR_PERSONAL_NEWS_LIST();
    this.post_personalNewsList({
      pageIndex: this.newsPageIndex,
      pageSize: 20,
      keyword: this.keyword
    });
  },
  watch: {
    keyword: function(newVal, oldVal) {
      this.ADD_NEWS_PAGEINDEX(false);
      this.CLEAR_PERSONAL_NEWS_LIST();
      this.post_personalNewsList({
        pageIndex: this.newsPageIndex,
        pageSize: 20,
        keyword: newVal
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./css/news.less");
</style>

