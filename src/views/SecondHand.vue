<template>
  <div class="second-hand">
    <Type @updateList="updateList"/>
    <Sort @updateList="updateList"/>
    <!-- <router-view></router-view> -->
    <List/>
    <div class="page">
      <Page
        :total="secondListTotal"
        :page-size="20"
        :current="pageIndex"
        show-elevator
        @on-change="changePage"
      ></Page>
    </div>
  </div>
</template>

<script>
import Type from "@/views/secondHand/Type.vue";
import Sort from "@/views/secondHand/Sort.vue";
import List from "@/views/secondHand/List.vue";

import { mapActions, mapState, mapMutations } from "vuex";
export default {
  components: {
    Type,
    Sort,
    List,
  },
  data() {
    return {
      showReport:true
    }
  },
  computed: {
    ...mapState("secondHand", [
      "secondListTotal",
      "minPrice",
      "maxPrice",
      "sortType",
      "type",
      "pageIndex",
      "keyword"
    ])
  },
  methods: {
    ...mapActions("secondHand", ["post_getSecondList"]),
    ...mapMutations('secondHand',["SET_OPTIONS_PAGEINDEX"]),
    changePage(curPage) {
      this.SET_OPTIONS_PAGEINDEX(curPage)
      this.updateList()
    },
    updateList() {
      this.post_getSecondList({
        pageIndex: this.pageIndex,
        pageSize: 20,
        minPrice: parseFloat(this.minPrice),
        maxPrice: parseFloat(this.maxPrice),
        sortType: this.sortType(),
        type: this.type(),
        keyword:this.keyword
      });
    }
  },
  created() {
    console.log(this.maxPrice, isFinite(this.maxPrice));
    this.updateList()
  }
};
</script>
<style lang="less" scoped>
.second-hand {
  min-height: 800px;
}
</style>
<style lang="less">
@import url("../assets/css/flex.less");
#app .page {
  font-size: 14px;
  font-family: "light_700";
  color: @c_purple1;
  margin: 50px;
  a {
    font-size: 14px;
    font-family: "light_700";
    color: @c_purple1;
  }
}
</style>


