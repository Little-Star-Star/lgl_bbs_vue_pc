<template>
  <div class="hot-topic">
    <div class="content">
      <div class="title">
        <div class="tip">热门话题</div>
        <div class="change" @click="changeHotTopic()">
          <img :src="i_change_one" alt>换一换
        </div>
      </div>
      <ul v-if="hotTopicList">
        <li :style="dot" :title="val.title" v-for="(val,i) in hotTopicList" :key="i">
          <a :href="toDetail(val._id)">{{val.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { i_hot_topic } from "@/assets/img.js";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      i_change_one: i_hot_topic.changeOne,
      i_dot: i_hot_topic.dot,
      pageIndex: 1
    };
  },
  computed: {
    ...mapState("news", ["hotTopicList"]),
    dot() {
      return {
        background: `url(${this.i_dot}) -10px -9px / 40px auto no-repeat`
      };
    },
    toDetail(){
      return function(newsId){
        return '/news/detail/' + newsId
      }
    }
  },
  methods: {
    ...mapActions("news", ["post_getHotTopic"]),
    changeHotTopic(){
      if(this.hotTopicList&&!this.hotTopicList.length)this.pageIndex=1
      this.post_getHotTopic({
        pageIndex:++this.pageIndex,
        pageSize:10
      })
    }
  },
  created() {
    this.post_getHotTopic({
      pageIndex: this.pageIndex,
      pageSize: 10
    });
  }
};
</script>

<style lang="less" scoped>
@import url("./css/hotTopic.less");
</style>
