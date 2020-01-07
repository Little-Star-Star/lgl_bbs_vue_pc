<template>
    <div class="person">
        <PersonHeader/>
        <PersonNav/>
        <router-view></router-view>
    </div>
</template>

<script>
import PersonHeader from './person/PersonHeader.vue'
import PersonNav from './person/PersonNav.vue'

export default {
    components:{
        PersonHeader,
        PersonNav,
    }
}
</script>
