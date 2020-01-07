<template>
  <div class="base-info">
    <div class="content" v-if="user">
      <div class="headImg">
        <div class="tip">
          头像
          <span>请上传2MB以内的JPG、PNG图片</span>
        </div>
        <div class="upload">
          <img :src="headImg(user.avatar)" id="avatar">
          <div class="upload-btn" @click="showClipper=true">上传</div>
        </div>
      </div>
      <div class="name">
        <div class="tip">
          名称
          <span class="important">*</span>
          <span>长度在15字符以内，不支持空白字符，不可使用已存在昵称</span>
        </div>
        <input type="text" id="user-name" maxlength="15" v-model="user.name">
      </div>
      <div class="speciality">
        <div class="tip">
          专业
          <span class="important">*</span>
        </div>
        <Select v-model="user.specialty" style="width:200px">
          <Option v-for="item in specialitys" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </div>
      <div class="description">
        <div class="tip">
          自我描述
          <span class="important">*</span>
          <span>长度请保持在254字符以内</span>
        </div>
        <textarea name id cols="30" rows="10" maxlength="254" v-model="user.description"></textarea>
      </div>
      <div class="save-btn" @click="updateUserInfo">保存</div>
    </div>
    <Clipper v-show="showClipper" @hideClipper="showClipper=false" @clipCanvas="uploadImg"/>
  </div>
</template>

<script>
import { i_person_header } from "@/assets/img.js";
import { mapState, mapActions } from "vuex";
import { imgHeader } from "@/utils/js/config.js";
import { generateUUID,successTip,errTip } from "@/utils/js/tool.js";
import Clipper from "@/components/Clipper.vue";
import axios from 'axios'
const vue_window = window

export default {
  name: "userInfo_BaseInfo",
  data() {
    return {
      localImgSrc: "",
      i_user: i_person_header.user,
      specialitys: [
        "软件工程",
        "计算机科学与技术",
        "医学影像",
        "信息安全",
        "自动化",
        "电气及其自动化",
        "土木工程",
        "机械工程"
      ],
      showClipper: false,
      avatarUrl:''
    };
  },
  components: {
    Clipper
  },
  computed: {
    ...mapState('account',['user']),
    headImg() {
      return function(avatar) {
        return avatar ? imgHeader + avatar : this.i_user;
      };
    }
  },
  methods: {
    ...mapActions("account", ["post_updateUserInfo"]),
    async uploadImg(canvas) {
      console.log(canvas);
      let _this = this
      _this.avatarUrl = generateUUID() + '.jpg'
      canvas.toBlob(async function(blob) {
        let newImgFile = new vue_window.File([blob], _this.avatarUrl, {
          type: blob.type
        });
        let avatarUrl = vue_window.URL.createObjectURL(blob)
        _this.$nextTick(()=>{
          document.getElementById('avatar').src = avatarUrl
        })
        let newForm = new vue_window.FormData();
        newForm.append("file", newImgFile);
        const r = await axios.post("/private/upload/img/avatar", newForm);
        let {code,msg} = r.data
        if(code === 'success'){
          successTip(msg)
        }else if(code === 'fail'){
          errTip(msg)
        }
      }, "image/jpeg");
    },
    updateUserInfo() {
      console.log(this.avatarUrl)
      this.post_updateUserInfo({
        name: this.user.name,
        specialty: this.user.specialty,
        avatar: this.avatarUrl ? 'avatar/' + this.avatarUrl : this.user.avatar,
        description: this.user.description
      });
    }
  },
};
</script>
<style lang="less" scoped>
@import url("./css/baseInfo.less");
</style>
