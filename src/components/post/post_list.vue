
<template>
  <div class="post-list">
    <div class="sorting flex auto align-items-center justify-content-end">
      
      <select class="select-box " @change="onChange">
        <option value="1">최신순</option>
        <option value="2">추천순</option>
        <option value="3">조회수순</option>
      </select>
      <span class="icon icon-down-open"></span>
    </div>
    <Post v-for="(post, index) in postList" :postData="post" :key="index+'post'"></Post>
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
  },
  methods: {
   
    onChange(e){
      this.$emit("sort",e.target.value)
      this.isSelectBoxFocus = false
    }
  }
}
</script>

<style scoped>
  .select-box{
    border:0;
    background: transparent;
    color:#555;
    font-size: 4vw;
    appearance:none;
    text-align-last: right;
  }
  .select-box:focus{
    border: 0;
    outline: 0;
  }
  .post-list{
    width:100%;
  }

  .sorting{
    width:100%;
    background:white;
    padding:1.5vw 4vw;
    color:#aaa;
  }
  .sorting .icon{
    font-size: 3vw;
  }
</style>
