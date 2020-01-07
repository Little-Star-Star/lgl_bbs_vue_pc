<template>
  <div class="share">
    <Affix :offset-top="80">
      <div class="tip">—分享—</div>
      <ul>
        <li>
          <img
            @mouseenter="hoverWechat=true"
            @mouseout="hoverWechat=false"
            :src="hoverWechat?i_wechat_actived:i_wechat"
          >
          <div class="qrcode-right" v-show="hoverWechat"><qrcode :value="qrValue" :options="{ width: 200 }"></qrcode><div class="qrcode-tip">请使用微信扫一扫<br/>进行分享</div></div>
        </li>
        <li>
          <img
            @mouseenter="hoverQQ=true"
            @mouseout="hoverQQ=false"
            @mouseover="generateQRCode"
            :src="hoverQQ?i_qq_actived:i_qq"
            @click="shareQQ"
            title="分享到QQ"
          >
        </li>
        <li>
          <img
            @mouseenter="hoverSpace=true"
            @mouseout="hoverSpace=false"
            :src="hoverSpace?i_space_actived:i_space"
            @click="shareSpace"
            title="分享到QQ空间"
          >
        </li>
        <li>
          <img
            @mouseenter="hoverWeibo=true"
            @mouseout="hoverWeibo=false"
            :src="hoverWeibo?i_weibo_actived:i_weibo"
            @click="shareWeibo"
            title="分享到微博"
          >
        </li>
      </ul>
      <div class="tip2">—评论—</div>
      <div class="comment">
        <img
          @mouseenter="hoverComment=true"
          @mouseout="hoverComment=false"
          :src="hoverComment?i_comment_actived:i_comment"
          @click="scrollToComment"
        >
        <span v-if="newsDetail">{{newsDetail.statics.comment}}</span>
      </div>
    </Affix>
  </div>
</template>
<script>
import { i_share } from "@/assets/img.js";
import { setTimeout } from "timers";
import { mapState } from "vuex";
import { imgHeader } from "../utils/js/config";
// import "../views/news/qrcode.js";
const win = window;
export default {
  data() {
    return {
      i_wechat: i_share.wechat,
      i_wechat_actived: i_share.wechatActived,
      i_qq: i_share.qq,
      i_qq_actived: i_share.qqActived,
      i_space: i_share.space,
      i_space_actived: i_share.spaceActived,
      i_weibo: i_share.weibo,
      i_weibo_actived: i_share.weiboActived,
      i_comment: i_share.comment,
      i_comment_actived: i_share.commentActived,
      hoverWechat: false,
      hoverQQ: false,
      hoverSpace: false,
      hoverWeibo: false,
      hoverComment: false,
      qrValue:location.href
    };
  },
  props: {
    commentTop: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState("news", ["newsDetail"])
  },
  methods: {
    scrollToComment() {
      document.documentElement.scrollTop = this.commentTop;
    },
    shareQQ() {
      let URL = location.href,
        TITLE = this.newsDetail.title,
        IMAGE = imgHeader + this.newsDetail.cover,
        SUMMARY = this.newsDetail.content;
      win.open(
        `http://connect.qq.com/widget/shareqq/index.html?url=${URL}&title=${TITLE}&pics=${IMAGE}&summary="${SUMMARY}"`
      );
    },
    shareWeibo() {
      let URL = location.href,
        TITLE = this.newsDetail.title,
        IMAGE = imgHeader + this.newsDetail.cover,
        SUMMARY = this.newsDetail.content;
      win.open(
        `https://service.weibo.com/share/share.php?url=${URL}&title=${TITLE}&pic=${IMAGE}`
      )
    },
    shareSpace() {
      let URL = location.href,
        TITLE = this.newsDetail.title,
        IMAGE = imgHeader + this.newsDetail.cover,
        DESCRIPTION = "",
        SUMMARY = this.newsDetail.content;
      win.open(
        `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${URL}&title=${TITLE}&desc=${DESCRIPTION}&summary=${SUMMARY}&pics=${IMAGE}`
      );
    },
  },
  mounted() {
    if (this.$route.fullPath.includes("#comment")) {
      setTimeout(() => {
        document.documentElement.scrollTop = this.commentTop;
        console.log(this.commentTop);
      }, 500);
    }
  }
};
</script>

<style lang="less" scoped>
@import url(./css/share.less);
</style>
<style lang="less">
#app .share > div > div:nth-child(1) {
  border-right: 1px solid #f5c4da;
  width: 140px;
}
</style>

