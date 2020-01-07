<template>
  <div class="release-secondhand">
    <div class="content">
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">简介</span>
          <span class="text">长度在50个字符以内</span>
        </div>
        <input type="text" name id v-model="title">
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">类型</span>
          <span class="text">请选择二手物品所属类型</span>
        </div>
        <div class="deal-type">
          <Select v-model="type" style="width:200px">
            <Option v-for="(item,i) in types" :value="item" :key="i">{{ item}}</Option>
          </Select>
        </div>
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">联系方式</span>
          <span class="text">请输入你的联系方式(手机\QQ\微信)</span>
        </div>
        <input type="text" name id v-model="link">
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">所在地</span>
          <span class="text">请输入你的详细地址,以便交易</span>
        </div>
        <input type="text" name id v-model="address">
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">新旧度</span>
          <span class="text">请输入二手物品的新旧程度(0-100)</span>
        </div>
        <div class="new-degree">
          <input type="number" max="100" min="0" v-model="newDegree" id="newDegree">
          <span style="margin-left:10px;">%新</span>
        </div>
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">原价</span>
          <span class="text">请输入二手物品的原价(¥)</span>
        </div>
        <div class="origin-price">
          <input type="number" v-model="originPrice" id="originPrice">
          <span style="margin-left:10px;">元</span>
        </div>
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">转卖价</span>
          <span class="text">请输入二手物品的转卖价(¥)</span>
        </div>
        <div class="price">
          <input type="number" v-model="price" id="price">
          <span style="margin-left:10px;">元</span>
        </div>
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">可刀</span>
          <span class="text">商品是否可以讲价？</span>
        </div>
        <div class="deal-type">
          <Select v-model="talkPrice" style="width:200px">
            <Option v-for="(item,i) in talkPrices" :value="item" :key="i">{{ item}}</Option>
          </Select>
        </div>
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">交易方式</span>
          <span class="text">请选择交易方式</span>
        </div>
        <div class="deal-type">
          <Select v-model="dealType" style="width:200px">
            <Option v-for="(item,i) in dealTypes" :value="item" :key="i">{{ item}}</Option>
          </Select>
        </div>
      </div>
      <div class="part">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">封面</span>
          <span class="text">请上传二手物品的细节展示封面,图片类型为PNG,JPG格式且大小小于2M,最多只能上传20张,至少上传1张</span>
        </div>
        <div class="upload clearfix">
          <div class="covers" v-for="(c,i) in covers" :key="i">
            <img class="cover" :src="cover(c)" alt>
            <img class="close" @click="closeCover(i)" :src="i_close" alt>
          </div>
          <div class="upload-btn" @click="showClipper=true">上传</div>
        </div>
      </div>
      <div class="part editor">
        <div class="tip">
          <span class="important">*</span>
          <span class="title">二手物品描述</span>
          <span class="text">请编辑二手物品详细内容...</span>
        </div>
        <Editor :m_text="m_text"/>
      </div>
      <div class="btn" @click="releaseSecondHand">{{secondHandId?"修改二手物品":"发布二手物品"}}</div>
    </div>
    <Clipper
      v-show="showClipper"
      @hideClipper="showClipper=false"
      @clipCanvas="uploadImg"
      :ratio="1"
    />
  </div>
</template>

<script>
import Editor from "./Editor.vue";
import Clipper from "@/components/Clipper.vue";
import { generateUUID, successTip, errTip } from "@/utils/js/tool.js";
import axios from "axios";
import { api_post_releaseSecondHand } from "../../api/release";
import {
  api_get_getSecondDetail,
  api_post_modifySecondHand,
  api_get_deleteSecondHand
} from "../../api/secondHand";
import { imgHeader } from "../../utils/js/config";
import { i_clipper } from "../../assets/img";
const vue_window = window;
export default {
  data() {
    return {
      covers: [],
      title: "",
      type: "",
      types: [
        "电子产品",
        "美妆",
        "服饰",
        "图书资料",
        "生活用品",
        "户外运动",
        "玩具乐器",
        "租房",
        "其他"
      ],
      talkPrice: "可刀",
      talkPrices: ["可刀", "不可刀"],
      address: "",
      newDegree: 100,
      dealType: "线下",
      link: "",
      description: "该商家太懒了，商品没描述...",
      originPrice: "",
      price: "",
      dealTypes: ["线上", "线下"],
      showClipper: false,
      m_text: "",
      i_close: i_clipper.close
    };
  },
  props: {
    secondHandId: {
      type: String
    }
  },
  components: {
    Editor,
    Clipper
  },
  computed: {
    cover() {
      return function(cover) {
        return cover ? imgHeader + cover : imgHeader + "lij_circle_logo.png";
      };
    }
  },
  methods: {
    async uploadImg(canvas) {
      console.log(canvas);
      let _this = this;
      let url = generateUUID() + ".jpg";
      canvas.toBlob(async function(blob) {
        let newImgFile = new vue_window.File([blob], url, {
          type: blob.type
        });
        let newForm = new vue_window.FormData();
        newForm.append("file", newImgFile);
        const r = await axios.post("/private/upload/img/secondHand", newForm);
        let { code, msg } = r.data;
        if (code === "success") {
          _this.covers.push("secondHand/" + url);
          successTip(msg);
        } else if (code === "fail") {
          errTip(msg);
        }
      }, "image/jpeg");
    },
    releaseSecondHand() {
      if (this.secondHandId) {
        api_post_modifySecondHand({
          secondhandId:this.secondHandId,
          covers: this.covers,
          title: this.title,
          type: this.type,
          talkPrice: !this.talkPrice.includes("不"),
          address: this.address,
          newDegree: this.newDegree,
          dealType: this.dealType,
          link: this.link,
          description: (this.description = vue_window.editor.txt.text()
            ? vue_window.editor.txt.html()
            : this.description),
          originPrice: this.originPrice,
          price: this.price
        })
      } else {
        api_post_releaseSecondHand({
          covers: this.covers,
          title: this.title,
          type: this.type,
          talkPrice: !this.talkPrice.includes("不"),
          address: this.address,
          newDegree: this.newDegree,
          dealType: this.dealType,
          link: this.link,
          description: (this.description = vue_window.editor.txt.text()
            ? vue_window.editor.txt.html()
            : this.description),
          originPrice: this.originPrice,
          price: this.price
        });
      }
    },
    closeCover(i) {
      this.covers.splice(i, 1);
    }
  },
  async created() {
    if (this.secondHandId) {
      const r = await api_get_getSecondDetail(this.secondHandId);
      this.covers = r.covers;
      this.title = r.title;
      this.type = r.type;
      this.talkPrice = r.talkPrice ? "可刀" : "不可刀";
      this.address = r.address;
      this.newDegree = r.newDegree;
      this.dealType = r.dealType;
      this.link = r.link;
      this.m_text = this.description = r.description || this.description;
      this.originPrice = r.originPrice;
      this.price = r.price;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./css/releaseSecondHand.less");
</style>
