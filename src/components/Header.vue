<template>
  <div class="header">
    <div class="nav">
      <div class="home">
        <img :src="i_brand" @click="$router.push('/news')">
        <a href="/news">BBS</a>
      </div>
      <!-- 各种内容 -->
      <ul class="left">
        <li class="item" v-for="(item,key,index) in nav" :key="index">
          <router-link :to="item.router">{{item.name}}</router-link>
        </li>
      </ul>
      <!-- 搜索 -->
      <div class="search">
        <input type="text" name id="search-key" placeholder="关键词搜索..." v-model.lazy="searchKeyword">
        <label for="search-key">
          <img :src="i_search" alt>
        </label>
      </div>
      <!-- 个人信息相关 -->
      <div class="right" v-if="user">
        <div class="edit" title="信息发布" @click="$router.push({'name':'release_news'})">
          <img :src="i_edit">
        </div>
        <!-- 点击头像去到个人主页 -->
        <div class="self">
          <img
            :src="headImg(user.avatar)"
            @click="$router.push(self.index.router)"
            @mouseenter="show_self_items=true"
          >
          <ul title="个人主页" v-show="show_self_items" @mouseleave="show_self_items=false">
            <li class="item" v-for="(item2,k2,index2) in self" :key="index2" :title="item2.name">
              <router-link :to="item2.router">{{item2.name}}</router-link>
            </li>
            <li class="item" @click="logout"><a href=''>退出登录</a></li>
          </ul>
        </div>
      </div>
      <div class="login-register" v-else>
        <div class="login">
          <router-link to="/account/login">登录</router-link>
        </div>
        <div class="register">
          <router-link to="/account/register">注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { i_logos, i_header } from "@/assets/img.js";
import { imgHeader } from "@/utils/js/config.js";
export default {
  data() {
    return {
      i_brand: i_logos.rect_logo,
      i_search: i_header.search,
      i_edit: i_header.edit,
      i_self: i_logos.circle_logo,
      show_self_items: false,
      searchKeyword:''
    };
  },
  computed: {
    ...mapState(["nav", "self"]),
    ...mapState("account", ["user"]),
    ...mapState('news',['newsKeyword']),
    headImg() {
      return function(avatar) {
        return imgHeader + avatar;
      };
    }
  },
  methods: {
    ...mapActions("account", ["logout"]),
    ...mapMutations("account",["SET_USER_INFO"]),
    ...mapMutations("news",["GET_MOST_NEW_NEWS","SET_SHOW_MOST_HOT_NEWS","SET_KEYWORD_SEARCH"]),
    search(){
      
    }
  },
  created(){
    // 先试图从本地读取user信息
    this.SET_USER_INFO(JSON.parse(localStorage.getItem('user')))
  },
  watch:{
    searchKeyword:function(newVal,oldVal){
      this.GET_MOST_NEW_NEWS({data:[],page:{pageIndex:1,pageSize:6}})
      this.SET_KEYWORD_SEARCH(this.searchKeyword)
      this.SET_SHOW_MOST_HOT_NEWS(this.searchKeyword==='')
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./css/header.less");
</style>
