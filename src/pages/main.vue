<template>
  <div>
    <Header @onclick="onClickHeader" :headerData="headerData"></Header>
    <!-- <PostHeader></PostHeader> -->
    <vue-scroll class="main-content" 
        :ops = "ops"
        @refresh-start="handleRS"
        @load-before-deactivate="handleLBD"
        @refresh-before-deactivate="handleRBD"
        @load-start="handleLoadStart"
      >
      <div class="slot-load" slot="load-beforeDeactive"></div>
      <div class="slot-load" slot="load-deactive"></div>
      <div class="slot-load" slot="load-start"></div>
      <div class="slot-load" slot="load-active"></div>
      <div class="slot-refresh" slot="refresh-deactive"></div>
      <div class="slot-refresh" slot="refresh-beforeDeactive"></div>
      <div class="slot-refresh" slot="refresh-start"></div>
      <div class="slot-refresh" slot="refresh-active"></div>
        <div class="child">
           <PostList @sort="onSort" :postList="postList"></PostList>
        </div>
     
      </vue-scroll>
      <Footer v-bind:footerIndex="0"></Footer>
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
      ops : {
      vuescroll: {
        mode: 'slide',
        pullRefresh: {
          enable: true,
          tips:{
            deactive: '',
          active: '',
          start: '',
          beforeDeactive: ''
          }
        },
        pushLoad: {
          enable: true,
          auto: true,
          autoLoadDistance: 10,
          tips:{
            deactive: '',
          active: '',
          start: '',
          beforeDeactive: ''
          }
        }
      }
    },
    offset:0,
    limit:100,
    size:0,
    currentPath:'',
    sort:1,
    }
  },
  methods:{
    onSort(sort){
      //sort 1: 최신순, 2: 추천순, 3:조회순
      this.postList = []
      this.offset = 0
      this.sort = sort
      console.log(this.offset, this.sort)
      this.getMessages(this.currentPath, this.offset, this.limit, this.sort)
    },
    async handleRS(vsInstance, refreshDom, done) {//위로 당겨서 새로고침
      let messages = await this.$api.getByPath(`${this.currentPath}/messages`,this.offset,this.limit, this.sort)
      let size = messages.data.size
      if(size > this.size){
        this.offset = 0
        this.getMessages(this.currentPath, this.offset, this.limit, this.sort)
      }
      done();
    },
    handleRBD(vm, loadDom, done) {
      console.log("handleRS4")
      done();
    },
    async handleLoadStart(vm, dom, done) {//아래 당겨서 더보기
      if(this.offset + this.limit <= this.size){
        this.offset+=this.limit
        await this.getMessages(this.currentPath,this.offset+1, this.limit)
      }
      done();
    },
    handleLBD(vm, loadDom, done) {
      console.log("handleRS3")
      done();
    },
   
    async onClickHeader(item){
      this.postList = []
      this.currentPath = item.path
      this.offset = 0
      this.getMessages(this.currentPath, this.offset, this.limit, this.sort)
    },
    async getPosts(){
      if(this.$store.state.me.isAuth){
        this.headerData = this.$store.state.me.topics
      }else{
        this.headerData = [this.$store.state.me.topics[0]]
      }
      this.currentPath = this.headerData[0].path
      this.getMessages(this.currentPath, this.offset, this.limit, this.sort)
    },
    async getMessages(path, offset, limit, sort){
      console.log(`${offset}~${limit}`)
      let messages = await this.$api.getByPath(`${path}/messages`,offset,limit, sort)
      messages.data.documents.map(item => this.postList.push(item))
      this.size = messages.data.size
      console.log("postlist res ",messages)
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
  },

  beforeDestroy(){
    this.headerData = []
    this.currentPath = ''
  }
}
</script>
<style scoped>
.main-content{
  width:100%;
  height:calc(100% - 28vw) !important;
  overflow-y:auto;
}
</style>