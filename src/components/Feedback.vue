<template>
  <div class="feedback">
    <div class="content">
      <div class="title">
        反馈
        <img :src="i_feedback" alt>
      </div>
      <div class="split"></div>
      <div class="type">
        <Radio-group v-model="type">
          <Radio label="bug">错误</Radio>
          <Radio label="function">功能建议</Radio>
          <Radio label="else">其他</Radio>
        </Radio-group>
      </div>
      <div class="feedback-content">
        <textarea id="feedback-content" v-model="text" placeholder="最多允许输入500字符" maxlength="500" cols="30" rows="12"></textarea>
      </div>
      <div class="email">
        <label for="email">联系方式：<input v-model="link" type="text" placeholder="请输入联系方式..." id="email"></label>
      </div>
      <div class="submit-feedback" @click="feedback">提交反馈</div>
    </div>
  </div>
</template>

<script>
import { i_feedback } from "@/assets/img.js";
import {api_post_feedback} from '@/api/news.js'
import {warnTip} from '@/utils/js/tool'
export default {
  data() {
    return {
      type: "bug",
      text:'',
      link:'',
      i_feedback: i_feedback.feedback,
    };
  },
  methods:{
    feedback(){
      if(!this.text){
        warnTip('反馈内容不能为空')
        return 
      }
      api_post_feedback({
        type:this.type,
        text:this.text,
        link:this.link 
      })
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./css/feedback.less");
</style>
