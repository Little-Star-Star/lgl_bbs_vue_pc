<template>
  <div class="clipper-img">
    <div class="wrapper">
      <div class="title">
        <div class="logo">
          <img :src="i_logo" alt>
        </div>
        <div class="tip">修改头像</div>
        <img :src="i_close" alt class="close" @click="closeClipper">
      </div>
      <div class="clipper">
        <clipper-fixed
          class="my-clipper"
          :src="imgURL"
          ref="clipper"
          preview="my-preview"
          bg-color="#666"
          :style="canClick"
          :ratio="ratio"
          style="height:360px"
        >
          <div class="placeholder" slot="placeholder">No image</div>
        </clipper-fixed>
      </div>
      <form class="right" @submit.prevent="mySubmit" enctype="multipart/form-data" method="post">
        <div class="preview">
          <div class="tip">预览：</div>
          <div class="preview-img">
            <div
              class="part-1"
              :style="previewImgHeight"
            >
              <clipper-preview name="my-preview"/>
            </div>
            <div class="part-2">
              <div class="wrapper-btn">
                <img :src="i_open_local_img" alt class="select-local-img">
                <span class="select-local-img-tip">浏览</span>
                <input type="file" name="upload" @change="upload($event)" id="select-input">
              </div>
              <div class="img-limit">仅支持上传2M以内的PNG、JPG图片</div>
            </div>
          </div>
        </div>
        <div class="btns" :style="btnMargin">
          <input type="submit" value="确定" class="confirm-btn" :style="canClick">
          <div class="cancel-btn" @click="closeClipper()" :style="canClick">取消</div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { i_logos, i_clipper } from "@/assets/img.js";
import { warnTip } from "@/utils/js/tool.js";

const vue_window = window;
export default {
  data() {
    return {
      i_logo: i_logos.rect_logo,
      i_close: i_clipper.close,
      i_open_local_img: i_clipper.openLocalImg,
      imgURL: "",
      uploadImg: "",
      vue_window,
      banBtns: true
    };
  },
  props: {
    ratio: {
      type: Number,
      default: 1
    }
  },
  computed: {
    // 未选择图片时,为未选中状态
    canClick() {
      return this.banBtns ? { cursor: "not-allowed" } : {};
    },
    previewImgHeight(){
      let ratio = 1
      if(this.ratio === 1.5){
        ratio = 1.7
      }else{
        ratio = this.ratio
      }
      return {height:120/ratio + 'px'}
    },
    btnMargin(){
      return this.ratio < 1 ? {margin:'50px 50px'} : {}
    }
  },
  methods: {
    upload: function(e) {
      if (e.target.files.length !== 0) {
        console.log(e.target.files[0]);
        if (!["image/jpeg", "image/png"].includes(e.target.files[0].type)) {
          warnTip("仅支持PNG、JPG");
          this.imgURL = "";
          this.banBtns = true;
          return;
        } else {
          this.banBtns = false;
        }
        this.imgURL = window.URL.createObjectURL(e.target.files[0]);
      }
    },
    mySubmit() {
      if (!this.imgURL) {
        warnTip("请选择一张图片");
        return;
      }
      const canvas = this.$refs.clipper.clip();
      // 返回剪切的canvas给父组件,让父组件,自行处理
      this.$emit("clipCanvas", canvas);
      this.closeClipper();
    },
    closeClipper() {
      this.$emit("hideClipper");
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./css/clipper.less");
</style>
