<template>
  <div class="type">
    <!-- 用于选择二手物品种类 -->
    <div class="part-1">
      <div class="left">
        请选择种类
        <span>（可多选）</span>：
      </div>
      <div class="right">
        <input type="text" name id="search-items" v-model.lazy="m_keyword" placeholder="商品名称">
        <label for="search-items">
          <img :src="i_search" alt>
        </label>
      </div>
    </div>
    <!-- 所有带选项 -->
    <div class="part-2">
      <ul class="clearfix">
        <li
          :class="{'li-actived':val.actived}"
          @click="selectType(val)"
          v-for="(val,index) in types"
          :key="index"
        >{{val.name}}</li>
      </ul>
      <div class="clear-all">
        <img @click="clearAll" :src="i_clear_all" alt title="清除选项">
      </div>
    </div>
  </div>
</template>

<script>
import { i_type } from "@/assets/img.js";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      i_search: i_type.search,
      i_clear_all: i_type.clearAll,
      m_keyword: ""
    };
  },
  computed: {
    ...mapState("secondHand", ["types", "type", "keyword"])
  },
  methods: {
    ...mapMutations('secondHand',['SET_OPTIONS_KEYWORD','SET_OPTIONS_PAGEINDEX']),
    selectType(val) {
      // 点击其他
      if (val.type !== "all"){
        this.types[0].actived = false;
      } else{
          this.types.forEach(d=>d.actived=false)
      }
      val.actived = !val.actived;
      this.SET_OPTIONS_PAGEINDEX(1)
      this.$emit("updateList");
    },
    clearAll() {
      this.types.forEach(d => (d.actived = false));
      this.types[0].actived = true;
      this.SET_OPTIONS_PAGEINDEX(1)
      this.$emit("updateList");
    }
  },
  created() {
    this.m_keyword = this.keyword;
  },
  watch:{
      m_keyword:function(newVal,oldVal){
          this.SET_OPTIONS_KEYWORD(newVal)
          this.SET_OPTIONS_PAGEINDEX(1)
          this.$emit("updateList");
      }
  }
};
</script>

<style lang="less" scoped>
@import url("./css/type.less");
</style>

