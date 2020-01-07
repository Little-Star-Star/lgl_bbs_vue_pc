<template>
  <div class="report">
    <div class="wrapper">
      <div class="close"><img :src="i_close" alt="" @click="closeReport"></div>
      <div class="part-1">举报\投诉</div>
      <div class="part-2" v-if="reportContent.user">
          <div class="left"><span class="tip">举报内容:</span><span class="text">{{reportText(reportContent.title)}}</span></div>
          <div class="right"><span class="tip">内容作者:</span><span class="text">{{reportContent.user.name}}</span></div>
      </div>
      <div class="part-3">
        <div class="left">
          <Radio-group v-model="summary" class="my-radio">
            <Radio label="sex">色情低俗</Radio>
            <Radio label="false">内容不实</Radio>
            <Radio label="illegal">违法信息</Radio>
            <Radio label="fraud">诈骗信息</Radio>
            <Radio label="advertise">垃圾营销</Radio>
            <Radio label="copy">内容抄袭</Radio>
            <Radio label="else">其他</Radio>
          </Radio-group>
        </div>
        <div class="right"><textarea name="" id="" cols="30" rows="10" v-model="description" placeholder="具体举报原因" maxlength="1000"></textarea></div>
      </div>
      <div class="part-4">
        <div class="confirm-btn" @click="report">举报</div>
        <div class="cancel-btn" @click="closeReport">取消</div>
      </div>
    </div>
  </div>
</template>

<script>

import {i_clipper} from '@/assets/img'
import {api_post_report} from '@/api/news'
export default {
    data() {
        return {
            // type:'news',
            summary:'',
            description:'',
            i_close:i_clipper.close,
        }
    },
    props:{
        contentType:{
            type:String,
            default:'news'
        },
        reportContent:{
          type:Object,
        }
    },
    computed:{
      reportText(){
        return function(title){
          if(!title)return
          return title.length > 20 ? title.slice(0,20)+'...' : title
        }
      }
    },
    methods: {
        closeReport(){
            this.$emit('closeReport')
        },
        report(){
          api_post_report({
            reportedId:this.reportContent._id,
            type:this.contentType,
            summary:this.summary,
            description:this.description
          })
          this.closeReport()
        }
    },
};
</script>
<style lang="less" scoped>
@import url("./css/report.less");
</style>
