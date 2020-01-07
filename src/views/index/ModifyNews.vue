<template>
    <div class="modify-news">
        <ModifyHeader modifyTitle="修改校园资讯"/>
        <ReleaseNews :newsId="newsId"/>
    </div>
</template>
<script>
import ReleaseNews from '../release/ReleaseNews'
import ModifyHeader from './ModifyHeader.vue'
export default {
    name:'ModifyNews',
    components:{
        ReleaseNews,
        ModifyHeader
    },
    props:{
        newsId:String,
    }
}
</script>

<style lang="less" scoped>
@import url('./css/modifyNews.less');
</style>



