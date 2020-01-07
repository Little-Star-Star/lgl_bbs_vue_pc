<template>
  <div class="sort">
    <!-- 列表排序方式 -->
    <ul>
      <li
        v-for="(val,index) in sort"
        :key="index"
        :class="{'li-actived':val.actived}"
        @click="activeSort(index)"
      >
        {{val.name}}
        <img :src="val.actived ? i_down_arrow_actived : i_down_arrow">
      </li>
      <div class="price">
        <span>￥</span>
        <input type="number" v-model.lazy="min_price" id="min-price" min="0">
        <span class="split">-</span>
        <input type="number" v-model.lazy="max_price" id="max-price" min="0">
      </div>
    </ul>
  </div>
</template>

<script>
import { i_sort } from "@/assets/img.js";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      i_down_arrow: i_sort.downArrow,
      i_down_arrow_actived: i_sort.downArrowActived,
      min_price:0,
      max_price:Infinity
    };
  },
  computed: {
    ...mapState("secondHand", ["sort","minPrice","maxPrice"])
  },
  methods: {
    ...mapMutations('secondHand',["SET_OPTIONS_MIN_PRICE","SET_OPTIONS_MAX_PRICE"]),
    activeSort(index) {
        this.sort.forEach((d,i)=>{
            d.actived = index === i
        })
        this.$emit('updateList')
    }
  },
  created(){
    this.min_price = this.minPrice
    this.max_price = this.maxPrice
  },
  watch:{
    min_price:function(newVal,oldVal){
      this.SET_OPTIONS_MIN_PRICE(newVal)
      this.$emit('updateList')
    },
    max_price:function(newVal,oldVal){
      this.SET_OPTIONS_MAX_PRICE(newVal)
      this.$emit('updateList')
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./css/sort.less");
</style>

