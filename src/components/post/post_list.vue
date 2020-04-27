
<template>
  <div class="post-list">
    <div class="sorting">
      <div>최신순 <span class="icon-down-open"></span></div>
    </div>

    <Post @click="$router.push('postDetail')" v-for="(post, index) in postLists" v-bind:postData="post" :key="index+'post'"></Post>
  </div>
</template>

<script>

import Post from '@/components/post/post.vue'

export default {
  
  name: 'HelloWorld',
  components: {
    Post
  },
  data: function () {
    return {
      postLists:[
        {
          tag:"사회・투자",
          name:"강남 현대아파트・AIEM08",
          title:"김정은 위중 정보, 정확하지 않을 수도 있다",
          text:"미국 CNN 방송은 20일(현지시간) 김정은 북한 국무위원장 관련 추가 보도를 통해 김 위원장이 심혈관 수술 후 위중한 상황에 있다는 정보가 정확하지 않을 수 있다고 했다.",
          view:3,
          like:4,
          commentCount:10,
          time:'방금',
          thumbnail:'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
        },
        {
          tag:"사회2",
          name:"강남 현대아파트 ・ AIEM08",
          title:"김정은 위중 정보, 정확하지 않을 수도 있다",
          text:"미국 CNN 방송은 20일(현지시간) 김정은 북한 국무위원장 관련 추가 보도를 통해 김 위원장이 심혈관 수술 후 위중한 상황에 있다는 정보가 정확하지 않을 수 있다고 했다.",
          view:3,
          like:4,
          commentCount:10,
          time:'방금',
          thumbnail:'',
        },
        {
          tag:"사회3",
          name:"강남 현대아파트 ・ AIEM08",
          title:"김정은 위중 정보, 정확하지 않을 수도 있다",
          text:"미국 CNN 방송은 20일(현지시간) 김정은 북한 국무위원장 관련 추가 보도를 통해 김 위원장이 심혈관 수술 후 위중한 상황에 있다는 정보가 정확하지 않을 수 있다고 했다.",
          view:3,
          like:4,
          commentCount:10,
          time:'방금',
          thumbnail:'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
        },
      ]
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
