<template>
  <div class="comment">
    <div class="part-1">
      <div class="left">
        <img :src="cover(user?user.avatar:'')" alt>
      </div>
      <div class="right">
        <textarea placeholder="讲两句吧..." id="comment" rows="10" v-model="commentText"></textarea>
        <div class="user">
          <div class="name">{{user ? user.name:'您还未登录!'}}</div>
          <div class="submit" @click="releaseComment">发表评论</div>
        </div>
      </div>
    </div>
    <div class="part-2">
      <div class="left">
        <span>{{newsDetail.statics.comment}}</span>条评论
      </div>
      <div class="right">
        <span class="most-new">最新</span>
        <span class="split">/</span>
        <span class="most-hot">最热</span>
      </div>
    </div>
    <div class="part-3">
      <ul class="parent" v-if="newsComment">
        <li v-for="(comment,index) in newsComment" :key="index">
          <div class="user">
            <img :src="cover(comment.user.avatar)" alt>
            <span class="name">{{comment.user.name}}</span>
            <span class="time">{{releaseTime(comment.createTime)}}</span>
          </div>
          <p class="content">{{comment.text}}</p>
          <div class="operate">
            <div class="left">
              <span class="reply reply1" @click="comment.replyActived = !comment.replyActived">回复</span>
              <span class="number" @click="comment.showChildReply=!comment.showChildReply">
                {{comment.replyData.length}}条回复
                <img
                  :src="i_down_arrow"
                  :class="{'hide-child':comment.showChildReply}"
                >
              </span>
            </div>
            <div class="right">
              <span class="like">
                {{comment.like}}
                <img :src="i_like" alt>
              </span>
              <span class="report">
                <img :src="i_report" alt>
              </span>
            </div>
          </div>
          <div class="reply-operate" v-if="comment.replyActived">
            <textarea
              cols="30"
              rows="10"
              :placeholder="'回复: '+comment.user.name"
              v-model="replyText"
            ></textarea>
            <div class="reply-btn" @click="replyCommentOperate(comment._id,comment.userId)">回复</div>
          </div>
          <ul class="child" v-if="comment.replyData.length" v-show="comment.showChildReply">
            <li v-for="(replyComment,j) in comment.replyData" :key="j">
              <div class="user">
                <img :src="cover(replyComment.replyUser.avatar)" alt>
                <span class="name">{{replyComment.replyUser.name}}</span>
                <div
                  class="to-user"
                  v-if="replyComment.replyUser._id !== replyComment.replyToUser._id"
                >
                  <span class="tip">回复:</span>
                  <img :src="cover(replyComment.replyToUser.avatar)" alt>
                  <span class="name">{{replyComment.replyToUser.name}}</span>
                </div>
                <span class="time">{{releaseTime(replyComment.time)}}</span>
              </div>
              <p class="content">{{replyComment.text}}</p>
              <div class="operate">
                <div class="left">
                  <span
                    class="reply"
                    @click="replyComment.replyActived = !replyComment.replyActived"
                  >回复</span>
                </div>
                <div class="right">
                  <span class="like">
                    {{replyComment.like}}
                    <img :src="i_like" alt>
                  </span>
                  <span class="report">
                    <img :src="i_report" alt>
                  </span>
                </div>
              </div>
              <div class="reply-operate" v-show="replyComment.replyActived">
                <textarea
                  cols="30"
                  rows="10"
                  v-model="replyText"
                  :placeholder="'回复: '+replyComment.replyUser.name"
                ></textarea>
                <div
                  class="reply-btn"
                  @click="replyCommentOperate(comment._id,replyComment.userId)"
                >回复</div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="part-4" @click="more">{{hasMore?"加载更多":"暂无更多"}}</div>
  </div>
</template>
<script>
import { i_comment } from "@/assets/img.js";
import { mapState, mapActions, mapMutations } from "vuex";
import { imgHeader } from "@/utils/js/config.js";
import { warnTip } from "@/utils/js/tool.js";
import { formatTime } from "@/utils/js/tool.js";

export default {
  data() {
    return {
      i_user: i_comment.user,
      i_down_arrow: i_comment.downArrow,
      i_like: i_comment.like,
      i_liked: i_comment.liked,
      i_report: i_comment.report,
      commentText: "",
      replyText: "",
      moreNewsComment:true
    };
  },
  computed: {
    ...mapState("account", ["user"]),
    ...mapState("news", ["newsDetail"]),
    ...mapState("comment", ["newsComment","newsCommentPageIndex","newsCommentTotal"]),
    cover() {
      return function(cover) {
        return cover ? imgHeader + cover : imgHeader + "lij_circle_logo.png";
      };
    },
    releaseTime() {
      return function(time) {
        return formatTime(time);
      };
    },
    hasMore() {
      return (this.moreNewsComment = this.newsCommentTotal > this.newsCommentPageIndex * 6);
    }
  },
  methods: {
    ...mapActions("comment", [
      "post_newsComment",
      "post_releaseNewsComment",
      "post_replyNewsComment"
    ]),
    ...mapMutations("comment",["CLEAR_NEWS_COMMENT","ADD_NEWS_COMMENT_PAGEINDEX"]),
    releaseComment() {
      if (!this.user) {
        warnTip("您还未登录,请登录!");
        return;
      }
      if (!this.commentText) {
        warnTip("评论内容不能为空!");
        return;
      }
      this.post_releaseNewsComment({
        newsId: this.newsDetail._id,
        userId: this.user._id,
        text: this.commentText
      });
    },
    replyCommentOperate(newsCommentId, toUserId) {
      if (!this.user) {
        warnTip("您还未登录,请登录!");
        return;
      }
      if (!this.replyText) {
        warnTip("回复内容不能为空!");
        return;
      }
      this.post_replyNewsComment({
        newsCommentId,
        userId: this.user._id,
        toUserId,
        text: this.replyText
      });
    },
    more() {
      if(!this.moreNewsComment)return
      this.ADD_NEWS_COMMENT_PAGEINDEX()
      this.post_newsComment({
        pageIndex: this.newsCommentPageIndex,
        pageSize: 6,
        newsId: this.newsDetail._id
      });
    }
  },
  created() {
    this.ADD_NEWS_COMMENT_PAGEINDEX(false)
    this.CLEAR_NEWS_COMMENT()
    this.post_newsComment({
      pageIndex: 1,
      pageSize: 6,
      newsId: this.newsDetail._id
    });
  },
  mounted() {
    this.$nextTick().then(() => {
      this.$emit(
        "commentoffsettop",
        document.getElementById("comment").offsetTop
      );
    });
  },
  watch: {
    newsDetail: function(newVal, oldVal) {
      console.log("newsDetail change", newVal);
      if (newVal)
        this.ADD_NEWS_COMMENT_PAGEINDEX(false)
        this.CLEAR_NEWS_COMMENT()
        this.post_newsComment({
          pageIndex: 1,
          pageSize: 6,
          newsId: newVal._id
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./css/comment.less");
</style>
