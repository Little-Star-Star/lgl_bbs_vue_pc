<template>
    <div class="modify-news">
        <ModifyHeader modifyTitle="修改二手物品"/>
        <ReleaseSecondHand :secondHandId="secondHandId"/>
    </div>
</template>
<script>
import ReleaseSecondHand from '../release/ReleaseSecondHand.vue'
import ModifyHeader from './ModifyHeader.vue'
export default {
    name:'ModifyNews',
    components:{
        ReleaseSecondHand,
        ModifyHeader
    },
    props:{
        secondHandId:String,
    }
}
</script>

<style lang="less" scoped>
@import url('./css/modifyNews.less');
</style>



