<template>
  <div class="news">
      <Banner/>
      <Important/>
  </div>
</template>
<script>
import Banner from '@/views/news/Banner.vue'
import Important from '@/views/news/Important.vue'
export default {
    components:{
        Banner,
        Important,
    }
};
</script>

