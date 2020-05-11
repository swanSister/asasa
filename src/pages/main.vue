<template>
  <div>
    <vuescroll class="main-content">
      <Header @onclick="onClickHeader" :headerData="headerData"></Header>
      <PostHeader></PostHeader>
      <PostList :postList="postList"></PostList>
      <Footer></Footer>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from 'vuescroll';
import Header from '@/components/header'
import PostHeader from '@/components/post/post_header.vue'
import PostList from '@/components/post/post_list.vue'
import Footer from '@/components/footer'
export default {
  components:{
    Header,
    PostHeader,
    PostList,
    vuescroll,
    Footer,
  },
  props:{
    
  },
  data () {
    return {
      headerData:[],
      postList:[],
    }
  },
  methods:{
    async onClickHeader(item){
      console.log(item)
      this.getMessages(item.path)
    },
    async getPosts(){
      let posts = await this.$api.getPosts()
      this.headerData = posts.data.data
      this.getMessages(this.headerData[0].path)
    },
    async getMessages(path){
      let messages = await this.$api.getByPath(`${path}/messages`)
      
      this.postList = messages.data.data
      console.log(this.postList)
      //post 등록 샘플  
      // let messages = await this.$api.postByPath(`${this.headerData[0].path}/messages`, {
      //     tag:"사회・투자",
      //     name:"강남 현대아파트・AIEM08",
      //     title:"김정은 위중 정보, 정확하지 않을 수도 있다",
      //     text:"미국 CNN 방송은 20일(현지시간) 김정은 북한 국무위원장 관련 추가 보도를 통해 김 위원장이 심혈관 수술 후 위중한 상황에 있다는 정보가 정확하지 않을 수 있다고 했다.",
      //     view:3,
      //     like:4,
      //     commentCount:10,
      //     time:'방금',
      //     thumbnail:'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
      //   })
    }
  },
  async mounted(){
    this.getPosts()
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