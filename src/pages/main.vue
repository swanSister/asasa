<template>
  <div>
    <vuescroll class="main-content">
      <Header @onclick="onClickHeader" :headerData="headerData"></Header>
      <!-- <PostHeader></PostHeader> -->
      <PostList :postList="postList"></PostList>
      <Footer></Footer>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from 'vuescroll';
import Header from '@/components/header'
//import PostHeader from '@/components/post/post_header.vue'
import PostList from '@/components/post/post_list.vue'
import Footer from '@/components/footer'
export default {
  components:{
    Header,
    //PostHeader,
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
      this.getMessages(item.path)
    },
    async getPosts(){
      
      if(this.$store.state.me.isAuth){
        this.headerData = this.$store.state.me.topics
      }else{
        this.headerData = [this.$store.state.me.topics[0]]
      }
      this.getMessages(this.headerData[0].path)
    },
    async getMessages(path){
      let messages = await this.$api.getByPath(`${path}/messages`)
      
      this.postList = messages.data.documents
      console.log("postlist",this.postList)
     
    }
  },
  async mounted(){
    console.log(this.$store.state.me)
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