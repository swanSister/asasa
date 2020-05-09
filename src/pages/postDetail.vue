<template>
  <div>
    <vuescroll>
      <PostDetail></PostDetail>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from 'vuescroll';
import PostDetail from '@/components/post/post_detail.vue'
export default {
  components:{
    PostDetail,
    vuescroll,
  },
  props:{
  
  },
  data () {
    return {
    
    }
  },
  methods:{
  },
  mounted(){
  }
}
</script>
<style scoped>

</style>