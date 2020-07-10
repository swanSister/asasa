<template>
  <div>
    
      <Header @onclick="onClickHeader" :headerData="headerData"></Header>
      <!-- <PostHeader></PostHeader> -->
    <vue-scroll class="main-content">
      <PostList :postList="postList"></PostList>
      <Footer v-bind:footerIndex="0"></Footer>
    </vue-scroll>
  </div>
</template>

<script>
import Header from '@/components/header'
//import PostHeader from '@/components/post/post_header.vue'
import PostList from '@/components/post/post_list.vue'
import Footer from '@/components/footer'
export default {
  components:{
    Header,
    //PostHeader,
    PostList,
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
      
      if(this.$store.state.me.isAuth){
        this.headerData = this.$store.state.me.topics
      }else{
        this.headerData = [this.$store.state.me.topics[0]]
      }
      console.log(this.headerData)
      this.getMessages(this.headerData[0].path)
    },
    async getMessages(path){
      let messages = await this.$api.getByPath(`${path}/messages`)
      this.postList = messages.data.documents
      console.log("postlist",this.postList)
    },
    async updateMain(){
      this.$forceUpdate();
    }
  },
  
  async mounted(){
    console.log("###########")
    console.log(this.$store.state.me)
    if(!this.$store.state.me.userId){
      this.$router.push('login')
    }else{
      await this.$updateUserInfo()
      if(!this.$store.state.me.userId){
        this.$router.push('login')
        return
      }
      this.getPosts()
    }
    this.$eventBus.$on("updateMain",this.updateMain)
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