<template>
  <div class="index-news">
    <div class="title">管理所有二手物品</div>
    <div class="content">
      <!-- 搜索 -->
      <div class="search">
        <input
          type="text"
          name
          id="news-search-key"
          placeholder="请输入二手物品标题..."
          v-model.lazy="keyword"
        >
        <label for="search-key">
          <img :src="i_search" alt>
        </label>
      </div>
      <ul v-if="adminSecondHandList">
        <div class="no-more" v-if="!adminSecondHandList.length">暂无更多数据</div>
        <li v-for="(item,index) in adminSecondHandList" :key="index">
          <div class="number">{{index + 1 +"."}}</div>
          <div class="left">
            <img :src="cover(item.covers[0])" @click="toSecondHandDetail(item._id)" alt>
          </div>
          <div class="right">
            <div class="title" @click="toSecondHandDetail(item._id)">{{item.title}}</div>
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
        :total="adminSecondHandTotal"
        :page-size="20"
        :current="adminSecondHandPageIndex"
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
  name:'RunSecondHand',
  data() {
    return {
      i_search: i_header.search,
      keyword: "",
      moreNews: true
    };
  },
  computed: {
    ...mapState("personal", ["adminSecondHandList", "adminSecondHandPageIndex", "adminSecondHandTotal"]),
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
    ...mapActions("personal", ["post_adminSecondHandList"]),
    ...mapMutations("personal", [
      "ADD_ADMIN_SECONDHAND_PAGEINDEX",
      "CLEAR_ADMIN_SECONDHAND_LIST"
    ]),
    changePage(page){
      this.ADD_ADMIN_SECONDHAND_PAGEINDEX(page);
      this.CLEAR_ADMIN_SECONDHAND_LIST();
      this.post_adminSecondHandList({
        pageIndex: this.adminSecondHandPageIndex,
        pageSize: 20,
        keyword: this.keyword
      });
    },
    toSecondHandDetail(itemId) {
      this.$router.push({ name: "item_detail", params: { itemId: itemId} });
    },
    async deleteItem(index, itemId) {
      const r = await api_get_deleteNews(itemId);
      this.adminSecondHandList.splice(index, 1);
    }
  },
  created() {
    this.ADD_ADMIN_SECONDHAND_PAGEINDEX(false);
    this.CLEAR_ADMIN_SECONDHAND_LIST();
    this.post_adminSecondHandList({
      pageIndex: this.adminSecondHandPageIndex,
      pageSize: 20,
      keyword: this.keyword
    });
  },
  watch: {
    keyword: function(newVal, oldVal) {
      this.ADD_ADMIN_SECONDHAND_PAGEINDEX(false);
      this.CLEAR_ADMIN_SECONDHAND_LIST();
      this.post_adminSecondHandList({
        pageIndex: this.adminSecondHandPageIndex,
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

