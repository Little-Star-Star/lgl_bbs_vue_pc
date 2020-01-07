<template>
  <div class="release-activity">
    <div class="content">
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">活动标题</span>
          <span class="text">长度在50个字符以内</span>
        </div>
        <input type="text"  v-model="title">
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">活动时间</span>
          <span class="text">请输入校园活动的举办时间</span>
        </div>
        <input type="text" v-model="time">
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">活动地点</span>
          <span class="text">请输入校园活动的举办地点</span>
        </div>
        <input type="text" v-model="address">
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">主办方</span>
          <span class="text">请输入校园活动的主办方,赞助商</span>
        </div>
        <input type="text" v-model="host">
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">活动导航</span>
          <span class="text">用于轮播图导航(1920px*384px),图片类型为PNG,JPG格式且大小小于5M</span>
        </div>
        <div class="upload">
          <img :src="bannerCover" style="height:180px;width:900px;" id="cover">
          <div class="upload-btn" @click="showClipper1=true">上传</div>
        </div>
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">活动海报</span>
          <span class="text">请上传活动海报(280px*400px),图片类型为PNG,JPG格式且大小小于5M</span>
        </div>
        <div class="upload">
          <img :src="activityCover" id="cover">
          <div class="upload-btn" @click="showClipper2=true">上传</div>
        </div>
      </div>
      <div class="part editor">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">活动详情</span>
          <span class="text">请编辑活动详细内容...</span>
        </div>
        <Editor/>
      </div>
      <div class="btn" @click="releaseActivity">发布校园活动</div>
    </div>
    <Clipper
      v-show="showClipper1"
      @hideClipper="showClipper1=false"
      @clipCanvas="uploadNavCover"
      :ratio="5"
    />
    <Clipper
      v-show="showClipper2"
      @hideClipper="showClipper2=false"
      @clipCanvas="uploadCover"
      :ratio="0.7"
    />
  </div>
</template>
<script>
import Editor from "./Editor.vue";
import Clipper from "@/components/Clipper.vue";
import { generateUUID, successTip, errTip } from "@/utils/js/tool.js";
import axios from "axios";
import { api_post_releaseActivity } from "../../api/release";
import { imgHeader } from "../../utils/js/config";
const vue_window = window;
export default {
  data() {
    return {
      cover: "lij_circle_logo.png",
      navCover:'lij_circle_logo.png',
      title: "",
      address: "",
      time: "",
      host: "",
      description:'暂无更多活动相关介绍...',
      showClipper1: false,
      showClipper2: false
    };
  },
  components: {
    Editor,
    Clipper
  },
  computed:{
    activityCover(){
      return imgHeader + this.cover 
    },
    bannerCover(){
      return imgHeader + this.navCover
    }
  },
  methods: {
    async uploadNavCover(canvas) {
      console.log(canvas);
      let _this = this;
      let url = generateUUID() + ".jpg";
      canvas.toBlob(async function(blob) {
        let newImgFile = new vue_window.File([blob], url, {
          type: blob.type
        });
        let newForm = new vue_window.FormData();
        newForm.append("file", newImgFile);
        const r = await axios.post("/private/upload/img/activity", newForm);
        let { code, msg } = r.data;
        if (code === "success") {
          _this.navCover = 'activity/'+url
          successTip(msg);
        } else if (code === "fail") {
          errTip(msg);
        }
      }, "image/jpeg");
    },
    async uploadCover(canvas) {
      console.log(canvas);
      let _this = this;
      let url = generateUUID() + ".jpg";
      canvas.toBlob(async function(blob) {
        let newImgFile = new vue_window.File([blob], url, {
          type: blob.type
        });
        let newForm = new vue_window.FormData();
        newForm.append("file", newImgFile);
        const r = await axios.post("/private/upload/img/activity", newForm);
        let { code, msg } = r.data;
        if (code === "success") {
          _this.cover = 'activity/'+url
          successTip(msg);
        } else if (code === "fail") {
          errTip(msg);
        }
      }, "image/jpeg");
    },
    releaseActivity() {
      api_post_releaseActivity({
        cover:this.cover,
        navCover:this.navCover,
				title:this.title,
				address:this.address,
				time:this.time,
				host:this.host,
        description:this.description =  vue_window.editor.txt.text() ? vue_window.editor.txt.html() : this.description,
      })
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./css/releaseActivity.less");
</style>
