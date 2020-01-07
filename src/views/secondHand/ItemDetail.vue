<template>
  <div class="item-detail">
    <div class="part-1" v-if="secondHandDetail">
      <div class="user">
        <div class="headImg">
          <img :src="cover(secondHandDetail.user.avatar)" alt>
        </div>
        <div class="name">{{secondHandDetail.user.name}}</div>
      </div>
      <div :class="follow" @click="followUser(secondHandDetail.user._id)">关注</div>
      <div class="view">
        浏览量：
        <span>{{secondHandDetail.statics.view}}次</span>
      </div>
      <div class="time">
        上架时间：
        <span>{{releaseTime(secondHandDetail.createTime)}}</span>
      </div>
      <div class="report" @click="showReport=true">
        <img :src="i_report" alt>举报该商品
      </div>
    </div>
    <div class="part-2" v-if="secondHandDetail">
      <div class="left">
        <div class="big">
          <img :src="cover(secondHandDetail.covers[curImgIndex])" alt>
        </div>
        <div class="little">
          <div class="left-arrow" @click="sub">
            <img :src="i_left_arrow" alt>
          </div>
          <div class="right-arrow" @click="add">
            <img :src="i_left_arrow" style="transform:rotate(180deg)" alt>
          </div>
          <ul :style="xmove">
            <li @click="checkoutImg(i)" v-for="(c,i) in secondHandDetail.covers" :key="i">
              <img :src="cover(c)" :class="{'img-actived':i===curImgIndex}">
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="title">{{secondHandDetail.title}}</div>
        <div class="price-1">
          转&nbsp;&nbsp;卖&nbsp;&nbsp;价：
          <span>￥{{secondHandDetail.price}}</span>
          <span class="talk">{{secondHandDetail.talkPrice ? '' : '不'}}可刀</span>
        </div>
        <div class="price-2">
          原&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：
          <span>￥{{secondHandDetail.originPrice}}</span>
        </div>
        <div class="split-1"></div>
        <div class="how-new">
          成&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：
          <span>{{secondHandDetail.newDegree}}%&nbsp;新</span>
        </div>
        <div class="area">
          所&nbsp;&nbsp;在&nbsp;&nbsp;地：
          <span>{{secondHandDetail.address}}</span>
        </div>
        <div class="link">
          联系方式&nbsp;：
          <span>{{secondHandDetail.link}}</span>
        </div>
        <div class="trade">
          交易方式&nbsp;：
          <span>{{secondHandDetail.dealType}}</span>
        </div>
        <div class="split-2"></div>
        <div class="collect">
          <img :src="collect" @click="collectSecondHand" alt>
          <span>{{like&&like.collect?'已收藏':'收藏'}}</span>
        </div>
      </div>
    </div>
    <div class="part-3" v-if="secondHandDetail">
      <div class="nav">
        <div class="description" @click="showComment=false" :class="{'nav-actived':!showComment}">商品详情</div>
        <div class="comment" @click="showComment=true" :class="{'nav-actived':showComment}">留言</div>
      </div>
      <div class="content">
        <div class="item-description" v-show="!showComment" v-html="secondHandDetail.description"></div>
        <div class="comment" v-show="showComment">
          <div class="part-1">
            <div class="left">
              <img :src="cover(user?user.avatar:'')" alt>
            </div>
            <div class="right">
              <textarea placeholder="给商家留言..." id="reply-boss" rows="10" v-model="text"></textarea>
              <div class="user">
                <div class="name">{{user ? user.name:'您还未登录!'}}</div>
                <div class="submit" @click="releaseSecondHandComment">留言</div>
              </div>
            </div>
          </div>
          <div class="part-2"></div>
          <ul class="part-3" v-if="comments.length">
            <li class="item" v-for="(item,index) in comments" :key="index">
              <div class="user">
                <div class="left">
                  <img :src="cover(item.user?item.user.avatar:'')" alt>
                  <span class="name">{{item.user.name}}</span>
                </div>
                <div class="right">{{formatCommentTime(item.time)}}</div>
              </div>
              <div class="text">{{item.text}}</div>
              <div class="boss-reply" v-if="item.replyText&&item.replyTime">
                <span>商家回复</span>
                <span class="time">&nbsp;（{{formatCommentTime(item.replyTime)}}）&nbsp;</span>
                <span>:</span>
                {{item.replyText}}
              </div>
            </li>
          </ul>
          <div class="have-no-data" v-else>暂无留言...</div>
        </div>
      </div>
    </div>
    <Report
      v-if="secondHandDetail"
      v-show="showReport"
      @closeReport="showReport=false"
      :reportContent="secondHandDetail"
      contentType="secondhand"
    />
  </div>
</template>
<script>
import { i_item_detail } from "@/assets/img.js";
import { mapActions, mapState } from "vuex";
import { imgHeader } from "@/utils/js/config.js";
import { formatTime01, formatTime } from "@/utils/js/tool.js";
import Report from "@/components/Report.vue";

export default {
  name: "SecondDetail",
  data() {
    return {
      i_user: i_item_detail.user,
      i_report: i_item_detail.report,
      i_left_arrow: i_item_detail.leftArrow,
      i_collect: i_item_detail.collect,
      i_collected: i_item_detail.collected,
      curImgIndex: 0,
      xStep: 0, //移动步长
      showReport: false,
      showComment: false,
      text:'', //发布留言
    };
  },
  components: {
    Report
  },
  props: {
    itemId: {
      type: String
    }
  },
  computed: {
    ...mapState("secondHand", ["secondHandDetail", "like", "comments"]),
    ...mapState("news", ["followList"]),
    ...mapState("account", ["user"]),
    cover() {
      return function(cover) {
        return cover ? imgHeader + cover : imgHeader + "lij_circle_logo.png";
      };
    },
    collect() {
      return this.like && this.like.collect ? this.i_collected : this.i_collect;
    },
    releaseTime() {
      return function(time) {
        return formatTime01(time);
      };
    },
    formatCommentTime() {
      return function(time) {
        return formatTime(time);
      };
    },
    xmove() {
      return {
        transform: "translateX(" + this.xStep * 108 + "px)"
      };
    },
    follow() {
      if (this.secondHandDetail && this.secondHandDetail.user) {
        for (let item of this.followList) {
          if (item.userFollowed === this.secondHandDetail.user._id) {
            return "unfollow";
          }
        }
      }
      return "follow";
    }
  },
  methods: {
    ...mapActions("secondHand", [
      "get_getSecondDetail",
      "get_getLike",
      "get_collect",
      "get_secondHandCommentList",
      "post_releaseSecondHandComment"
    ]),
    ...mapActions("news", ["get_followList", "get_follow"]),
    checkoutImg(i) {
      this.curImgIndex = i;
      this.xStep = this.curImgIndex > 4 ? 4 - this.curImgIndex : 0;
    },
    add() {
      this.curImgIndex === this.secondHandDetail.covers.length - 1
        ? (this.curImgIndex = 0)
        : ++this.curImgIndex;
      this.xStep = this.curImgIndex > 4 ? 4 - this.curImgIndex : 0;
    },
    sub() {
      this.curImgIndex === 0
        ? (this.curImgIndex = this.secondHandDetail.covers.length - 1)
        : --this.curImgIndex;
      this.xStep = this.curImgIndex > 4 ? 4 - this.curImgIndex : 0;
    },
    // 关注\取消关注
    followUser(userFollowed) {
      this.get_follow(userFollowed);
    },
    // 收藏二手物品
    collectSecondHand() {
      this.get_collect(this.itemId);
    },
    // 发布留言
    releaseSecondHandComment(){
      this.post_releaseSecondHandComment({
        secondHandId:this.itemId,
        text:this.text
      })
    }
  },
  created() {
    this.get_getSecondDetail(this.itemId);
    this.get_followList();
    this.get_getLike(this.itemId);
    this.get_secondHandCommentList(this.itemId);
  }
};
</script>

<style lang="less" scoped>
@import url(./css/itemDetail.less);
</style>
