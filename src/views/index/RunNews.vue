<template>
  <div class="index-news">
    <div class="title">管理所有校园资讯</div>
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
      <ul v-if="adminNewsList">
        <div class="no-more" v-if="!adminNewsList.length">暂无更多数据</div>
        <li v-for="(item,index) in adminNewsList" :key="index">
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
            <div class="delete-btn" @click="deleteItem(index,item._id)">删除</div>
          </div>
        </li>
      </ul>
       <Page
        :total="adminSecondHandotal"
        :page-size="20"
        :current="adminNewsPageIndex"
        show-elevator
        @on-change="changePage"
      ></Page>
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
  name:'RunNews',
  data() {
    return {
      i_search: i_header.search,
      keyword: "",
      moreNews: true
    };
  },
  computed: {
    ...mapState("personal", ["adminNewsList", "adminNewsPageIndex", "adminSecondHandotal"]),
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
  },
  methods: {
    ...mapActions("personal", ["post_adminNewsList"]),
    ...mapMutations("personal", [
      "ADD_ADMIN_NEWS_PAGEINDEX",
      "CLEAR_ADMIN_NEWS_LIST"
    ]),
    changePage(page){
      this.ADD_ADMIN_NEWS_PAGEINDEX(page);
      this.CLEAR_ADMIN_NEWS_LIST();
      this.post_adminNewsList({
        pageIndex: this.adminNewsPageIndex,
        pageSize: 20,
        keyword: this.keyword
      });
    },
    toNewsDetail(newsId) {
      this.$router.push({ name: "news_detail", params: { newsId: newsId } });
    },
    async deleteItem(index, itemId) {
      const r = await api_get_deleteNews(itemId);
      this.adminNewsList.splice(index, 1);
    }
  },
  created() {
    this.ADD_ADMIN_NEWS_PAGEINDEX(false);
    this.CLEAR_ADMIN_NEWS_LIST();
    this.post_adminNewsList({
      pageIndex: this.adminNewsPageIndex,
      pageSize: 20,
      keyword: this.keyword
    });
  },
  watch: {
    keyword: function(newVal, oldVal) {
      this.ADD_ADMIN_NEWS_PAGEINDEX(false);
      this.CLEAR_ADMIN_NEWS_LIST();
      this.post_adminNewsList({
        pageIndex: this.adminNewsPageIndex,
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

