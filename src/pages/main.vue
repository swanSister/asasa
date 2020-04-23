<template>
  <div>
     <vuescroll class="main-content">
       
      <Header></Header>
      <PostHeader></PostHeader>
      <PostList></PostList>
     </vuescroll>
  </div>
</template>

<script>
import vuescroll from 'vuescroll';
import Header from '@/components/header'
import PostHeader from '@/components/post/post_header.vue'
import PostList from '@/components/post/post_list.vue'
export default {
  components:{
    Header,
    PostHeader,
    PostList,
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
      console.log("mouted main")
  }
}
</script>
<style scoped>
.main-content{
  width:100%;
  height:100%;
  overflow-y:auto;
}
</style>