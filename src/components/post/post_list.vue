
<template>
  <div class="post-list">
    <div class="sorting flex align-items-center">
      <span class="icon icon-down-open"></span>
      <select class="select-box" @change="onChange">
        <option value="1">최신순</option>
        <option value="2">추천순</option>
        <option value="3">조회수순</option>
      </select>
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
    display:flex;
    justify-content:flex-end;
    background:white;
    padding:1.5vw;
    color:#aaa;
  }
  .sorting .icon{
    font-size: 3vw;
  }
</style>
