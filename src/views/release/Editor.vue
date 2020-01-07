<template>
  <div class="edit">
    <div class="wang" id="wang"></div>
  </div>
</template>
<script>
import Wangeditor from "wangeditor";
import { generateUUID, successTip, errTip, warnTip } from "@/utils/js/tool.js";
import axios from "axios";

const win = window;
export default {
  name: "editor",
  data() {
    return {
      editor: ""
    };
  },
  props:{
    m_text:{
      type:String,
      default:""
    }
  },
  methods: {
    initEditor() {
      this.editor = new Wangeditor("#wang");
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "image", // 插入图片
        "table", // 表格
        "code", // 插入代码
        "undo", // 撤销
        "redo" // 重复
      ];
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024
      this.editor.customConfig.customUploadImg = function(files, insert) {
        let newForm = new win.FormData();
        newForm.append("file", files[0]);
        const r = axios.post("/private/upload/release", newForm).then(d => {
          let { code, msg } = d.data;
          if (code === "success") {
            successTip(msg);
            insert(d.data.data[0]);
          }else if(code === 'fail'){
            warnTip(msg)
          }
        });
      };
      this.editor.create();
    }
  },
  mounted() {
    this.initEditor();
    win.editor = this.editor;
    console.log(this.editor);
  },
  watch:{
    "m_text":function(newVal,oldVal){
      this.editor.txt.html(newVal)
    }
  }
};
</script>


