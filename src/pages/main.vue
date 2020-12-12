<template>
  <div>
    <Header @onclick="onClickHeader" :headerData="headerData" :currentTopicId="currentTopicId"></Header>
    <!-- <PostHeader></PostHeader> -->
    
      <vue-scroll ref="vs" class="main-content" 
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
        zooming: false,
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
    limit:10,
    size:0,
    currentTopicId:'',
    sort:1,
    }
  },
  methods:{
    onSort(sort){
      //sort 1: 최신순, 2: 추천순, 3:조회순, 4:댓글순
      this.postList = []
      this.offset = 0
      this.sort = sort
      console.log(this.offset, this.sort)
      this.getMessages(this.offset, this.limit, this.sort)
    },
    async handleRS(vsInstance, refreshDom, done) {//위로 당겨서 새로고침
      this.postList = []
      this.offset = 0
      this.getMessages(this.offset, this.limit, this.sort)
      done();
    },
    handleRBD(vm, loadDom, done) {
      console.log("handleRS4")
      done();
    },
    async handleLoadStart(vm, dom, done) {//아래 당겨서 더보기
      this.offset+=this.limit
      this.getMessages(this.offset, this.limit, this.sort)
      done();
    },
    handleLBD(vm, loadDom, done) {
      console.log("handleRS3")
      done();
    },
    async onClickHeader(item){
      this.postList = []
      this.currentTopicId = item.topicId
      this.offset = 0
      this.getMessages(this.offset, this.limit, this.sort)
    },
    async getPosts(){
      this.headerData = this.$store.state.me.topics
   
      this.currentTopicId = this.$route.query.topicId ? this.$route.query.topicId : this.headerData[0].topicId
     
      this.getMessages(this.offset, this.limit, this.sort)
    },
    async getMessages(offset, limit, sort){
      console.log(offset, limit, sort)
      let messages = await this.$api.getPostList({
        topicId: this.currentTopicId,
        offset: offset,
        limit: limit,
        sort: sort
      })
      console.log(messages)
      messages.data.data.map(item => this.postList.push(item))
      setTimeout(() => {
        this.$refs["vs"].refresh();
      }, 100)
    },
    async updateMain(){
      this.$forceUpdate();
    },
  },
  
  async mounted(){

    if(!this.$store.state.me.userId){
      this.$router.push('login')
    }else{
      await this.$updateUserInfo()
      if(!this.$store.state.me.userId){
        this.$router.push('login')
        return
      }
      let that = this
      this.$eventBus.$on("mainPostUpdate", function(topicId){
        that.currentTopicId = topicId
        that.postList = [], that.offset = 0, that.sort = 1
        that.getMessages(that.offset, that.limit, that.sort)
      })
      this.getPosts()
    }
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
  height:calc(100% - 36vw) !important;
}
</style>