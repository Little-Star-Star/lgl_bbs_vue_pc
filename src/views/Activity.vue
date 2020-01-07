<template>
  <div class="activity" style="background:url('/img/activity-bg.png') 100%" v-if="activityDetail">
    <div class="part-1">
      <div class="activity-tip">校园活动</div>
      <div class="info">
        <div class="left">
          <img :src="activityCover(activityDetail.cover)" alt>
        </div>
        <div class="right">
          <div class="title">
            <span class="tip">活动主题：</span>
            <span class="text">{{activityDetail.title}}</span>
          </div>
          <div class="address">
            <span class="tip">活动地点：</span>
            <span class="text">{{activityDetail.address}}</span>
          </div>
          <div class="time">
            <span class="tip">活动时间：</span>
            <span class="text">{{activityDetail.time}}</span>
          </div>
          <div class="host">
            <span class="tip">主办方：</span>
            <span class="text">{{activityDetail.host}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="part-2">
      <div class="split"></div>
      <div class="title">活动详情</div>
      <div class="content" v-html="activityDetail.description"></div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { imgHeader } from "@/utils/js/config.js";

export default {
  props: {
    activityId: {
      type: String
    }
  },
  computed: {
    ...mapState('activity',['activityDetail']),
    activityCover(){
      return function(cover){
        return imgHeader + cover
      }
    }
  },
  methods:{
    ...mapActions('activity',["get_activity"])
  },
  created(){
    this.get_activity(this.activityId)
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/flex.less);
.activity {
  border-top: 1px solid #f1f1f1;
  margin-bottom: 50px;
  .part-1 {
    padding: 40px 0 0;
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
    background: @c_grey7;
    .activity-tip {
      font-size: 30px;
      color: @c_grey2;
      font-family: "light_700";
      margin-bottom: 30px;
    }
    .info {
      .myflex();
      .left {
        margin-left: 50px;
        img {
          background: @c_grey7;
          height: 400px;
        }
      }
      .right {
        > .title,
        .time,
        .address,
        .host {
          color: @c_grey2;
          font-size: 24px;
          font-family: "light_700";
        }
        > .title {
          margin-top: 20px;
        }
        .address,
        .time {
          margin-top: 30px;
        }

        .host {
          margin-top: 30px;
        }
        height: 100%;
        display: inline-block;
        flex: 1;
        margin: 0px 30px;
        text-align: left;
      }
    }
  }
  .part-2 {
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
    min-height: 400px;
    background: @c_grey7;
    padding: 20px 0;
    .split {
      margin: 30px 0;
      height: 10px;
      background: linear-gradient(
        45deg,
        #f6f6f6 48%,
        #999 48%,
        #999 52%,
        #f6f6f6 52%
      );
      background-size: 16px 10px;
    }
    > .title {
      font-size: 30px;
      color: @c_grey2;
      font-family: "light_700";
      margin-top: 60px;
    }
    > .content {
      margin: 30px 50px;
      background: #fff;
      padding: 30px 50px;
      text-align: left;
    }
  }
}
</style>

