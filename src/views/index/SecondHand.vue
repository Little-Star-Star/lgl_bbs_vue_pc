<template>
  <div class="index-secondhand">
    <div class="title">我的二手物品</div>
    <div class="content">
      <!-- 搜索 -->
      <div class="search">
        <input
          type="text"
          name
          id="news-search-key"
          placeholder="请输入资讯标题..."
          v-model.lazy="keyword"
        >
        <label for="search-key">
          <img :src="i_search" alt>
        </label>
      </div>
      <ul v-if="personalSecondHandList">
        <div class="no-more" v-if="!personalSecondHandList.length">暂无更多数据</div>
        <li v-for="(item,index) in personalSecondHandList" :key="index">
          <div class="number">{{index + 1 +"."}}</div>
          <div class="left">
            <img
              :src="cover(item.covers.length?item.covers[0]:'lij_logo_circle.png')"
              @click="toSecondHandDetail(item._id)"
              alt
            >
          </div>
          <div class="right">
            <div class="title" @click="toSecondHandDetail(item._id)">{{item.title}}</div>
            <div class="time">
              发布时间:
              <span>{{releaseTime(item.createTime)}}</span>
            </div>
          </div>
          <div class="btns">
            <div
              class="edit-btn"
              @click="$router.push({name:'modify_secondhand',params:{secondHandId:item._id}})"
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
import { i_logos, i_header } from "@/assets/img.js";
import { formatTime01 } from "@/utils/js/tool";
import { api_get_deleteSecondHand } from "../../api/secondHand";
import { imgHeader } from "@/utils/js/config";
export default {
  name: "MySecondHand",
  data() {
    return {
      i_search: i_header.search,
      keyword: "",
      moreSecondHand: true
    };
  },
  computed: {
    ...mapState("personal", [
      "personalSecondHandList",
      "secondHandPageIndex",
      "secondHandTotal"
    ]),
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
      return (this.moreSecondHand =
        this.secondHandTotal > this.secondHandPageIndex * 20);
    }
  },
  methods: {
    ...mapActions("personal", ["post_personalSecondHandList"]),
    ...mapMutations("personal", [
      "ADD_SECONDHAND_PAGEINDEX",
      "CLEAR_PERSONAL_SECONDHAND_LIST"
    ]),
    toSecondHandDetail(itemId) {
      this.$router.push({ name: "item_detail", params: { itemId: itemId } });
    },
    async deleteItem(index, secondHandId) {
      const r = await api_get_deleteSecondHand(secondHandId);
      this.personalSecondHandList.splice(index, 1);
    },
    more() {
      if (!this.moreSecondHand) return;
      this.ADD_SECONDHAND_PAGEINDEX();
      this.CLEAR_PERSONAL_SECONDHAND_LIST();
      this.post_personalSecondHandList({
        pageIndex: this.secondHandPageIndex,
        pageSize: 20,
        keyword: this.keyword
      });
    }
  },
  created() {
    this.ADD_SECONDHAND_PAGEINDEX(false);
    this.CLEAR_PERSONAL_SECONDHAND_LIST();
    this.post_personalSecondHandList({
      pageIndex: this.secondHandPageIndex,
      pageSize: 20,
      keyword: this.keyword
    });
  },
  watch: {
    keyword: function(newVal, oldVal) {
      this.ADD_SECONDHAND_PAGEINDEX(false);
      this.CLEAR_PERSONAL_SECONDHAND_LIST();
      this.post_personalSecondHandList({
        pageIndex: this.secondHandPageIndex,
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

