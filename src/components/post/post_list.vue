
<template>
  <div class="post-list">
    <div class="sorting">
      <div>최신순 <span class="icon-down-open"></span></div>
    </div>
    <Post @click="$router.push('postDetail')" v-for="(post, index) in postList" :postData="post" :key="index+'post'"></Post>
  </div>
</template>

<script>

import Post from '@/components/post/post.vue'

export default {
  name: 'HelloWorld',
  components: {
    Post
  },
  props:{
    postList:Array
  },
  data: function () {
    return {
      
    }
  }
}
</script>

<style scoped>
  .post-list{
    width:100%;
  }
  .sorting{
    width:100%;
    display:flex;
    justify-content:flex-end;
    background:white;
    padding:1.5vw;
    color:#aaa;
  }
  .sorting > div{
    font-size:4vw;
  }
  .post-list{
    margin-bottom:17vw;
  }
</style>
