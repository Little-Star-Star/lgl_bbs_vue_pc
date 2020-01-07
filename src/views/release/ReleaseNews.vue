<template>
  <div class="release-news">
    <div class="content">
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">标题</span>
          <span class="text">长度在50个字符以内</span>
        </div>
        <input type="text" v-model="title" maxlength="50">
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">资讯类型</span>
          <span class="text">请输入资讯类型(默认为:"校园资讯"),只能填写一个且在4个字符以内</span>
        </div>
        <input type="text" maxlength="4" v-model="kind">
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">关键字</span>
          <span class="text">请输入2-8个关键字,且每个关键字长度最多为10--请以 '|' 进行分割.例如:(游戏|校园)</span>
        </div>
        <input type="text" placeholder="例：游戏|校园" v-model="keyword">
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">封面</span>
          <span class="text">请上传资讯封面,图片类型为PNG,JPG格式且大小小于2M(默认封面为logo)</span>
        </div>
        <div class="upload">
          <img :src="newsCover" id="releaseNewsCover">
          <div class="upload-btn" @click="showClipper=true">上传</div>
        </div>
      </div>
      <div class="part editor">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">资讯详细内容</span>
          <span class="text">请编辑资讯详细内容...</span>
        </div>
        <Editor :m_text="m_text"/>
      </div>
      <div class="btn" @click="releaseNews">{{newsId?"修改资讯" : "发布资讯"}}</div>
    </div>
    <Clipper
      v-show="showClipper"
      @hideClipper="showClipper=false"
      @clipCanvas="uploadImg"
      :ratio="1.5"
    />
  </div>
</template>

<script>
import Editor from "./Editor.vue";
import Clipper from "@/components/Clipper.vue";
import { generateUUID, successTip, errTip } from "@/utils/js/tool.js";
import axios from "axios";
import { api_post_releaseNews } from "../../api/release";
import { api_get_getNewsDetail, api_post_modifyNews } from "../../api/news";
import { imgHeader } from "../../utils/js/config";
const vue_window = window;
export default {
  data() {
    return {
      title: "",
      kind: "校园资讯",
      keyword: "",
      cover: "lij_rect_logo.png",
      showClipper: false,
      m_text: ""
    };
  },
  props: {
    newsId: {
      type: String,
      default: ""
    }
  },
  components: {
    Editor,
    Clipper
  },
  computed: {
    newsCover() {
      return imgHeader + this.cover;
    }
  },
  methods: {
    async uploadImg(canvas) {
      console.log(canvas);
      let _this = this;
      _this.cover = generateUUID() + ".jpg";
      canvas.toBlob(async function(blob) {
        let newImgFile = new vue_window.File([blob], _this.cover, {
          type: blob.type
        });
        let newForm = new vue_window.FormData();
        newForm.append("file", newImgFile);
        const r = await axios.post("/private/upload/img/news", newForm);
        _this.cover = "news/" + _this.cover;
        let { code, msg } = r.data;
        if (code === "success") {
          successTip(msg);
        } else if (code === "fail") {
          errTip(msg);
        }
      }, "image/jpeg");
    },
    releaseNews() {
      if (this.newsId) {
        api_post_modifyNews({
          newsId: this.newsId,
          keyword: this.keyword.split("|"),
          title: this.title,
          kind: this.kind,
          content: vue_window.editor.txt.html(),
          cover: this.cover
        });
      } else {
        api_post_releaseNews({
          keyword: this.keyword.split("|"),
          title: this.title,
          kind: this.kind,
          content: vue_window.editor.txt.html(),
          cover:this.cover
        });
      }
    }
  },
  async created() {
    // 说明作为个人校园资讯修改组件使用
    if (this.newsId) {
      const r = await api_get_getNewsDetail(this.newsId);
      if (r) {
        this.title = r.title;
        this.kind = r.kind;
        this.keyword = r.keyword.join("|");
        this.cover = r.cover;
        this.m_text = r.content;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./css/releaseNews.less");
</style>
